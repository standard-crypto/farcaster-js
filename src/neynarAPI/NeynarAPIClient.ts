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
} from "./neynarV1API/swagger";
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
} from "./neynarV2API/swagger";
import axios, { AxiosError, AxiosInstance } from "axios";
import { silentLogger, Logger } from "./logger";
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
   * Utility for parsing errors returned by the Merkle API server. Returns true
   * if the given error is caused by an error response from the server, and
   * narrows the type of `error` accordingly.
   */
  public static isApiErrorResponse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
  ): error is WithRequired<AxiosError<ErrorRes>, "response"> {
    if (!(error instanceof AxiosError)) return false;
    return error.response?.data !== undefined;
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
  public async fetchSigner(signerUuid: string): Promise<Signer | undefined> {
    try {
      const response = await this.apis.signer.signer(signerUuid);
      return response.data;
    } catch (error) {
      if (NeynarAPIClient.isApiErrorResponse(error)) {
        const status = error.response.status;
        if (status === 404) {
          return undefined;
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
   * Gets information about an individual cast using neynar v1 API
   */
  public async v1FetchCast(
    castOrCastHash: v1Cast | string
  ): Promise<v1Cast | undefined> {
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    const response = await this.apis.v1Cast.cast(castHash);
    if (response.status === 404) return undefined;
    return response.data.result.cast ?? undefined;
  }

  /**
   * Gets information about an individual cast
   */
  public async fetchCast(
    castOrCastHash: v2Cast | string
  ): Promise<v2Cast | undefined> {
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
      return response.data.cast ?? undefined;
    } catch (error) {
      if (NeynarAPIClient.isApiErrorResponse(error)) {
        const status = error.response.status;
        if (status === 404) {
          return undefined;
        }
      }
      throw error;
    }
  }

  /**
   * Publishes a cast for the currently authenticated user
   */
  public async publishCast(
    signerUuid: string,
    text: string,
    replyTo?: v2Cast | { fid?: number; hash: string },
    embeds?: string[]
  ): Promise<PostCastResponseCast> {
    const body: PostCastReqBody = {
      signer_uuid: signerUuid,
      text: text,
      embeds: embeds !== undefined ? [{ url: embeds[0] }] : undefined,
      parent: replyTo !== undefined ? replyTo.hash : undefined,
    };
    const response = await this.apis.v2Cast.postCast(body);
    return response.data.cast;
  }

  /**
   * Delete a cast
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
   * React to a cast
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
   * Remove a reaction to a cast
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
   * Fetches casts in a given thread.
   * Note that the parent provided by the caller is included in the response.
   */
  public async fetchCastsInThread(
    threadParent: v1Cast | { hash: string }
  ): Promise<v1Cast[] | undefined> {
    const response = await this.apis.v1Cast.allCastsInThread(threadParent.hash);
    return response.data.result.casts;
  }

  /**
   * Gets all casts (including replies and recasts) created by the specified user.
   *
   * @Note: Deleted cast filtering is applied server-side while recast filtering is applied
   * client-side.
   */
  public async *fetchCastsForUser(
    user: { fid: number },
    { pageSize = 100 } = {}
  ): AsyncGenerator<v1Cast, void, undefined> {
    let cursor: string | undefined;
    let viewer: number | undefined;

    while (true) {
      // fetch one page of casts (with refreshed auth if necessary)
      const response = await this.apis.v1Cast.casts(
        user.fid,
        viewer,
        cursor,
        pageSize
      );

      // yield current page of casts
      for (const cast of response.data.result.casts) {
        yield cast;
      }

      // prep for next page
      if (response.data.result?.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.result.next.cursor ?? undefined;
    }
  }

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

      // yield current page of casts
      yield* response.data.result.casts;

      // prep for next page
      if (response.data.result?.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.result.next.cursor ?? undefined;
    }
  }

  /**
   * A list of users in reverse chronological order based on sign up.
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

      // Extract the users array from the response (or provide an empty array as a default)
      const users =
        response.data.result?.users != null ? response.data.result.users : [];

      // Create an async iterable for the users
      for (const user of users) {
        yield user;
      }

      // prep for next page
      if (response.data.result?.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.result.next.cursor ?? undefined;
    }
  }

  /**
   * Fetch all likes by a given user.
   */
  public async *fetchUserCastLikes(
    user: { fid: number },
    { pageSize = 100 } = {}
  ): AsyncGenerator<ReactionWithCastMeta, void, undefined> {
    let cursor: string | undefined;
    let viewer: number | undefined;

    while (true) {
      // fetch one page of likes
      const response = await this.apis.user.userCastLikes(
        user.fid,
        viewer,
        pageSize,
        cursor
      );

      // Extract the likes array from the response (or provide an empty array as a default)
      const likes =
        response.data.result?.likes != null ? response.data.result.likes : [];

      // Create an async iterable for the likes
      for (const like of likes) {
        yield like;
      }

      // prep for next page
      if (response.data.result?.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.result.next.cursor ?? undefined;
    }
  }

  /**
   * Gets the specified user via their FID (if found)
   */
  public async lookupUserByFid(fid: number): Promise<User | undefined> {
    try {
      const response = await this.apis.user.user(fid);
      return response.data.result?.user;
    } catch (error) {
      if (NeynarAPIClient.isApiErrorResponse(error)) {
        if (error.response.status === 404) return undefined;
      }
      throw error;
    }
  }

  /**
   * Gets the specified user via their username (if found)
   */
  public async lookupUserByUsername(
    username: string
  ): Promise<User | undefined> {
    let viewer: number | undefined;
    const response = await this.apis.user.userByUsername(username, viewer, {
      validateStatus: (status: number) => {
        return status === 200 || status === 404;
      },
    });
    if (response.status === 404) return undefined;
    return response.data.result?.user;
  }

  /**
   * Gets the custody address for the specified user via their username (if found)
   */
  public async fetchCustodyAddressForUser(
    fid: number
  ): Promise<string | undefined> {
    const response = await this.apis.user.custodyAddress(fid);
    return response.data.result.custodyAddress ?? undefined;
  }

  public async fetchUserVerifications(user: {
    fid: number;
  }): Promise<VerificationResponseResult | undefined> {
    const response = await this.apis.verification.verifications(user.fid);
    return response.data.result;
  }

  /**
   * Checks if a given Ethereum address has a Farcaster user associated with it.
   * Note: if an address is associated with multiple users, the API will return
   * the user who most recently published a verification with the address
   * (based on when Merkle received the proof, not a self-reported timestamp).
   */
  public async lookupUserByVerification(
    address: string
  ): Promise<User | undefined> {
    try {
      const response = await this.apis.verification.userByVerification(address);
      return response.data.result?.user?.fid != null
        ? response.data.result.user
        : undefined;
    } catch (error) {
      if (NeynarAPIClient.isApiErrorResponse(error)) {
        if (error.response.status === 404) return undefined;
      }
      throw error;
    }
  }

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
      if (response.data.result.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.result.next.cursor ?? undefined;
    }
  }

  /**
   * Lists a given cast's likes
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
      if (response.data.result.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.result.next.cursor ?? undefined;
    }
  }

  /**
   * Get all users that follow the specified user
   */
  public async fetchUserFollowers(user: {
    fid: number;
  }): Promise<User[] | undefined> {
    const response = await this.apis.v1Follows.followers(user.fid);

    return response.data.result.users ?? undefined;
  }

  /**
   * Get all users the specified user is following.
   */
  public async fetchUserFollowing(user: {
    fid: number;
  }): Promise<User[] | undefined> {
    const response = await this.apis.v1Follows.following(user.fid);

    return response.data.result.users ?? undefined;
  }

  /**
   * Follow a user
   */
  public async followUser(
    signerUuid: string,
    user: { fid: number }
  ): Promise<BulkFollowResponse> {
    const body: FollowReqBody = {
      signer_uuid: signerUuid,
      target_fids: [user.fid],
    };
    const response = await this.apis.v2Follow.followUser(body);
    return response.data;
  }

  /**
   * Follow multiple users
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
   * Unfollow a user
   */
  public async unfollowUser(
    signerUuid: string,
    user: { fid: number }
  ): Promise<BulkFollowResponse> {
    const body: FollowReqBody = {
      signer_uuid: signerUuid,
      target_fids: [user.fid],
    };
    const response = await this.apis.v2Follow.unfollowUser(body);
    return response.data;
  }

  /**
   * Unfollow multiple users
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
