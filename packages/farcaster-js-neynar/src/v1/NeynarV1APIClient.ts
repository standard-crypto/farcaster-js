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
  ReactionsAndRecastsNotification,
  Recaster,
} from './openapi';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { silentLogger, Logger } from '../logger';
import type { SetRequired } from 'type-fest';

const BASE_PATH = 'https://api.neynar.com/v1';

export class NeynarV1APIClient {
  private readonly logger: Logger;

  public readonly apis: {
    user: UserApi
    cast: CastApi
    verification: VerificationApi
    notifications: NotificationsApi
    reactions: ReactionsApi
    follows: FollowsApi
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
    }: { logger?: Logger, axiosInstance?: AxiosInstance } = {},
  ) {
    this.logger = logger;

    if (apiKey === '') {
      throw new Error(
        'Attempt to use an authenticated API method without first providing an api key',
      );
    }

    if (axiosInstance === undefined) {
      axiosInstance = axios.create();
    }
    axiosInstance.defaults.decompress = true;
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (NeynarV1APIClient.isApiErrorResponse(error)) {
          const apiErrors = error.response.data;
          this.logger.warn(`API errors: ${JSON.stringify(apiErrors)}`);
        }
        throw error;
      },
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
   * Utility for parsing errors returned by the Neynar API servers. Returns true
   * if the given error is caused by an error response from the server, and
   * narrows the type of `error` accordingly.
   */
  public static isApiErrorResponse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any,
  ): error is SetRequired<AxiosError<ErrorRes>, 'response'> {
    if (!(error instanceof AxiosError)) return false;
    return (
      error.response?.data !== undefined && 'message' in error.response.data
    );
  }

  /**
   * Fetches casts in a given thread. See [Neynar documentation](https://docs.neynar.com/reference/get-all-casts-in-thread)
   * Note that the parent provided by the caller is included in the response.
   */
  public async fetchCastsInThread(
    threadParent: Cast | { hash: string },
    viewerFid?: number,
  ): Promise<Cast[] | null> {
    const response = await this.apis.cast.allCastsInThread({
      threadHash: threadParent.hash,
      viewerFid: viewerFid,
    });
    return response.data.result.casts;
  }

  /**
   * Gets all casts (including replies and recasts) created by the specified user. See [Neynar documentation](https://docs.neynar.com/reference/get-all-casts-from-user)
   *
   */
  public async * fetchCastsForUser(
    fid: number,
    options?: { parentUrl?: string, viewerFid?: number, pageSize?: number },
  ): AsyncGenerator<Cast, void, undefined> {
    let cursor: string | undefined;

    while (true) {
      const response = await this.apis.cast.casts({
        fid: fid,
        viewerFid: options?.viewerFid,
        parentUrl: options?.parentUrl,
        cursor: cursor,
        limit: options?.pageSize,
      });

      // yield current page of casts
      yield * response.data.result.casts;

      // prep for next page
      if (response.data.result.next.cursor === null) {
        break;
      }
      cursor = response.data.result.next.cursor;
    }
  }

  /**
   * Gets recent casts created by the specified user. See [Neynar documentation](https://docs.neynar.com/reference/get-recent-casts-from-protocol)
   *
   */
  public async * fetchRecentCasts(options?: {
    viewerFid?: number
    pageSize?: number
  }): AsyncGenerator<Cast, void, undefined> {
    let cursor: string | undefined;

    while (true) {
      // fetch one page of casts (with refreshed auth if necessary)
      const response = await this.apis.cast.recentCasts({
        viewerFid: options?.viewerFid,
        cursor: cursor,
        limit: options?.pageSize,
      });

      yield * response.data.result.casts;

      // prep for next page
      if (response.data.result.next.cursor === null) {
        break;
      }
      cursor = response.data.result.next.cursor;
    }
  }

  /**
   * A list of users in reverse chronological order based on sign up. See [Neynar documentation](https://docs.neynar.com/reference/get-recent-users-from-protocol)
   */
  public async * fetchRecentUsers(options?: {
    viewerFid?: number
    pageSize?: number
  }): AsyncGenerator<User, void, undefined> {
    let cursor: string | undefined;

    while (true) {
      // fetch one page of casts (with refreshed auth if necessary)
      const response = await this.apis.user.recentUsers({
        viewerFid: options?.viewerFid,
        cursor: cursor,
        limit: options?.pageSize,
      });

      yield * response.data.result.users;
      // prep for next page
      if (response.data.result.next.cursor === null) {
        break;
      }
      cursor = response.data.result.next.cursor;
    }
  }

  /**
   * Fetch all likes by a given user. See [Neynar documentation](https://docs.neynar.com/reference/get-user-cast-likes)
   */
  public async * fetchUserCastLikes(
    fid: number,
    options?: { viewerFid?: number, pageSize?: number },
  ): AsyncGenerator<ReactionWithCastMeta, void, undefined> {
    let cursor: string | undefined;

    while (true) {
      // fetch one page of likes
      const response = await this.apis.user.userCastLikes({
        fid: fid,
        viewerFid: options?.viewerFid,
        limit: options?.pageSize,
        cursor: cursor,
      });

      yield * response.data.result.likes;

      // prep for next page
      if (response.data.result.next.cursor === null) {
        break;
      }
      cursor = response.data.result.next.cursor;
    }
  }

  /**
   * Gets the specified user via their FID (if found). See [Neynar documentation](https://docs.neynar.com/reference/get-user-information-by-fid)
   */
  public async lookupUserByFid(
    fid: number,
    viewerFid?: number,
  ): Promise<User | null> {
    try {
      const response = await this.apis.user.user({ fid, viewerFid });
      return response.data.result.user;
    } catch (error) {
      if (NeynarV1APIClient.isApiErrorResponse(error)) {
        if (error.response.status === 404) return null;
      }
      throw error;
    }
  }

  /**
   * Gets the specified user via their username (if found). See [Neynar documentation](https://docs.neynar.com/reference/get-user-information-by-username)
   */
  public async lookupUserByUsername(
    username: string,
    viewerFid?: number,
  ): Promise<User | null> {
    try {
      const response = await this.apis.user.userByUsername({
        username,
        viewerFid,
      });
      return response.data.result.user;
    } catch (error) {
      if (NeynarV1APIClient.isApiErrorResponse(error)) {
        const status = error.response.status;
        if (status === 404) {
          return null;
        }
      }
      throw error;
    }
  }

  /**
   * Gets the custody address for the specified user via their username (if found). See [Neynar documentation](https://docs.neynar.com/reference/get-custody-address)
   */
  public async fetchCustodyAddressForUser(fid: number): Promise<string | null> {
    const response = await this.apis.user.custodyAddress({ fid });
    return response.data.result.custodyAddress;
  }

  /**
   * Gets all known verifications of a user. See [Neynar documentation](https://docs.neynar.com/reference/get-user-verifications)
   */
  public async fetchUserVerifications(
    fid: number,
  ): Promise<VerificationResponseResult | null> {
    const response = await this.apis.verification.verifications({ fid });
    return response.data.result;
  }

  /**
   * Checks if a given Ethereum address has a Farcaster user associated with it.
   * Note: if an address is associated with multiple users, the API will return
   * the user who most recently published a verification with the address
   * (based on when Warpcast received the proof, not a self-reported timestamp).
   * See [Neynar documentation](https://docs.neynar.com/reference/get-user-by-verification)
   */
  public async lookupUserByVerification(address: string): Promise<User | null> {
    try {
      const response = await this.apis.verification.userByVerification({
        address,
      });
      return response.data.result.user;
    } catch (error) {
      if (NeynarV1APIClient.isApiErrorResponse(error)) {
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
  public async * fetchMentionAndReplyNotifications(
    fid: number,
    options?: { viewerFid?: number, pageSize?: number },
  ): AsyncGenerator<Cast, void, undefined> {
    let cursor: string | undefined;

    while (true) {
      // fetch one page of notifications
      const response = await this.apis.notifications.mentionsAndReplies({
        fid: fid,
        viewerFid: options?.viewerFid,
        cursor: cursor,
        limit: options?.pageSize,
      });

      // yield current page
      yield * response.data.result.notifications;

      // prep for next page
      if (response.data.result.next.cursor === null) {
        break;
      }
      cursor = response.data.result.next.cursor;
    }
  }

  /**
   *Get a list of likes and recasts to the users’s casts in reverse chronological order. See [Neynar documentation](https://docs.neynar.com/reference/get-user-likes-and-recasts)
   */
  public async * fetchUserLikesAndRecasts(
    fid: number,
    options?: { viewerFid?: number, pageSize?: number },
  ): AsyncGenerator<ReactionsAndRecastsNotification, void, undefined> {
    let cursor: string | undefined;

    while (true) {
      // fetch one page of notifications
      const response = await this.apis.notifications.reactionsAndRecasts({
        fid: fid,
        viewerFid: options?.viewerFid,
        cursor: cursor,
        limit: options?.pageSize,
      });

      // yield current page
      yield * response.data.result.notifications;

      // prep for next page
      if (response.data.result.next.cursor === null) {
        break;
      }
      cursor = response.data.result.next.cursor;
    }
  }

  /**
   * Lists a given cast's likes. See [Neynar documentation](https://docs.neynar.com/reference/get-all-like-reactions-for-a-cast)
   */
  public async * fetchCastLikes(
    castOrCastHash: Cast | string,
    options?: { viewerFid?: number, pageSize?: number },
  ): AsyncGenerator<Reaction, void, undefined> {
    let cursor: string | undefined;
    let castHash: string;
    if (typeof castOrCastHash === 'string') {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }

    while (true) {
      const response = await this.apis.reactions.castLikes({
        castHash: castHash,
        viewerFid: options?.viewerFid,
        cursor: cursor,
        limit: options?.pageSize,
      });

      yield * response.data.result.likes;

      // prep for next page
      if (response.data.result.next.cursor === null) {
        break;
      }
      cursor = response.data.result.next.cursor;
    }
  }

  /**
   * Get All Reactions For a Cast. See [Neynar documentation](https://docs.neynar.com/reference/get-cast-reactions)
   */
  public async * fetchCastReactions(
    castOrCastHash: Cast | string,
    options?: { viewerFid?: number, pageSize?: number },
  ): AsyncGenerator<Reaction, void, undefined> {
    let cursor: string | undefined;
    let castHash: string;
    if (typeof castOrCastHash === 'string') {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }

    while (true) {
      const response = await this.apis.reactions.castReactions({
        castHash: castHash,
        viewerFid: options?.viewerFid,
        cursor: cursor,
        limit: options?.pageSize,
      });

      yield * response.data.result.casts;

      // prep for next page
      if (response.data.result.next.cursor === null) {
        break;
      }
      cursor = response.data.result.next.cursor;
    }
  }

  /**
   * Get the list of users who have recasted a specific cast. See [Neynar documentation](https://docs.neynar.com/reference/get-list-of-recasters)
   */
  public async * fetchRecasters(
    castOrCastHash: Cast | string,
    options?: { viewerFid?: number, pageSize?: number },
  ): AsyncGenerator<Recaster, void, undefined> {
    let cursor: string | undefined;
    let castHash: string;
    if (typeof castOrCastHash === 'string') {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }

    while (true) {
      const response = await this.apis.reactions.castRecasters({
        castHash: castHash,
        viewerFid: options?.viewerFid,
        cursor: cursor,
        limit: options?.pageSize,
      });

      yield * response.data.result.users;

      // prep for next page
      if (response.data.result.next.cursor === null) {
        break;
      }
      cursor = response.data.result.next.cursor;
    }
  }

  /**
   * Get all users that follow the specified user. See [Neynar documentation](https://docs.neynar.com/reference/get-list-of-followers)
   */
  public async fetchUserFollowers(
    fid: number,
    viewerFid?: number,
  ): Promise<User[]> {
    const response = await this.apis.follows.followers({ fid, viewerFid });

    return response.data.result.users;
  }

  /**
   * Get all users the specified user is following. See [Neynar documentation](https://docs.neynar.com/reference/get-list-of-following)
   */
  public async fetchUserFollowing(
    fid: number,
    viewerFid?: number,
  ): Promise<User[]> {
    const response = await this.apis.follows.following({ fid, viewerFid });

    return response.data.result.users;
  }
}
