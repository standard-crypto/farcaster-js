import { Signer } from "@ethersproject/abstract-signer";
import axios, { AxiosInstance } from "axios";
import { User } from "./api";
import { Provider } from "@ethersproject/providers";
import {
  formatBytes32String,
  parseBytes32String,
} from "@ethersproject/strings";
import { RegistryV2__factory } from "./contracts";
import {
  RegisterNameEvent,
  RegistryV2,
  TransferNameEvent,
} from "./contracts/RegistryV2";
import { Overrides, ContractTransaction } from "@ethersproject/contracts";

/**
 * Registry of usernames and their corresponding owners, as well as the directory URL of each user.
 */
export interface UserRegistry extends UserRegistryReader, UserRegistryWriter {}

export interface UserRegistryReader {
  lookupByUsername: (username: string) => Promise<User | undefined>;
  lookupByAddress: (address: string) => Promise<User | undefined>;
  getAllUsers: () => AsyncGenerator<User, void, undefined>;
  getAllUsernames: () => AsyncGenerator<string, void, undefined>;
}

export interface UserRegistryWriter {
  registerUsername: (
    username: string,
    signer: Signer,
    overrides?: Overrides & { directoryUrl?: string }
  ) => Promise<ContractTransaction>;
  updateDirectoryUrl: (
    newUrl: string,
    signer: Signer,
    overrides?: Overrides
  ) => Promise<ContractTransaction>;
  transferUsernameOwnership: (
    newAddress: string,
    signer: Signer,
    overrides?: Overrides
  ) => Promise<ContractTransaction>;
}

/**
 * Uses the indexers provided at guardian.farcaster.xyz to fetch details of registered Users.
 * Does not support registering new users, transferring user ownership, or editing directory URLs.
 * Improved efficiency over querying web3 directly, but not guaranteed to accurately reflect the most recent state.
 */
export class Web2UserRegistry implements UserRegistryReader {
  static readonly DEFAULT_HOST = "guardian.farcaster.xyz";

  readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance?: AxiosInstance) {
    if (axiosInstance == null) {
      axiosInstance = axios.create({
        baseURL: `https://${Web2UserRegistry.DEFAULT_HOST}/admin`,
        validateStatus: (status) => status >= 200 && status < 300,
      });
    }
    this.axiosInstance = axiosInstance;
  }

  async lookupByUsername(username: string): Promise<User | undefined> {
    const resp = await this.axiosInstance.get<User>(`/usernames/${username}`, {
      validateStatus: (status) => status === 200 || status === 404,
    });
    if (resp.status === 404) {
      return undefined;
    }
    return resp.data;
  }

  async lookupByAddress(address: string): Promise<User | undefined> {
    for await (const user of this.getAllUsers()) {
      if (user.address === address) {
        return user;
      }
    }
    return undefined;
  }

  async *getAllUsers(): AsyncGenerator<User, void, undefined> {
    const allUsernamesResp = await this.axiosInstance.get<User[]>("usernames");
    yield* allUsernamesResp.data;
  }

  async *getAllUsernames(): AsyncGenerator<string, void, undefined> {
    for await (const user of this.getAllUsers()) {
      yield user.username;
    }
  }
}

interface _UsernameRegisteredAndTransferredEvents {
  registered?: RegisterNameEvent;
  transferred: TransferNameEvent[];
}

/**
 * Reads and writes directly to the Farcaster Ethereum contract, which is the authoritative
 * source for user registrations.
 */
export class Web3UserRegistry implements UserRegistry {
  static readonly RINKEBY_ADDRESS =
    "0xe3be01d99baa8db9905b33a3ca391238234b79d1";

  private static readonly _REGISTRY_CREATED_BLOCK_NUMBER: Record<
    string,
    number
  > = {
    rinkeby: 8562445,
  };

  readonly contract: Promise<RegistryV2>;
  readonly provider: Provider;

  constructor(provider: Provider) {
    this.provider = provider;
    this.contract = (async (): Promise<RegistryV2> => {
      const network = await provider.getNetwork();
      let contractAddress: string;
      switch (network.name) {
        case "rinkeby":
          contractAddress = Web3UserRegistry.RINKEBY_ADDRESS;
          break;
        default:
          throw new Error(`network ${network.name} not supported`);
      }
      return RegistryV2__factory.connect(contractAddress, provider);
    })();
  }

  async lookupByUsername(username: string): Promise<User | undefined> {
    const contract = await this.contract;
    const [directoryUrl, isInitialized] = await contract.usernameToUrl(
      formatBytes32String(username)
    );
    if (!isInitialized) {
      return undefined;
    }
    const address = await this.getCurrentOwner(username);
    if (address === undefined) {
      throw new Error(
        `username ${username} is initialized but has no corresponding RegisterName events logged`
      );
    }
    const { createdAt, modifiedAt } = await this._fetchUserCreatedAndModified(
      username
    );
    return {
      username,
      directoryUrl,
      address,
      createdAt,
      modifiedAt,
    };
  }

  async lookupByAddress(address: string): Promise<User | undefined> {
    const contract = await this.contract;
    const username = parseBytes32String(
      await contract.addressToUsername(address)
    );
    if (username === "") {
      return undefined;
    }
    const directoryUrl = await contract.getDirectoryUrl(
      formatBytes32String(username)
    );
    const { createdAt, modifiedAt } = await this._fetchUserCreatedAndModified(
      username
    );
    return {
      username,
      directoryUrl,
      address,
      createdAt,
      modifiedAt,
    };
  }

  async *getAllUsers(): AsyncGenerator<User, void, undefined> {
    for await (const username of this.getAllUsernames()) {
      const user = await this.lookupByUsername(username);
      if (user != null) {
        yield user;
      }
    }
  }

  async *getAllUsernames(): AsyncGenerator<string, void, undefined> {
    const contract = await this.contract;
    // Until the list of usernames is exposed in the contract, the only option is to iterate through the event log
    const registerNameEventsFilter = await contract.filters.RegisterName(
      null /* owner */,
      null /* username */
    );
    const currentBlockNumber = await this.provider.getBlockNumber();
    const seenUsernames = new Set<string>();
    const blockPageSize = 10000;
    let pageStart = currentBlockNumber - blockPageSize;
    const blockWhenContractCreated = await this._blockWhenContractCreated();
    while (pageStart + blockPageSize >= blockWhenContractCreated) {
      const pageEnd = pageStart + blockPageSize;
      const registerNameEvents = await contract.queryFilter(
        registerNameEventsFilter,
        pageStart,
        pageEnd
      );
      for (const event of registerNameEvents) {
        const username = parseBytes32String(event.args.username);
        if (seenUsernames.has(username)) continue;
        yield username;
        seenUsernames.add(username);
      }
      pageStart -= blockPageSize;
    }
  }

  async transferUsernameOwnership(
    newAddress: string,
    signer: Signer,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = await this.contract;
    return await contract
      .connect(signer)
      .transferOwnership(newAddress, { ...overrides });
  }

  async updateDirectoryUrl(
    newUrl: string,
    signer: Signer,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = await this.contract;
    return await contract.connect(signer).modify(newUrl, { ...overrides });
  }

  async registerUsername(
    username: string,
    signer: Signer,
    overrides?: Overrides & { directoryUrl?: string }
  ): Promise<ContractTransaction> {
    const contract = await this.contract;
    let directoryUrl = overrides?.directoryUrl;
    if (directoryUrl === undefined) {
      directoryUrl = defaultDirectoryUrl(await signer.getAddress());
    }
    return await contract
      .connect(signer)
      .register(formatBytes32String(username), directoryUrl, { ...overrides });
  }

  async getCurrentOwner(username: string): Promise<string | undefined> {
    const { registered, transferred } =
      await this._fetchUsernameRegisteredAndTransferredEvents(username);
    if (registered == null) {
      return undefined;
    }
    if (transferred.length > 0) {
      const lastTransferred = transferred[transferred.length - 1];
      return lastTransferred.args.to;
    }
    return registered.args.owner;
  }

  private async _fetchUsernameRegisteredAndTransferredEvents(
    username: string
  ): Promise<_UsernameRegisteredAndTransferredEvents> {
    const contract = await this.contract;
    const registerNameEventsFilter = await contract.filters.RegisterName(
      null /* owner */,
      formatBytes32String(username)
    );
    const transferNameEventsFilter = await contract.filters.TransferName(
      null /* from */,
      null /* to */,
      formatBytes32String(username)
    );
    const registerNameEvents = await contract.queryFilter(
      registerNameEventsFilter,
      await this._blockWhenContractCreated()
    );
    if (registerNameEvents.length === 0) {
      return {
        registered: undefined,
        transferred: [],
      };
    }
    const mostRecentlyRegistered =
      registerNameEvents[registerNameEvents.length - 1];
    const transferNameEvents = await contract.queryFilter(
      transferNameEventsFilter,
      mostRecentlyRegistered.blockHash
    );
    return {
      registered: mostRecentlyRegistered,
      transferred: transferNameEvents,
    };
  }

  private async _fetchUserCreatedAndModified(
    username: string
  ): Promise<{ createdAt: string; modifiedAt: string }> {
    const { registered, transferred } =
      await this._fetchUsernameRegisteredAndTransferredEvents(username);
    if (registered == null) {
      throw new Error(`no RegisterName events logged for username ${username}`);
    }
    const blockRegisteredIn = await registered.getBlock();

    // timestamp is in epoch seconds
    // https://docs.soliditylang.org/en/latest/units-and-global-variables.html?highlight=block#block-and-transaction-properties
    const createdAt = `${blockRegisteredIn.timestamp}`;
    let modifiedAt = createdAt;

    if (transferred.length > 0) {
      const blockUpdatedIn = await transferred[
        transferred.length - 1
      ].getBlock();
      modifiedAt = `${blockUpdatedIn.timestamp}`;
    }
    return { createdAt, modifiedAt };
  }

  private async _blockWhenContractCreated(): Promise<number> {
    const networkName = (await this.provider.getNetwork()).name;
    if (!(networkName in Web3UserRegistry._REGISTRY_CREATED_BLOCK_NUMBER)) {
      throw new Error(
        `missing _REGISTRY_CREATED_BLOCK_NUMBER for network ${networkName}`
      );
    }
    return Web3UserRegistry._REGISTRY_CREATED_BLOCK_NUMBER[networkName];
  }
}

export function defaultDirectoryUrl(ownerAddress: string): string {
  if (ownerAddress.match(/^0x[a-fA-F0-9]{40}$/) == null) {
    throw new Error(`${ownerAddress} is not a valid Ethereum address`);
  }
  return `https://guardian.farcaster.xyz/origin/directory/${ownerAddress}`;
}
