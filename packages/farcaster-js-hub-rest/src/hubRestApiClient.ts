import axios, { AxiosError, AxiosInstance } from 'axios';
import { Logger, silentLogger } from './logger.js';
import type { SetRequired } from 'type-fest';
import {
  CastId,
  CastsApi,
  Configuration,
  ErrorResponse,
  HubInfoResponse as OpenapiHubInfoResponse,
  InfoApi,
  LinksApi,
  LinkType,
  CastAdd,
  ReactionsApi,
  ReactionsApiGetReactionByIdRequest,
  ReactionType,
  Reaction,
  LinkAdd,
  UserDataApi,
  UserDataType,
  UserDataAdd,
  GetUserDataByFid200ResponseOneOf,
  FIDsApi,
  StorageApi,
  StorageLimit,
  UsernamesApi,
  UserNameProof,
  VerificationsApi,
  Verification,
  OnChainEventType,
  OnChainEventSigner,
  OnChainEventsApi,
  OnChainEventSignerMigrated,
  OnChainEventIdRegister,
  OnChainEventStorageRent,
  HubEventsApi,
  HubEvent,
  SubmitMessageApi,
  Message as HubMessage,
} from './openapi/index.js';
import {
  hexStringToBytes,
  Message,
  makeCastAdd,
  makeCastRemove,
  Embed,
  makeLinkAdd,
  makeLinkRemove,
  makeReactionAdd,
  ReactionType as ReactionTypeParam,
  makeReactionRemove,
  makeVerificationAddEthAddress,
  FarcasterNetwork,
  makeVerificationEthAddressClaim,
  makeVerificationRemove,
} from '@farcaster/core';
import { eip712SignerFromMnemonicOrPrivateKey, getLatestBlock, hexToSigner } from './utils.js';

export type OnChainEventsReturnType<T> = T extends OnChainEventType.Signer
  ? OnChainEventSigner
  : T extends OnChainEventType.SignerMigrated
    ? OnChainEventSignerMigrated
    : T extends OnChainEventType.IdRegister
      ? OnChainEventIdRegister
      : T extends OnChainEventType.StorageRent
        ? OnChainEventStorageRent
        : never;

export type HubInfo<T> = T extends true
  ? SetRequired<OpenapiHubInfoResponse, 'dbStats'>
  : OpenapiHubInfoResponse;

export const DEFAULT_HUB_URL = 'https://nemes.farcaster.xyz:2281';

export interface HubRestAPIClientConfig {
  axiosInstance?: AxiosInstance
  hubUrl?: string
  logger?: Logger
}

export interface PaginationOptions {
  pageSize?: number
  reverse?: boolean
}

export class HubRestAPIClient {
  private readonly logger: Logger;

  public readonly apis: {
    casts: CastsApi
    fids: FIDsApi
    hubEvents: HubEventsApi
    info: InfoApi
    links: LinksApi
    onChainEvents: OnChainEventsApi
    reactions: ReactionsApi
    storage: StorageApi
    submitMessage: SubmitMessageApi
    userData: UserDataApi
    usernames: UsernamesApi
    verifications: VerificationsApi
  };

  /**
   * Instantiates a HubRestAPIClient
   */
  constructor({
    axiosInstance,
    hubUrl = DEFAULT_HUB_URL,
    logger = silentLogger,
  }: HubRestAPIClientConfig = {}) {
    this.logger = logger;

    if (axiosInstance === undefined) {
      axiosInstance = axios.create();
    }
    axiosInstance.defaults.decompress = true;
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (HubRestAPIClient.isApiErrorResponse(error)) {
          const apiErrors = error.response.data;
          this.logger.warn(`API errors: ${JSON.stringify(apiErrors)}`);
        }
        throw error;
      },
    );

    const config: Configuration = new Configuration({ basePath: hubUrl });
    this.apis = {
      casts: new CastsApi(config, undefined, axiosInstance),
      info: new InfoApi(config, undefined, axiosInstance),
      links: new LinksApi(config, undefined, axiosInstance),
      reactions: new ReactionsApi(config, undefined, axiosInstance),
      userData: new UserDataApi(config, undefined, axiosInstance),
      fids: new FIDsApi(config, undefined, axiosInstance),
      storage: new StorageApi(config, undefined, axiosInstance),
      submitMessage: new SubmitMessageApi(config, undefined, axiosInstance),
      usernames: new UsernamesApi(config, undefined, axiosInstance),
      verifications: new VerificationsApi(config, undefined, axiosInstance),
      onChainEvents: new OnChainEventsApi(config, undefined, axiosInstance),
      hubEvents: new HubEventsApi(config, undefined, axiosInstance),
    };
  }

  /**
   * Get the Hub's info.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/info.html#info)
   */
  public async getHubInfo<T extends (boolean | undefined)>({
    includeDbStats = false,
  }: {includeDbStats?: T} = {}): Promise<HubInfo<T>> {
    const response = await this.apis.info.getInfo({ dbstats: includeDbStats });
    return response.data as HubInfo<T>;
  }

  /**
   * Submits a Cast.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/submitmessage.html#submitmessage)
   */
  public async submitCast(
    cast: {
      text: string
      embeds?: Embed[]
      embedsDeprecated?: string[]
      mentions?: number[]
      mentionsPositions?: number[],
      parentCastId?: { fid: number, hash: string }
    },
    fid: number,
    signerPrivateKeyHex: string,
  ): Promise<HubMessage | null> {
    const dataOptions = {
      fid: fid,
      network: 1,
    };
    const castAdd = {
      text: cast.text,
      embeds: cast.embeds ?? [],
      embedsDeprecated: cast.embedsDeprecated ?? [],
      mentions: cast.mentions ?? [],
      mentionsPositions: cast.mentionsPositions ?? [],
      ...cast
    };
    const msg = await makeCastAdd(castAdd, dataOptions, hexToSigner(signerPrivateKeyHex));
    if (msg.isErr()) {
      throw msg.error;
    }
    const messageBytes = Buffer.from(Message.encode(msg.value).finish());
    const response = await this.apis.submitMessage.submitMessage({
      body: messageBytes,
    });
    return response.data;
  }

  /**
   * Deletes a Cast.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/submitmessage.html#submitmessage)
   */
  public async removeCast(
    castHash: string,
    fid: number,
    signerPrivateKeyHex: string,
  ): Promise<HubMessage | null> {
    const dataOptions = {
      fid: fid,
      network: 1,
    };
    const targetHashBytes = hexStringToBytes(castHash);
    if (targetHashBytes.isErr()) {
      throw targetHashBytes.error;
    }
    const castToRemove = { targetHash: targetHashBytes.value };

    const msg = await makeCastRemove(castToRemove, dataOptions, hexToSigner(signerPrivateKeyHex));
    if (msg.isErr()) {
      throw msg.error;
    }
    const messageBytes = Buffer.from(Message.encode(msg.value).finish());

    const response = await this.apis.submitMessage.submitMessage({
      body: messageBytes,
    });
    return response.data;
  }

  /**
   * Submits a Link. Used to follow users.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/submitmessage.html#submitmessage)
   */
  public async submitLink(
    link: {
      type: string
      displayTimestamp?: number
      targetFid?: number
    },
    fid: number,
    signerPrivateKeyHex: string,
  ): Promise<HubMessage | null> {
    const dataOptions = {
      fid: fid,
      network: 1,
    };
    const msg = await makeLinkAdd(link, dataOptions, hexToSigner(signerPrivateKeyHex));
    if (msg.isErr()) {
      throw msg.error;
    }
    const messageBytes = Buffer.from(Message.encode(msg.value).finish());
    const response = await this.apis.submitMessage.submitMessage({
      body: messageBytes,
    });
    return response.data;
  }

  /**
   * Follows a User. Wraps submitLink.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/submitmessage.html#submitmessage)
   */
  public async followUser(
    targetFid: number,
    fid: number,
    signerPrivateKeyHex: string,
  ): Promise<HubMessage | null> {
    return await this.submitLink({ type: 'follow', targetFid: targetFid }, fid, signerPrivateKeyHex);
  }

  /**
   * Removes a Link. Used to unfollow users
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/submitmessage.html#submitmessage)
   */
  public async removeLink(
    link: {
      type: string
      displayTimestamp?: number
      targetFid?: number
    },
    fid: number,
    signerPrivateKeyHex: string,
  ): Promise<HubMessage | null> {
    const dataOptions = {
      fid: fid,
      network: 1,
    };
    const msg = await makeLinkRemove(link, dataOptions, hexToSigner(signerPrivateKeyHex));
    if (msg.isErr()) {
      throw msg.error;
    }
    const messageBytes = Buffer.from(Message.encode(msg.value).finish());
    const response = await this.apis.submitMessage.submitMessage({
      body: messageBytes,
    });
    return response.data;
  }

  /**
   * Un-follows a User. Wraps removeLink.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/submitmessage.html#submitmessage)
   */
  public async unfollowUser(
    targetFid: number,
    fid: number,
    signerPrivateKeyHex: string,
  ): Promise<HubMessage | null> {
    return await this.removeLink({ type: 'follow', targetFid: targetFid }, fid, signerPrivateKeyHex);
  }

  /**
   * Submits a Reaction. Used to like or recast.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/submitmessage.html#submitmessage)
   */
  public async submitReaction(
    reaction: {
      type: 'like' | 'recast'
      target: CastId | { url: string }
    },
    fid: number,
    signerPrivateKeyHex: string,
  ): Promise<HubMessage | null> {
    const dataOptions = {
      fid: fid,
      network: 1,
    };
    let castId;
    let targetUrl;
    if ('hash' in reaction.target && 'fid' in reaction.target) {
      const targetHashBytes = hexStringToBytes(reaction.target.hash);
      if (targetHashBytes.isErr()) {
        throw targetHashBytes.error;
      }
      castId = { fid: reaction.target.fid, hash: targetHashBytes.value };
    } else {
      targetUrl = reaction.target.url;
    }
    const reactionAdd = {
      type: reaction.type === 'like' ? ReactionTypeParam.LIKE : ReactionTypeParam.RECAST,
      targetCastId: castId,
      targetUrl: targetUrl,
    };
    const msg = await makeReactionAdd(reactionAdd, dataOptions, hexToSigner(signerPrivateKeyHex));
    if (msg.isErr()) {
      throw msg.error;
    }
    const messageBytes = Buffer.from(Message.encode(msg.value).finish());
    const response = await this.apis.submitMessage.submitMessage({
      body: messageBytes,
    });
    return response.data;
  }

  /**
   * Removes a Reaction. Used to un-like or un-recast.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/submitmessage.html#submitmessage)
   */
  public async removeReaction(
    reaction: {
      type: 'like' | 'recast'
      target: CastId | { url: string }
    },
    fid: number,
    signerPrivateKeyHex: string,
  ): Promise<HubMessage | null> {
    const dataOptions = {
      fid: fid,
      network: 1,
    };
    let castId;
    let targetUrl;
    if ('hash' in reaction.target && 'fid' in reaction.target) {
      const targetHashBytes = hexStringToBytes(reaction.target.hash);
      if (targetHashBytes.isErr()) {
        throw targetHashBytes.error;
      }
      castId = { fid: reaction.target.fid, hash: targetHashBytes.value };
    } else {
      targetUrl = reaction.target.url;
    }
    const reactionRemove = {
      type: reaction.type === 'like' ? ReactionTypeParam.LIKE : ReactionTypeParam.RECAST,
      targetCastId: castId,
      targetUrl: targetUrl,
    };
    const msg = await makeReactionRemove(reactionRemove, dataOptions, hexToSigner(signerPrivateKeyHex));
    if (msg.isErr()) {
      throw msg.error;
    }
    const messageBytes = Buffer.from(Message.encode(msg.value).finish());
    const response = await this.apis.submitMessage.submitMessage({
      body: messageBytes,
    });
    return response.data;
  }

  /**
   * Submits a Verification.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/submitmessage.html#submitmessage)
   */
  public async submitVerification(
    verification: {
      verifiedAddressMnemonicOrPrivateKey: string
      verificationType: 'EOA' | 'contract'
      network: 'MAINNET' | 'TESTNET' | 'DEVNET'
      chainId: number
    },
    fid: number,
    signerPrivateKeyHex: string,
  ): Promise<HubMessage | null> {
    const dataOptions = {
      fid: fid,
      network: 1,
    };
    const verificationSigner = eip712SignerFromMnemonicOrPrivateKey(verification.verifiedAddressMnemonicOrPrivateKey);
    const addressBytes = await verificationSigner.getSignerKey();
    if (addressBytes.isErr()) {
      throw addressBytes.error;
    }
    const latestBlockHashBytes = hexStringToBytes(await getLatestBlock());
    if (latestBlockHashBytes.isErr()) {
      throw latestBlockHashBytes.error;
    }
    const claim = await makeVerificationEthAddressClaim(
      fid,
      addressBytes.value,
      FarcasterNetwork[verification.network as keyof typeof FarcasterNetwork],
      latestBlockHashBytes.value,
    );
    if (claim.isErr()) {
      throw claim.error;
    }
    const ethSignResult = await verificationSigner.signVerificationEthAddressClaim(claim.value);
    if (ethSignResult.isErr()) {
      throw ethSignResult.error;
    }

    const verificationAdd = {
      address: addressBytes.value,
      ethSignature: ethSignResult.value,
      blockHash: latestBlockHashBytes.value,
      verificationType: verification.verificationType === 'EOA' ? 0 : 1,
      chainId: verification.chainId,
    };
    const msg = await makeVerificationAddEthAddress(verificationAdd, dataOptions, hexToSigner(signerPrivateKeyHex));
    if (msg.isErr()) {
      throw msg.error;
    }
    const messageBytes = Buffer.from(Message.encode(msg.value).finish());
    const response = await this.apis.submitMessage.submitMessage({
      body: messageBytes,
    });
    return response.data;
  }

  /**
   * Removes a Verification.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/submitmessage.html#submitmessage)
   */
  public async removeVerification(
    address: string,
    fid: number,
    signerPrivateKeyHex: string,
  ): Promise<HubMessage | null> {
    const dataOptions = {
      fid: fid,
      network: 1,
    };
    const addressBytes = hexStringToBytes(address);
    if (addressBytes.isErr()) {
      throw addressBytes.error;
    }
    const msg = await makeVerificationRemove({ address: addressBytes.value }, dataOptions, hexToSigner(signerPrivateKeyHex));
    if (msg.isErr()) {
      throw msg.error;
    }
    const messageBytes = Buffer.from(Message.encode(msg.value).finish());
    const response = await this.apis.submitMessage.submitMessage({
      body: messageBytes,
    });
    return response.data;
  }

  /**
   * Get a cast by its FID and Hash.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/casts.html#castbyid)
   */
  public async getCastById({ fid, hash }: CastId): Promise<CastAdd | null> {
    try {
      const response = await this.apis.casts.getCastById({ fid, hash });
      return response.data;
    } catch (err) {
      if (
        HubRestAPIClient.isApiErrorResponse(err) &&
        err.response.data.errCode === 'not_found'
      ) {
        return null;
      }
      throw err;
    }
  }

  /**
   * Fetch all casts for authored by an FID.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/casts.html#castsbyfid)
   * @param fid The FID of the cast's creator
   * @param options
   */
  public async * listCastsByFid(
    fid: number,
    options?: PaginationOptions,
  ): AsyncGenerator<CastAdd, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.casts.listCastsByFid({
        fid,
        ...options,
        pageToken,
      });

      // yield current page
      yield * response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === '') {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Fetch all casts that mention an FID.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/casts.html#castsbymention)
   * @param fid The FID that is mentioned in a cast
   * @param options
   */
  public async * listCastsByMention(
    fid: number,
    options?: PaginationOptions,
  ): AsyncGenerator<CastAdd, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.casts.listCastsByMention({
        ...options,
        fid,
        pageToken,
      });

      // yield current page
      yield * response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === '') {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Fetch all casts by parent cast's FID and Hash OR by the parent's URL.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/casts.html#castsbyparent)
   * @param parent
   * @param options
   */
  public async * listCastsByParent(
    parent: CastId | { url: string },
    options?: PaginationOptions,
  ): AsyncGenerator<CastAdd, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.casts.listCastsByParent({
        ...parent,
        ...options,
        pageToken,
      });

      // yield current page
      yield * response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === '') {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Get a reaction by its created FID and target Cast.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/reactions.html#reactionbyid)
   * @param id The source and target of the reaction, and the reaction type
   * @returns
   */
  public async getReactionById(
    id: ReactionsApiGetReactionByIdRequest,
  ): Promise<Reaction | null> {
    try {
      const result = await this.apis.reactions.getReactionById(id);
      return result.data;
    } catch (err) {
      if (
        HubRestAPIClient.isApiErrorResponse(err) &&
        err.response.data.errCode === 'not_found'
      ) {
        return null;
      }
      throw err;
    }
  }

  /**
   * Get all reactions by an FID.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/reactions.html#reactionsbyfid)
   * @param fid The FID of the reaction's creator
   * @param reactionType The type of reaction
   * @param options
   */
  public async * listReactionsByFid(
    fid: number,
    reactionType: ReactionType,
    options?: PaginationOptions,
  ): AsyncGenerator<Reaction, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.reactions.listReactionsByFid({
        fid,
        reactionType,
        ...options,
        pageToken,
      });

      // yield current page
      yield * response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === '') {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Get all reactions to a cast.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/reactions.html#reactionsbycast)
   * @param targetFid The FID of the cast's creator
   * @param targetHash The hash of the cast
   * @param reactionType The type of reaction
   * @param options
   */
  public async * listReactionsByCast(
    targetFid: number,
    targetHash: string,
    reactionType: ReactionType,
    options?: PaginationOptions,
  ): AsyncGenerator<Reaction, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.reactions.listReactionsByCast({
        targetFid,
        targetHash,
        reactionType,
        ...options,
        pageToken,
      });

      // yield current page
      yield * response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === '') {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Get all reactions to cast's target URL.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/reactions.html#reactionsbytarget)
   * @param url The URL of the parent cast
   * @param reactionType The type of reaction
   * @param options
   */
  public async * listReactionsByTarget(
    url: string,
    reactionType: ReactionType,
    options?: PaginationOptions,
  ): AsyncGenerator<Reaction, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.reactions.listReactionsByTarget({
        url,
        reactionType,
        ...options,
        pageToken,
      });

      // yield current page
      yield * response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === '') {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Get a link by its FID and target FID.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/links.html#linkbyid)
   */
  public async getLinkById(
    sourceFid: number,
    targetFid: number,
  ): Promise<LinkAdd | null> {
    try {
      const result = await this.apis.links.getLinkById({
        fid: sourceFid,
        targetFid,
        linkType: LinkType.Follow,
      });
      return result.data;
    } catch (err) {
      if (
        HubRestAPIClient.isApiErrorResponse(err) &&
        err.response.data.errCode === 'not_found'
      ) {
        return null;
      }
      throw err;
    }
  }

  /**
   * Get all links from a source FID.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/links.html#linksbyfid)
   * @param fid The FID of the link's originator
   * @param options
   */
  public async * listLinksByFid(
    fid: number,
    options?: PaginationOptions,
  ): AsyncGenerator<LinkAdd, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.links.listLinksByFid({
        fid,
        linkType: LinkType.Follow,
        ...options,
        pageToken,
      });

      // yield current page
      yield * response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === '') {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Get all links to a target FID.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/links.html#linksbytargetfid)
   * @param targetFid
   * @param options
   */
  public async * listLinksByTargetFid(
    targetFid: number,
    options?: PaginationOptions,
  ): AsyncGenerator<LinkAdd, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.links.listLinksByTargetFid({
        targetFid,
        linkType: LinkType.Follow,
        ...options,
        pageToken,
      });

      // yield current page
      yield * response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === '') {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Get a specific type of UserData for a FID.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/userdata.html#userdatabyfid)
   * @param fid The FID that's being requested
   * @param userDataType The type of UserData requested
   * @returns
   */
  public async getSpecificUserDataByFid(
    fid: number,
    userDataType: UserDataType,
  ): Promise<UserDataAdd | null> {
    try {
      const response = await this.apis.userData.getUserDataByFid({
        fid,
        userDataType,
      });
      return response.data as UserDataAdd;
    } catch (err) {
      if (
        HubRestAPIClient.isApiErrorResponse(err) &&
        err.response.data.errCode === 'not_found'
      ) {
        return null;
      }
      throw err;
    }
  }

  /**
   * Get all UserData for a FID. Returns an empty iterator if FID has no user data or does not exist.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/userdata.html#userdatabyfid)
   * @param fid The FID that's being requested
   * @returns
   */
  public async * listAllUserDataByFid(
    fid: number,
    options?: PaginationOptions,
  ): AsyncGenerator<UserDataAdd, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.userData.getUserDataByFid({
        fid,
        ...options,
        pageToken,
      });

      // yield current page
      const data = response.data as GetUserDataByFid200ResponseOneOf;
      yield * data.messages;

      // prep for next page
      if (data.nextPageToken === '') {
        break;
      }
      pageToken = data.nextPageToken;
    }
  }

  /**
   * Get a list of all the FIDs.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/fids.html#fids)
   * @param options
   */
  public async * listFids(
    options?: PaginationOptions,
  ): AsyncGenerator<number, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.fids.listFids({
        ...options,
        pageToken,
      });

      // yield current page
      yield * response.data.fids;

      // prep for next page
      if (response.data.nextPageToken === '') {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Get an FID's storage limits.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/storagelimits.html#storagelimitsbyfid)
   * @param fid The FID that's being requested
   * @returns
   */
  public async getStorageLimitsByFid(fid: number): Promise<StorageLimit[]> {
    const response = await this.apis.storage.getStorageLimitsByFid({ fid });
    return response.data.limits;
  }

  /**
   * Get an proof for a username by the Farcaster username.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/usernameproof.html#usernameproofbyname)
   * @param username The Farcaster username or ENS address
   * @returns
   */
  public async getUsernameProof(
    username: string,
  ): Promise<UserNameProof | null> {
    try {
      const response = await this.apis.usernames.getUsernameProof({
        name: username,
      });
      return response.data;
    } catch (err) {
      if (
        HubRestAPIClient.isApiErrorResponse(err) &&
        err.response.data.errCode === 'not_found'
      ) {
        return null;
      }
      throw err;
    }
  }

  /**
   * Get a list of proofs provided by an FID.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/usernameproof.html#usernameproofsbyfid)
   * @param fid The FID being requested
   * @returns
   */
  public async listUsernameProofsForFid(fid: number): Promise<UserNameProof[]> {
    const response = await this.apis.usernames.listUsernameProofsByFid({ fid });
    return response.data.proofs;
  }

  /**
   * Get a list of verifications provided by an FID.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/verification.html)
   * @param fid The FID being requested
   * @param options The optional ETH address to filter by
   */
  public async * listVerificationsByFid(
    fid: number,
    options?: PaginationOptions & { address?: string },
  ): AsyncGenerator<Verification, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.verifications.listVerificationsByFid({
        fid,
        ...options,
        pageToken,
      });

      // yield current page
      yield * response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === '') {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Get a list of on-chain events by an FID.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/onchain.html#onchaineventsbyfid)
   * @param fid The FID being requested
   * @param eventType The event type being requested
   * @returns
   */
  public async listOnChainEventsByFid<T extends OnChainEventType>(
    fid: number,
    eventType: T,
  ): Promise<Array<OnChainEventsReturnType<T>>> {
    const response = await this.apis.onChainEvents.listOnChainEventsByFid({
      fid,
      eventType,
    });
    return response.data.events as Array<OnChainEventsReturnType<T>>;
  }

  /**
   * Get a specific on-chain signer event by FID and signer.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/onchain.html#onchainsignersbyfid)
   * @param fid The FID being requested
   * @param signer The key of signer
   * @returns
   */
  public async getOnChainSignerEventBySigner(
    fid: number,
    signer: string,
  ): Promise<OnChainEventSigner | null> {
    try {
      const response = await this.apis.onChainEvents.listOnChainSignersByFid({
        fid,
        signer,
      });
      return response.data as OnChainEventSigner;
    } catch (err) {
      if (
        HubRestAPIClient.isApiErrorResponse(err) &&
        err.response.data.errCode === 'not_found'
      ) {
        return null;
      }
      throw err;
    }
  }

  /**
   * Get a specific on-chain ID registration event by address.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/onchain.html#onchainidregistryeventbyaddress)
   * @param address The ETH address being requested
   * @returns
   */
  public async getOnChainIdRegistryEventByAddress(
    address: string,
  ): Promise<OnChainEventIdRegister | null> {
    try {
      const response =
        await this.apis.onChainEvents.getOnChainIdRegistrationByAddress({
          address,
        });
      return response.data;
    } catch (err) {
      if (
        HubRestAPIClient.isApiErrorResponse(err) &&
        err.response.data.errCode === 'not_found'
      ) {
        return null;
      }
      throw err;
    }
  }

  /**
   * Get a hub event by its Id.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/events.html#eventbyid)
   * @param eventId The Hub Id of the event
   * @returns
   */
  public async getHubEventById(eventId: number): Promise<HubEvent | null> {
    try {
      const response = await this.apis.hubEvents.getEventById({
        eventId,
      });
      return response.data;
    } catch (err) {
      if (
        HubRestAPIClient.isApiErrorResponse(err) &&
        err.response.data.errCode === 'not_found'
      ) {
        return null;
      }
      throw err;
    }
  }

  /**
   * Get a page of Hub events.
   * See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/events.html#events)
   * @param fromEventId An optional Hub Id to start getting events from.
   */
  public async * listHubEvents(
    fromEventId?: number,
  ): AsyncGenerator<HubEvent, void, undefined> {
    while (true) {
      // fetch one page
      const response = await this.apis.hubEvents.listEvents({
        fromEventId,
      });

      // yield current page
      if (response.data.events.length === 0) {
        break;
      }
      yield * response.data.events;

      // prep for next page
      fromEventId = response.data.nextPageEventId;
    }
  }

  /**
   * Utility for parsing errors returned by a hub's REST API server. Returns true
   * if the given error is caused by an error response from the server, and
   * narrows the type of `error` accordingly.
   */
  public static isApiErrorResponse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any,
  ): error is SetRequired<AxiosError<ErrorResponse>, 'response'> {
    if (!(error instanceof AxiosError)) return false;
    return (
      error.response?.data !== undefined && 'errCode' in error.response.data
    );
  }
}
