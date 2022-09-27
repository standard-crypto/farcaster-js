import { Signer } from "@ethersproject/abstract-signer";
import axios, { AxiosInstance } from "axios";
import { APIResult, User } from "./api";
import { Overrides, ContractTransaction } from "@ethersproject/contracts";
import { Provider } from "@ethersproject/providers";
import {
  IdRegistry,
  IdRegistry__factory,
  NameRegistry,
  NameRegistry__factory,
} from "./contracts";
import { formatBytes32String } from "@ethersproject/strings";
import { BigNumber } from "@ethersproject/bignumber";
import { utils } from "ethers";
import { arrayify } from "ethers/lib/utils";

/**
 * Registry of usernames and their corresponding owners, as well as the directory URL of each user.
 */
export class UserRegistry {
  static readonly DEFAULT_WEB2_HOST = "api.farcaster.xyz";

  static readonly GOERLI_ADDRESSES = {
    nameRegistry: "0xe3Be01D99bAa8dB9905b33a3cA391238234B79D1",
    idRegistry: "0xDA107A1CAf36d198B12c16c7B6a1d1C795978C42",
  };

  static readonly REVEAL_DELAY = 60; // 60 seconds

  readonly nameRegistry: Promise<NameRegistry>;
  readonly idRegistry: Promise<IdRegistry>;
  readonly provider: Provider;

  private readonly axiosInstance: AxiosInstance;

  /**
   * @param web3Provider Provide Infura/Alchemy/etc
   * @param __namedParameters.axiosInstance Override for improved caching, rate-limiting, etcetera
   */
  constructor(
    web3Provider: Provider,
    {
      axiosInstance,
    }: {
      axiosInstance?: AxiosInstance;
    } = {}
  ) {
    if (axiosInstance === undefined) {
      axiosInstance = axios.create({
        baseURL: `https://${UserRegistry.DEFAULT_WEB2_HOST}/`,
        validateStatus: (status) => status >= 200 && status < 300,
      });
    }
    this.axiosInstance = axiosInstance;
    this.provider = web3Provider;

    this.nameRegistry = (async (): Promise<NameRegistry> => {
      const network = await web3Provider.getNetwork();
      let contractAddress: string;
      switch (network.name) {
        case "goerli":
          contractAddress = UserRegistry.GOERLI_ADDRESSES.nameRegistry;
          break;
        default:
          throw new Error(`network ${network.name} not supported`);
      }
      return NameRegistry__factory.connect(contractAddress, web3Provider);
    })();

    this.idRegistry = (async (): Promise<IdRegistry> => {
      const network = await web3Provider.getNetwork();
      let contractAddress: string;
      switch (network.name) {
        case "goerli":
          contractAddress = UserRegistry.GOERLI_ADDRESSES.idRegistry;
          break;
        default:
          throw new Error(`network ${network.name} not supported`);
      }
      return IdRegistry__factory.connect(contractAddress, web3Provider);
    })();
  }

  /**
   * Verifies that the given username is acceptable by the NameRegistry contract.
   * @see https://goerli.etherscan.io/address/0xf73bc3fa2f6f774d4b6791414b1092a40cd83831#code#F1#L1085
   * @param username
   */
  static validateUsername(username: string): void {
    const unameBytes = utils.toUtf8Bytes(username);
    if (unameBytes.length > 16) {
      throw new Error("username cannot be greater than 16 characters");
    }
    if (unameBytes.length === 0) {
      throw new Error("username cannot be empty string");
    }
    let nameEnded = false;

    /**
     * Iterate over the bytes16 fname one char at a time, ensuring that:
     *   1. The name begins with [a-z 0-9] or the ascii numbers [48-57, 97-122] inclusive
     *   2. The name can contain [a-z 0-9 -] or the ascii numbers [45, 48-57, 97-122] inclusive
     *   3. Once the name is ended with a NULL char (0), the follows character must also be NULLs
     */

    // If the name begins with a hyphen, reject it
    if (unameBytes[0] === 45) throw new Error("invalid name");

    unameBytes.forEach((charInt, index) => {
      if (nameEnded) {
        // Only NULL characters are allowed after a name has ended
        if (charInt !== 0) {
          throw new Error("invalid name");
        }
      } else {
        // Only valid ASCII characters [45, 48-57, 97-122] are allowed before the name ends

        // Check if the character is a-z
        if (charInt >= 97 && charInt <= 122) {
          return;
        }

        // Check if the character is 0-9
        if (charInt >= 48 && charInt <= 57) {
          return;
        }

        // Check if the character is a hyphen
        if (charInt === 45) {
          return;
        }

        // On seeing the first NULL char in the name, revert if is the first char in the
        // name, otherwise mark the name as ended
        if (charInt === 0) {
          // We check i==1 instead of i==0 because i is incremented before the check
          if (index === 1) throw new Error("invalid name");
          nameEnded = true;
          return;
        }

        throw new Error("invalid name");
      }
    });
  }

  /**
   * @see https://goerli.etherscan.io/address/0xf73bc3fa2f6f774d4b6791414b1092a40cd83831#code#F1#L440
   * @param username
   * @returns UInt256 representation of the given username
   */
  static usernameToTokenId(username: string): BigNumber {
    this.validateUsername(username);
    const unameBytes = formatBytes32String(username);
    return BigNumber.from(unameBytes);
  }

  /**
   * Fetches the "Farcaster ID" of a user, which is the permanent, immutable ID associated with that
   * user (compared to usernames, which may be transferred and changed)
   * @param address
   * @returns FarcasterID or 0 if user is not registered to one
   */
  async getFarcasterID(address: string): Promise<BigNumber> {
    const idRegistry = await this.idRegistry;
    return await idRegistry.idOf(address);
  }

  /**
   * Fetches a full {@link User} by username, if any exists. Undefined otherwise.
   * @param username
   * @returns
   */
  async lookupByUsername(username: string): Promise<User | undefined> {
    const nameRegistry = await this.nameRegistry;

    // look up owning address
    let ownerAddr: string;
    try {
      ownerAddr = await nameRegistry.ownerOf(
        UserRegistry.usernameToTokenId(username)
      );
    } catch (error) {
      if (
        error !== null &&
        typeof error === "object" &&
        (error as Record<string, string>).reason === "ERC721: invalid token ID"
      ) {
        // username was not registered
        return undefined;
      }
      throw error;
    }

    // fetch user's full profile
    return await this.lookupByAddress(ownerAddr);
  }

  /**
   * Fetches a full {@link User} by address, if any exists. Undefined otherwise.
   * @param address
   * @returns
   */
  async lookupByAddress(address: string): Promise<User | undefined> {
    // lookup user profile
    const resp = await this.axiosInstance.get<
      APIResult<{ user: Omit<User, "farcasterId"> }>
    >(`v1/profiles/${address}`, {
      validateStatus: (status) => status === 200 || status === 404,
    });
    if (resp.status === 404) {
      return undefined;
    }
    const userWithoutFID = resp.data.result.user;

    // need to add the user's Farcaster ID
    const farcasterId = await this.getFarcasterID(address);
    return {
      ...userWithoutFID,
      farcasterId,
    };
  }

  /**
   * Yields all registered users, in no particular order
   */
  async *getAllUsers(): AsyncGenerator<User, void, undefined> {
    let pageNum = 1;
    while (true) {
      const usersResp = await this.axiosInstance.get<User[]>("indexer/users", {
        params: {
          filter: "recent",
          per_page: 25,
          page: pageNum,
        },
      });
      if (usersResp.data.length === 0) {
        return;
      }
      yield* usersResp.data;
      pageNum += 1;
    }
  }

  /**
   * Yields all registered usernames, in no particular order
   */
  async *getAllUsernames(): AsyncGenerator<string, void, undefined> {
    for await (const user of this.getAllUsers()) {
      yield user.username;
    }
  }

  /**
   * Transfers ownership of a username to a new address. The Signer must be the current owner of the given username.
   * @param username
   * @param newAddress
   * @param signer
   * @param overrides
   * @returns
   */
  async transferUsernameOwnership(
    username: string,
    newAddress: string,
    signer: Signer,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const nameRegistry = await this.nameRegistry;
    signer = signer.connect(this.provider);
    const oldAddress = await signer.getAddress();
    const tokenId = UserRegistry.usernameToTokenId(username);
    return await nameRegistry
      .connect(signer)
      .transferFrom(oldAddress, newAddress, tokenId, {
        ...overrides,
      });
  }

  /**
   * Publishes an on-chain commitment to a username, as a prerequisite
   * to ultimately registering that username. Returns an on-chain
   * transaction and the random nonce used in registering that username.
   * The same random nonce must be provided when finally registering the
   * username
   * @param username The name to register
   * @param ownerAddress The address that will own the username
   * @param recoveryAddress The address which can recovery the fname if the custody address is lost
   * @param signer The Signer that will pay the gas
   * @param overrides ethers transaction overrides
   */
  async commitToUsername(
    username: string,
    ownerAddress: string,
    recoveryAddress: string,
    signer: Signer,
    overrides?: Overrides
  ): Promise<{ tx: ContractTransaction; nonce: Uint8Array }> {
    const nameRegistry = await this.nameRegistry;
    signer = signer.connect(this.provider);

    // check that the contract currently allows self-registration of usernames
    const trustedOnly = await nameRegistry.trustedOnly();
    if (trustedOnly.eq(1)) {
      throw new Error(
        "nameRegistry not currently permitting self-registration of usernames"
      );
    }

    // check that username isn't already registered
    const existingRegistration = await this.lookupByUsername(username);
    if (existingRegistration !== undefined) {
      throw new Error(`username ${username} already registered`);
    }

    // validate username
    UserRegistry.validateUsername(username);

    // construct commit hash
    const unameBytes = arrayify(formatBytes32String(username)).slice(0, 16);
    const nonce = utils.randomBytes(32);
    const commitHash = await nameRegistry.generateCommit(
      unameBytes,
      ownerAddress,
      nonce,
      recoveryAddress
    );

    // publish commit hash
    const tx = await nameRegistry
      .connect(signer)
      .makeCommit(commitHash, { ...overrides });

    return { tx, nonce };
  }

  /**
   * Registers a username after it was pre-committed via `commitToUsername`.
   * @param username The name to register
   * @param ownerAddress The address that will own the username
   * @param recoveryAddress The address which can recovery the fname if the custody address is lost
   * @param nonce Random nonce used when committing to the username
   * @param signer The Signer that will pay both the gas and the registration fee
   * @param overrides ethers transaction overrides
   */
  async registerUsername(
    username: string,
    ownerAddress: string,
    recoveryAddress: string,
    nonce: Uint8Array,
    signer: Signer,
    overrides?: Omit<Overrides, "value">
  ): Promise<ContractTransaction> {
    const nameRegistry = await this.nameRegistry;
    signer = signer.connect(this.provider);

    // check that the contract currently allows self-registration of usernames
    const trustedOnly = await nameRegistry.trustedOnly();
    if (trustedOnly.eq(1)) {
      throw new Error(
        "nameRegistry not currently permitting self-registration of usernames"
      );
    }

    // check that username isn't already registered
    const existingRegistration = await this.lookupByUsername(username);
    if (existingRegistration !== undefined) {
      throw new Error(`username ${username} already registered`);
    }

    // validate username
    UserRegistry.validateUsername(username);

    // construct commit hash
    const unameBytes = utils.toUtf8Bytes(username);
    const commitHash = await nameRegistry.generateCommit(
      unameBytes,
      ownerAddress,
      nonce,
      recoveryAddress
    );

    // check for existence of commit hash
    const commitTs = await nameRegistry.timestampOf(commitHash);
    if (commitTs.isZero()) {
      throw new Error("existing commit hash not found");
    }

    // check for enough time elapsed since commit hash
    const now = BigNumber.from(Math.round(new Date().getTime() / 1000));
    const revealDelay = UserRegistry.REVEAL_DELAY;
    if (now.lt(commitTs.add(revealDelay))) {
      throw new Error("not enough time elapsed since commit hash");
    }

    // check for enough balance to pay registration fee
    const fee = await nameRegistry.fee();
    const signerBalance = await signer.getBalance();
    if (signerBalance.lt(fee)) {
      const feeEther = utils.formatEther(fee);
      throw new Error(
        `insufficient signer balance to pay registration fee (${feeEther} ETH)`
      );
    }

    // register on-chain
    return await nameRegistry
      .connect(signer)
      .register(unameBytes, ownerAddress, nonce, recoveryAddress, {
        ...overrides,
        value: fee,
      });
  }
}
