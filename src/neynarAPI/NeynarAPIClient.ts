import {
  Cast as v1Cast,
  User,
  CastApi as CastApiV1,
  UserApi,
  VerificationApi,
  NotificationsApi,
  ReactionsApi,
  FollowsApi as FollowsApiV1,
  Configuration,
  ErrorRes,
  Reaction,
  ReactionWithCastMeta,
  VerificationResponseResult,
} from "./neynarV1API/openapi";
import {
  CastApi as CastApiV2,
  SignerApi,
  Signer,
  Cast as v2Cast,
  CastParamType,
  PostCastReqBody,
  PostCastResponseCast,
  DeleteCastReqBody,
  RegisterSignerKeyReqBody,
  ReactionApi,
  ReactionReqBody,
  ReactionType,
  OperationResponse,
  FollowApi as FollowApiV2,
  FollowReqBody,
  BulkFollowResponse,
  CastEmbeds,
} from "./neynarV2API/openapi";
import axios, { AxiosError, AxiosInstance } from "axios";
import { silentLogger, Logger } from "../logger";
import type { WithRequired } from "../utils";

const BASE_PATH = "https://api.neynar.com/";

export class NeynarAPIClient {
  private readonly logger: Logger;

  public readonly apis: {
    user: UserApi;
    v1Cast: CastApiV1;
    verification: VerificationApi;
    notifications: NotificationsApi;
    reactions: ReactionsApi;
    v1Follows: FollowsApiV1;
    signer: SignerApi;
    v2Cast: CastApiV2;
    reaction: ReactionApi;
    v2Follow: FollowApiV2;
  };

  /**
   * Instantiates a NeynarV1APIClient
   *
   * Note: A Wallet must be provided if the API client is to mint new AuthTokens
   */
  constructor(
    apiKey: string,
    {
      logger = silentLogger,
      axiosInstance,
    }: { logger?: Logger; axiosInstance?: AxiosInstance } = {}
  ) {
    this.logger = logger;

    if (apiKey === undefined) {
      throw new Error(
        "Attempt to use an authenticated API method without first providing an api key"
      );
    }

    if (axiosInstance === undefined) {
      axiosInstance = axios.create();
    }
    axiosInstance.defaults.decompress = true;
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (NeynarAPIClient.isApiErrorResponse(error)) {
          const apiErrors = error.response.data;
          this.logger.warn(`API errors: ${JSON.stringify(apiErrors)}`);
        }
        throw error;
      }
    );

    const v1Config: Configuration = new Configuration({
      basePath: BASE_PATH + "v1",
      apiKey: apiKey,
    });
    const v2Config: Configuration = new Configuration({
      basePath: BASE_PATH + "v2",
      apiKey: apiKey,
    });
    this.apis = {
      v1Cast: new CastApiV1(v1Config, undefined, axiosInstance),
      user: new UserApi(v1Config, undefined, axiosInstance),
      verification: new VerificationApi(v1Config, undefined, axiosInstance),
      notifications: new NotificationsApi(v1Config, undefined, axiosInstance),
      reactions: new ReactionsApi(v1Config, undefined, axiosInstance),
      v1Follows: new FollowsApiV1(v1Config, undefined, axiosInstance),
      v2Cast: new CastApiV2(v2Config, undefined, axiosInstance),
      signer: new SignerApi(v2Config, undefined, axiosInstance),
      reaction: new ReactionApi(v2Config, undefined, axiosInstance),
      v2Follow: new FollowApiV2(v2Config, undefined, axiosInstance),
    };
  }

  /**
   * Utility for parsing errors returned by the Neynar API servers. Returns true
   * if the given error is caused by an error response from the server, and
   * narrows the type of `error` accordingly.
   */
  public static isApiErrorResponse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
  ): error is WithRequired<AxiosError<ErrorRes>, "response"> {
    if (!(error instanceof AxiosError)) return false;
    return (
      error.response?.data !== undefined &&
      error.response?.status !== undefined &&
      error.response?.status >= 400
    );
  }

  /**
   * Creates a Signer. See [Neynar documentation](https://docs.neynar.com/reference/create-signer)
   * for more details.
   */
  public async createSigner(): Promise<Signer> {
    const response = await this.apis.signer.createSigner();
    return response.data;
  }

  /**
   * Fetches an existing Signer. See [Neynar documentation](https://docs.neynar.com/reference/get-signer)
   * for more details.
   *
   */
  public async fetchSigner(signerUuid: string): Promise<Signer | null> {
    try {
      const response = await this.apis.signer.signer(signerUuid);
      return response.data;
    } catch (error) {
      if (NeynarAPIClient.isApiErrorResponse(error)) {
        const status = error.response.status;
        if (status === 404) {
          return null;
        }
      }
      throw error;
    }
  }

  /**
   * Registers a Signer with an fid. See [Neynar documentation](https://docs.neynar.com/reference/register-app-fid)
   * for more details.
   */
  public async registerSigner(
    signerUuid: string,
    fid: number,
    deadline: number,
    signature: string
  ): Promise<Signer> {
    const body: RegisterSignerKeyReqBody = {
      signer_uuid: signerUuid,
      app_fid: fid,
      deadline,
      signature,
    };
    const response = await this.apis.signer.registerSignedKey(body);
    return response.data;
  }

  /**
   * Gets information about an individual cast using neynar v1 API. See [Neynar documentation](https://docs.neynar.com/reference/get-cast-information)
   */
  public async v1FetchCast(
    castOrCastHash: v1Cast | string
  ): Promise<v1Cast | null> {
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    const response = await this.apis.v1Cast.cast(castHash);
    return response.data.result.cast;
  }

  /**
   * Gets information about an individual cast. See [Neynar documentation](https://docs.neynar.com/reference/get-cast)
   */
  public async fetchCast(
    castOrCastHash: v2Cast | string
  ): Promise<v2Cast | null> {
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    try {
      const response = await this.apis.v2Cast.cast(
        CastParamType.Hash,
        castHash
      );
      return response.data.cast;
    } catch (error) {
      if (NeynarAPIClient.isApiErrorResponse(error)) {
        const status = error.response.status;
        if (status === 404) {
          return null;
        }
      }
      throw error;
    }
  }

  /**
   * Publishes a cast for the currently authenticated user. See [Neynar documentation](https://docs.neynar.com/reference/post-a-cast)
   */
  public async publishCast(
    signerUuid: string,
    text: string,
    options: { embeds?: CastEmbeds[]; replyTo?: string } = {}
  ): Promise<PostCastResponseCast> {
    const body: PostCastReqBody = {
      signer_uuid: signerUuid,
      text: text,
      embeds: options.embeds,
      parent: options.replyTo,
    };
    const response = await this.apis.v2Cast.postCast(body);
    return response.data.cast;
  }

  /**
   * Delete a cast. See [Neynar documentation](https://docs.neynar.com/reference/delete-a-cast)
   */
  public async deleteCast(
    signerUuid: string,
    castOrCastHash: v2Cast | string
  ): Promise<void> {
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    const body: DeleteCastReqBody = {
      signer_uuid: signerUuid,
      target_hash: castHash,
    };
    await this.apis.v2Cast.deleteCast(body);
  }

  /**
   * React to a cast. See [Neynar documentation](https://docs.neynar.com/reference/post-a-reaction)
   */
  public async reactToCast(
    signerUuid: string,
    reaction: ReactionType,
    castOrCastHash: v2Cast | string
  ): Promise<OperationResponse> {
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    const body: ReactionReqBody = {
      signer_uuid: signerUuid,
      reaction_type: reaction,
      target: castHash,
    };
    const response = await this.apis.reaction.postReaction(body);
    return response.data;
  }

  /**
   * Remove a reaction to a cast. See [Neynar documentation](https://docs.neynar.com/reference/delete-a-reaction)
   */
  public async removeReactionToCast(
    signerUuid: string,
    reaction: ReactionType,
    castOrCastHash: v2Cast | string
  ): Promise<OperationResponse> {
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    const body: ReactionReqBody = {
      signer_uuid: signerUuid,
      reaction_type: reaction,
      target: castHash,
    };
    const response = await this.apis.reaction.deleteReaction(body);
    return response.data;
  }

  /**
   * Fetches casts in a given thread. See [Neynar documentation](https://docs.neynar.com/reference/get-all-casts-in-thread)
   * Note that the parent provided by the caller is included in the response.
   */
  public async fetchCastsInThread(
    threadParent: v1Cast | { hash: string }
  ): Promise<v1Cast[] | null> {
    const response = await this.apis.v1Cast.allCastsInThread(threadParent.hash);
    return response.data.result.casts;
  }

  /**
   * Fetch the latest cast for the user, if there is one. See [Neynar documentation](https://docs.neynar.com/reference/get-all-casts-from-user)
   */
  public async fetchLatestCastForUser(fid: number): Promise<v1Cast | null> {
    // eslint-disable-next-line no-unreachable-loop
    for await (const cast of this.fetchCastsForUser(fid, {
      pageSize: 5,
    })) {
      return cast;
    }
    return null;
  }

  /**
   * Gets all casts (including replies and recasts) created by the specified user. See [Neynar documentation](https://docs.neynar.com/reference/get-all-casts-from-user)
   *
   */
  public async *fetchCastsForUser(
    fid: number,
    { pageSize = 100 } = {}
  ): AsyncGenerator<v1Cast, void, undefined> {
    let cursor: string | undefined;
    let viewer: number | undefined;

    while (true) {
      const response = await this.apis.v1Cast.casts(
        fid,
        viewer,
        cursor,
        pageSize
      );

      // yield current page of casts
      yield* response.data.result.casts;

      // prep for next page
      if (response.data.result.next?.cursor === null) {
        break;
      }
      cursor = response.data.result.next.cursor;
    }
  }

  /**
   * Gets recent casts created by the specified user. See [Neynar documentation](https://docs.neynar.com/reference/get-recent-casts-from-protocol)
   *
   */
  public async *fetchRecentCasts({ pageSize = 100 } = {}): AsyncGenerator<
    v1Cast,
    void,
    undefined
  > {
    let cursor: string | undefined;
    let viewer: number | undefined;

    while (true) {
      // fetch one page of casts (with refreshed auth if necessary)
      const response = await this.apis.v1Cast.recentCasts(
        viewer,
        cursor,
        pageSize
      );

      yield* response.data.result.casts;

      // prep for next page
      if (response.data.result.next?.cursor === null) {
        break;
      }
      cursor = response.data.result.next.cursor;
    }
  }

  /**
   * A list of users in reverse chronological order based on sign up. See [Neynar documentation](https://docs.neynar.com/reference/get-recent-users-from-protocol)
   */
  public async *fetchRecentUsers({ pageSize = 100 } = {}): AsyncGenerator<
    User,
    void,
    undefined
  > {
    let cursor: string | undefined;
    let viewer: number | undefined;

    while (true) {
      // fetch one page of casts (with refreshed auth if necessary)
      const response = await this.apis.user.recentUsers(
        viewer,
        cursor,
        pageSize
      );

      yield* response.data.result.users;
      // prep for next page
      if (response.data.result.next?.cursor === null) {
        break;
      }
      cursor = response.data.result.next.cursor;
    }
  }

  /**
   * Fetch all likes by a given user. See [Neynar documentation](https://docs.neynar.com/reference/get-user-cast-likes)
   */
  public async *fetchUserCastLikes(
    fid: number,
    { pageSize = 100 } = {}
  ): AsyncGenerator<ReactionWithCastMeta[], void, undefined> {
    let cursor: string | undefined;
    let viewer: number | undefined;

    while (true) {
      // fetch one page of likes
      const response = await this.apis.user.userCastLikes(
        fid,
        viewer,
        pageSize,
        cursor
      );

      yield response.data.result.likes;

      // prep for next page
      if (response.data.result.next?.cursor === null) {
        break;
      }
      cursor = response.data.result.next.cursor;
    }
  }

  /**
   * Gets the specified user via their FID (if found). See [Neynar documentation](https://docs.neynar.com/reference/get-user-information-by-fid)
   */
  public async lookupUserByFid(fid: number): Promise<User | null> {
    try {
      const response = await this.apis.user.user(fid);
      return response.data.result?.user;
    } catch (error) {
      if (NeynarAPIClient.isApiErrorResponse(error)) {
        if (error.response.status === 404) return null;
      }
      throw error;
    }
  }

  /**
   * Gets the specified user via their username (if found). See [Neynar documentation](https://docs.neynar.com/reference/get-user-information-by-username)
   */
  public async lookupUserByUsername(username: string): Promise<User | null> {
    let viewer: number | undefined;
    const response = await this.apis.user.userByUsername(username, viewer);
    return response.data.result.user ?? null;
  }

  /**
   * Gets the custody address for the specified user via their username (if found). See [Neynar documentation](https://docs.neynar.com/reference/get-custody-address)
   */
  public async fetchCustodyAddressForUser(fid: number): Promise<string | null> {
    const response = await this.apis.user.custodyAddress(fid);
    return response.data.result.custodyAddress ?? null;
  }

  /**
   * Gets all known verifications of a user. See [Neynar documentation](https://docs.neynar.com/reference/get-user-verifications)
   */
  public async fetchUserVerifications(
    fid: number
  ): Promise<VerificationResponseResult | null> {
    const response = await this.apis.verification.verifications(fid);
    return response.data.result;
  }

  /**
   * Checks if a given Ethereum address has a Farcaster user associated with it.
   * TODO: Confirm the statement below is true
   * Note: if an address is associated with multiple users, the API will return
   * the user who most recently published a verification with the address
   * (based on when Neynar received the proof, not a self-reported timestamp).
   * See [Neynar documentation](https://docs.neynar.com/reference/get-user-by-verification)
   */
  public async lookupUserByVerification(address: string): Promise<User | null> {
    try {
      const response = await this.apis.verification.userByVerification(address);
      return response.data.result.user;
    } catch (error) {
      if (NeynarAPIClient.isApiErrorResponse(error)) {
        const status = error.response.status;
        if (status === 404) {
          return null;
        }
      }
      throw error;
    }
  }

  /**
   * Gets a list of mentions and replies to the user’s casts in reverse chronological order. See [Neynar documentation](https://docs.neynar.com/reference/get-user-mentions-and-replies)
   */
  public async *fetchMentionAndReplyNotifications(
    fid: number,
    { pageSize = 100 } = {}
  ): AsyncGenerator<v1Cast, void, undefined> {
    let cursor: string | undefined;
    let viewer: number | undefined;

    while (true) {
      // fetch one page of notifications
      const response = await this.apis.notifications.mentionsAndReplies(
        fid,
        viewer,
        cursor,
        pageSize
      );

      // yield current page
      yield* response.data.result.notifications;

      // prep for next page
      if (response.data.result.next?.cursor === null) {
        break;
      }
      cursor = response.data.result.next.cursor;
    }
  }

  /**
   * Lists a given cast's likes. See [Neynar documentation](https://docs.neynar.com/reference/get-all-like-reactions-for-a-cast)
   */
  public async *fetchCastLikes(
    castOrCastHash: v1Cast | string,
    { pageSize = 100 } = {}
  ): AsyncGenerator<Reaction, void, undefined> {
    let cursor: string | undefined;
    let viewer: number | undefined;
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }

    while (true) {
      const response = await this.apis.reactions.castLikes(
        castHash,
        viewer,
        cursor,
        pageSize
      );

      yield* response.data.result.likes;

      // prep for next page
      if (response.data.result.next?.cursor === null) {
        break;
      }
      cursor = response.data.result.next.cursor;
    }
  }

  /**
   * Get all users that follow the specified user. See [Neynar documentation](https://docs.neynar.com/reference/get-list-of-followers)
   */
  public async fetchUserFollowers(fid: number): Promise<User[]> {
    const response = await this.apis.v1Follows.followers(fid);

    return response.data.result.users;
  }

  /**
   * Get all users the specified user is following. See [Neynar documentation](https://docs.neynar.com/reference/get-list-of-following)
   */
  public async fetchUserFollowing(fid: number): Promise<User[]> {
    const response = await this.apis.v1Follows.following(fid);

    return response.data.result.users;
  }

  /**
   * Follow a user. See [Neynar documentation](https://docs.neynar.com/reference/follow-a-user)
   */
  public async followUser(
    signerUuid: string,
    fid: number
  ): Promise<BulkFollowResponse> {
    const body: FollowReqBody = {
      signer_uuid: signerUuid,
      target_fids: [fid],
    };
    const response = await this.apis.v2Follow.followUser(body);
    return response.data;
  }

  /**
   * Follow multiple users. See [Neynar documentation](https://docs.neynar.com/reference/follow-a-user)
   */
  public async followUsers(
    signerUuid: string,
    fids: number[]
  ): Promise<BulkFollowResponse> {
    const body: FollowReqBody = {
      signer_uuid: signerUuid,
      target_fids: fids,
    };
    const response = await this.apis.v2Follow.followUser(body);
    return response.data;
  }

  /**
   * Unfollow a user. See [Neynar documentation](https://docs.neynar.com/reference/unfollow-a-user)
   */
  public async unfollowUser(
    signerUuid: string,
    fid: number
  ): Promise<BulkFollowResponse> {
    const body: FollowReqBody = {
      signer_uuid: signerUuid,
      target_fids: [fid],
    };
    const response = await this.apis.v2Follow.unfollowUser(body);
    return response.data;
  }

  /**
   * Unfollow multiple users. See [Neynar documentation](https://docs.neynar.com/reference/unfollow-a-user)
   */
  public async unfollowUsers(
    signerUuid: string,
    fids: number[]
  ): Promise<BulkFollowResponse> {
    const body: FollowReqBody = {
      signer_uuid: signerUuid,
      target_fids: fids,
    };
    const response = await this.apis.v2Follow.unfollowUser(body);
    return response.data;
  }
}
