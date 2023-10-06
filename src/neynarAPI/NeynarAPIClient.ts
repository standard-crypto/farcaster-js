import {
  Cast,
  User,
  CastApi,
  UserApi,
  VerificationApi,
  NotificationsApi,
  ReactionsApi,
  FollowsApi,
  Configuration,
  ErrorRes,
  Reaction,
  ReactionWithCastMeta,
  VerificationResponseResult,
} from "./swagger";
import axios, { AxiosError, AxiosInstance } from "axios";
import { silentLogger, Logger } from "./logger";
import type { WithRequired } from "../utils";

const BASE_PATH = "https://api.neynar.com/v1";

export class NeynarAPIClient {
  private readonly logger: Logger;

  public readonly apis: {
    user: UserApi;
    cast: CastApi;
    verification: VerificationApi;
    notifications: NotificationsApi;
    reactions: ReactionsApi;
    follows: FollowsApi;
  };

  /**
   * Instantiates a MerkleAPIClient
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

    const config: Configuration = new Configuration({
      basePath: BASE_PATH,
      apiKey: apiKey,
    });
    this.apis = {
      cast: new CastApi(config, undefined, axiosInstance),
      user: new UserApi(config, undefined, axiosInstance),
      verification: new VerificationApi(config, undefined, axiosInstance),
      notifications: new NotificationsApi(config, undefined, axiosInstance),
      reactions: new ReactionsApi(config, undefined, axiosInstance),
      follows: new FollowsApi(config, undefined, axiosInstance),
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
   * Gets information about an individual cast
   */
  public async fetchCast(
    castOrCastHash: Cast | string
  ): Promise<Cast | undefined> {
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    const response = await this.apis.cast.cast(castHash);
    if (response.status === 404) return undefined;
    return response.data.result.cast ?? undefined;
  }

  /**
   * Fetches casts in a given thread.
   * Note that the parent provided by the caller is included in the response.
   */
  public async fetchCastsInThread(
    threadParent: Cast | { hash: string }
  ): Promise<Cast[] | undefined> {
    const response = await this.apis.cast.allCastsInThread(threadParent.hash);
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
  ): AsyncGenerator<Cast, void, undefined> {
    let cursor: string | undefined;
    let viewer: number | undefined;

    while (true) {
      // fetch one page of casts (with refreshed auth if necessary)
      const response = await this.apis.cast.casts(
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
    Cast,
    void,
    undefined
  > {
    let cursor: string | undefined;
    let viewer: number | undefined;

    while (true) {
      // fetch one page of casts (with refreshed auth if necessary)
      const response = await this.apis.cast.recentCasts(
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
  ): AsyncGenerator<Cast, void, undefined> {
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
    castOrCastHash: Cast | string,
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
    const response = await this.apis.follows.followers(user.fid);

    return response.data.result.users ?? undefined;
  }

  /**
   * Get all users the specified user is following.
   */
  public async fetchUserFollowing(user: {
    fid: number;
  }): Promise<User[] | undefined> {
    const response = await this.apis.follows.following(user.fid);

    return response.data.result.users ?? undefined;
  }
}
