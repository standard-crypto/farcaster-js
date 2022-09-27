import { Signer } from "@ethersproject/abstract-signer";
import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";
import { verifyMessage } from "@ethersproject/wallet";
import { Provider } from "@ethersproject/providers";
import { FarcasterContentHost, SignedCast } from "./contentHost";
import { Message, MessageBody, MessageBodyType, TokenCommunity } from "./api";
import { serializeMessageBody } from "./serialization";
import { UserRegistry } from "./userRegistry";

export const CAST_CHARACTER_LIMIT = 280;

export interface CastRequest {
  text: string;
  fromUsername: string;
  sequence?: number;
  // replyTo may be a the merkle-hash of a Cast, or the Cast object itself
  replyTo?: Pick<Message, "merkleRoot"> | string;
  tokenCommunities?: TokenCommunity[];
}

/**
 * High-level functionality for interacting with Farcaster
 */
export class Farcaster {
  readonly userRegistry: UserRegistry;
  readonly contentHost: FarcasterContentHost;

  constructor({ web3Provider }: { web3Provider?: Provider } = {}) {
    this.userRegistry = new UserRegistry({ web3Provider });
    this.contentHost = new FarcasterContentHost();
  }

  /**
   * Validates a {@link CastRequest} and marshals it to an unsigned {@link MessageBody}
   */
  async prepareCast(request: CastRequest): Promise<MessageBody> {
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
      const user = await this.userRegistry.lookupByUsername(
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
      type: MessageBodyType.TextShort,
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

  /** Signs a cast. @see {@link FarcasterContentHost.publishCast} for publishing signed casts */
  static async signCast(
    cast: MessageBody,
    signer: Signer
  ): Promise<SignedCast> {
    if (cast.address !== (await signer.getAddress())) {
      throw new Error(
        `The address ${cast.address} for user ${
          cast.username
        } does not match the address of the provided signer: ${await signer.getAddress()}`
      );
    }
    const serializedCast = serializeMessageBody(cast);
    const merkleRoot = keccak256(toUtf8Bytes(serializedCast));
    const signature = await signer.signMessage(merkleRoot);
    return {
      body: cast,
      merkleRoot,
      signature,
    };
  }

  /** Validates {@link Message.signature} and {@link Message.merkleRoot} */
  static async isValidMessageSignature(
    address: string,
    message: Message | SignedCast
  ): Promise<boolean> {
    const serializedCast = serializeMessageBody(message.body);
    const derivedMerkleRoot = keccak256(toUtf8Bytes(serializedCast));
    const signerAddress = verifyMessage(derivedMerkleRoot, message.signature);
    return (
      signerAddress === address && derivedMerkleRoot === message.merkleRoot
    );
  }

  /**
   * Returns the most recent {@link Message} published by the given username, if any
   * @param username Username to query, excluding any leading @
   */
  async getLatestActivityForUser(
    username: string
  ): Promise<Message | undefined> {
    const user = await this.userRegistry.lookupByUsername(username);
    if (user === undefined) {
      throw new Error(`no such user "${username}"`);
    }
    return await this.contentHost.getLatestActivityForUser(user);
  }

  /**
   * Yields all {@link Message Messages} from the given username, in order from most to least recent.
   * @param username Username to query, excluding any leading @
   * @param options.includeRecasts True if recasts should be returned, which will be presented as casts from other users
   */
  async *getAllActivityForUser(
    username: string,
    options?: { includeRecasts?: boolean }
  ): AsyncGenerator<Message, void, undefined> {
    const user = await this.userRegistry.lookupByUsername(username);
    if (user === undefined) {
      throw new Error(`no such user "${username}"`);
    }
    yield* this.contentHost.getAllActivityForUser(user, options);
  }
}
