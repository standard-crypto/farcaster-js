import { Signer } from "@ethersproject/abstract-signer";
import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";
import { verifyMessage } from "@ethersproject/wallet";
import axios, { AxiosInstance } from "axios";
import { ContentHost, SignedCast } from "./contentHost";
import {
  AddressActivity,
  AddressActivityBody,
  AddressActivityBodyType,
  Directory,
  DirectoryBody,
  TokenCommunity,
} from "./api";
import {
  serializeDirectoryBody,
  serializeAddressActivityBody,
} from "./serialization";
import { UserRegistryReader, Web2UserRegistry } from "./userRegistry";
import { URL } from "url";

export const CAST_CHARACTER_LIMIT = 280;

export interface CastRequest {
  text: string;
  fromUsername: string;
  sequence?: number;
  // replyTo may be a the merkle-hash of a Cast, or the Cast object itself
  replyTo?: Pick<AddressActivity, "merkleRoot"> | string;
  tokenCommunities?: TokenCommunity[];
}

export type UpdateDirectoryRequest = Omit<
  Partial<DirectoryBody>,
  "timestamp" | "version"
>;

/**
 * High-level functionality for interacting with Farcaster
 */
export class Farcaster {
  readonly usernameRegistry: UserRegistryReader;
  readonly axiosInstance: AxiosInstance;
  constructor(
    usernameRegistry: UserRegistryReader = new Web2UserRegistry(),
    axiosInstance?: AxiosInstance
  ) {
    this.usernameRegistry = usernameRegistry;
    if (axiosInstance == null) {
      axiosInstance = axios.create({
        validateStatus: (status) => status >= 200 && status < 300,
      });
    }

    this.axiosInstance = axiosInstance;
  }

  /**
   * Signs and publishes the provided updates to the user's {@link Directory}
   */
  async updateDirectory(
    username: string,
    signer: Signer,
    contentHost: ContentHost,
    updates: UpdateDirectoryRequest
  ): Promise<Directory> {
    const user = await this.usernameRegistry.lookupByUsername(username);
    if (user == null) {
      throw new Error(`no such user with username ${username}`);
    }
    if (user.address !== (await signer.getAddress())) {
      throw new Error(
        `The registered address ${
          user.address
        } for user ${username} does not match the address of the provided signer: ${await signer.getAddress()}`
      );
    }
    const currentDirectory = (
      await this.axiosInstance.get<Directory>(user.directoryUrl)
    ).data;
    const newDirectoryBody: DirectoryBody = {
      ...currentDirectory.body,
      ...updates,
      timestamp: Date.now(),
    };
    const newDirectory = await Farcaster.signDirectory(
      newDirectoryBody,
      signer
    );
    await contentHost.updateDirectory(newDirectory);
    return newDirectory;
  }

  /**
   * Signs a directory body.
   * @see {@link Farcaster.updateDirectory}
   */
  static async signDirectory(
    directoryBody: DirectoryBody,
    signer: Signer
  ): Promise<Directory> {
    const serializedDirectoryBody = serializeDirectoryBody(directoryBody);
    const merkleRoot = keccak256(toUtf8Bytes(serializedDirectoryBody));
    const signature = await signer.signMessage(merkleRoot);
    return {
      body: directoryBody,
      merkleRoot,
      signature,
    };
  }

  /**
   * Validates a {@link CastRequest} and marshals it to an unsigned {@link AddressActivityBody}
   */
  async prepareCast(request: CastRequest): Promise<AddressActivityBody> {
    if (request.text.length >= CAST_CHARACTER_LIMIT) {
      throw new Error(
        `Text length must be fewer than ${CAST_CHARACTER_LIMIT} characters`
      );
    }

    let replyParentMerkleRoot: string | undefined;
    if (request.replyTo !== undefined) {
      if (typeof request.replyTo === "string") {
        replyParentMerkleRoot = request.replyTo;
      } else {
        replyParentMerkleRoot = request.replyTo.merkleRoot;
      }
    }

    let prevMerkleRoot: string;
    let address: string;
    let sequence: number;

    // lookup the latest activity from this user to populate the sequence number and continue the merkle tree
    const userActivity = await this.getLatestActivityForUser(
      request.fromUsername
    );
    if (userActivity == null) {
      const user = await this.usernameRegistry.lookupByUsername(
        request.fromUsername
      );
      if (user == null) {
        throw new Error(`no such user with username ${request.fromUsername}`);
      }
      address = user.address;
      prevMerkleRoot = keccak256(toUtf8Bytes(""));
      sequence = 0;
    } else {
      address = userActivity.body.address;
      prevMerkleRoot = userActivity.merkleRoot;
      sequence = userActivity.body.sequence + 1;
    }

    return {
      type: AddressActivityBodyType.TextShort,
      publishedAt: Date.now(),
      sequence,
      username: request.fromUsername,
      address,
      data: {
        text: request.text,
        replyParentMerkleRoot,
      },
      prevMerkleRoot,
      tokenCommunities: request.tokenCommunities,
    };
  }

  /** Signs a cast. @see {@link ContentHost.publishCast} for publishing signed casts */
  static async signCast(
    cast: AddressActivityBody,
    signer: Signer
  ): Promise<SignedCast> {
    if (cast.address !== (await signer.getAddress())) {
      throw new Error(
        `The address ${cast.address} for user ${
          cast.username
        } does not match the address of the provided signer: ${await signer.getAddress()}`
      );
    }
    const serializedCast = serializeAddressActivityBody(cast);
    const merkleRoot = keccak256(toUtf8Bytes(serializedCast));
    const signature = await signer.signMessage(merkleRoot);
    return {
      body: cast,
      merkleRoot,
      signature,
    };
  }

  /** Validates {@link Directory.signature} and {@link Directory.merkleRoot} */
  static async isValidDirectorySignature(
    address: string,
    directory: Directory
  ): Promise<boolean> {
    const serializedDirectoryBody = serializeDirectoryBody(directory.body);
    const derivedMerkleRoot = keccak256(toUtf8Bytes(serializedDirectoryBody));
    const signerAddress = verifyMessage(derivedMerkleRoot, directory.signature);
    return (
      signerAddress === address && derivedMerkleRoot === directory.merkleRoot
    );
  }

  /** Validates {@link AddressActivity.signature} and {@link AddressActivity.merkleRoot} */
  static async isValidAddressActivitySignature(
    address: string,
    addressActivity: AddressActivity | SignedCast
  ): Promise<boolean> {
    const serializedCast = serializeAddressActivityBody(addressActivity.body);
    const derivedMerkleRoot = keccak256(toUtf8Bytes(serializedCast));
    const signerAddress = verifyMessage(
      derivedMerkleRoot,
      addressActivity.signature
    );
    return (
      signerAddress === address &&
      derivedMerkleRoot === addressActivity.merkleRoot
    );
  }

  /** Returns the most recent {@link AddressActivity} published by the given username, if any */
  async getLatestActivityForUser(
    username: string
  ): Promise<AddressActivity | undefined> {
    // eslint-disable-next-line no-unreachable-loop
    for await (const activity of this.getAllActivityForUser(username)) {
      // return first result
      return activity;
    }
    // no activity
    return undefined;
  }

  /**
   * Yields all {@link AddressActivity} from the given username, in order from most to least recent.
   */
  async *getAllActivityForUser(
    username: string,
    pageSize = 1000
  ): AsyncGenerator<AddressActivity, void, undefined> {
    const directory = await this.getDirectory(username);
    let currentPage: AddressActivity[] = [];
    let currentPageIdx = 1;
    let addressActivityURL = new URL(directory.body.addressActivityUrl);
    do {
      const pageResp = await this.axiosInstance.get<AddressActivity[]>(
        addressActivityURL.toString(),
        {
          params: {
            per_page: pageSize,
            page: currentPageIdx,
          },
        }
      );

      // While there's no set standard for pagination, we don't have a way for the content host
      // we're talking to to communicate to us whether there's another page of data to fetch. Certain
      // self-hosting solutions will just return all the data in one page and will ignore pagination
      // parameters. This checks for that scenario and prevents requesting the same page of data forever.
      if (
        currentPage.length > 0 &&
        pageResp.data.length > 0 &&
        pageResp.data[0].merkleRoot === currentPage[0].merkleRoot
      ) {
        break;
      }

      currentPage = pageResp.data;

      yield* currentPage;
      currentPageIdx++;

      // guardian responds to /origin/address_activity/<address> with a
      // 302 redirect to /indexer/address_activity/<address>?per_page=1000&page=1
      // In order to properly paginate the response, we need to pull out the
      // updated URL from the 302 response and override its query parameters
      addressActivityURL = new URL(pageResp.request.path, addressActivityURL);
      addressActivityURL.searchParams.delete("page");
      addressActivityURL.searchParams.delete("per_page");
    } while (currentPage.length > 0);
  }

  /** Fetches a user's {@link Directory} */
  async getDirectory(username: string): Promise<Directory> {
    const user = await this.usernameRegistry.lookupByUsername(username);
    if (user == null) {
      throw new Error(`no such user with username ${username}`);
    }
    const directoryResp = await this.axiosInstance.get<Directory>(
      user.directoryUrl
    );
    return directoryResp.data;
  }
}
