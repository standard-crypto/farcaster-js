import { utils, Wallet } from "ethers";
import {
  AuthApi,
  CastsApi,
  AuthToken,
  User,
  Cast,
  InlineResponse2006,
  UserApi,
  V2AuthBody,
  V2AuthBodyMethodEnum,
  ApiErrorResponse,
  UsersApi,
  V2CastsBody,
  V2CastReactionsBody,
  CastReaction,
  CastReactionType,
  FollowsApi,
  InlineResponse2009,
  WatchesApi,
  V2WatchedCastsBody,
  AssetsApi,
  InlineResponse20011,
  AssetCollection,
  Asset,
  InlineResponse2005,
  V2AuthBody1MethodEnum,
  V2AuthBody1,
  NotificationsApi,
  VerificationsApi,
  Verification,
} from "./swagger";
import canonicalize from "canonicalize";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { silentLogger, Logger } from "./logger";
import { Notification } from "./swagger/models/Notification";

const THIRTY_SECONDS_IN_MILLIS = 30000;
const TEN_MINUTES_IN_MILLIS = 600000;

const BASE_PATH = "https://api.farcaster.xyz";

export class MerkleAPIClient {
  private authToken?: Promise<AuthToken>;
  private readonly logger: Logger;

  public readonly apis: {
    assets: AssetsApi;
    auth: AuthApi;
    casts: CastsApi;
    follows: FollowsApi;
    notifications: NotificationsApi;
    user: UserApi;
    users: UsersApi;
    verifications: VerificationsApi;
    watches: WatchesApi;
  };

  constructor(
    private readonly wallet: Wallet,
    {
      logger = silentLogger,
      axiosInstance,
    }: { logger?: Logger; axiosInstance?: AxiosInstance } = {}
  ) {
    this.logger = logger;
    if (axiosInstance === undefined) {
      axiosInstance = axios.create();
    }
    axiosInstance.defaults.decompress = true;
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if ("response" in error) {
          const errorResponse = error.response.data as ApiErrorResponse;
          this.logger.warn(`API errors: ${JSON.stringify(errorResponse)}`);
        }
        throw error;
      }
    );
    const config = { basePath: BASE_PATH };
    this.apis = {
      assets: new AssetsApi(config, undefined, axiosInstance),
      auth: new AuthApi(config, undefined, axiosInstance),
      casts: new CastsApi(config, undefined, axiosInstance),
      follows: new FollowsApi(config, undefined, axiosInstance),
      notifications: new NotificationsApi(config, undefined, axiosInstance),
      user: new UserApi(config, undefined, axiosInstance),
      users: new UsersApi(config, undefined, axiosInstance),
      verifications: new VerificationsApi(config, undefined, axiosInstance),
      watches: new WatchesApi(config, undefined, axiosInstance),
    };
  }

  /**
   * Creates a new auth token from the signing key of the Wallet
   * configured with this API client.
   */
  public async createAuthToken(
    expiryDurationMillis = TEN_MINUTES_IN_MILLIS
  ): Promise<AuthToken> {
    this.logger.debug("fetching new authToken...");
    const now = Date.now();
    const params: V2AuthBody = {
      method: V2AuthBodyMethodEnum.GenerateToken,
      params: {
        timestamp: now,
        expiresAt: now + expiryDurationMillis,
      },
    };
    const authHeader = await this._authHeader(params);
    const response = await this.apis.auth.v2AuthPut(params, {
      headers: { Authorization: authHeader },
    });
    return response.data.result.token;
  }

  /**
   * Returns an existing valid auth token if one exists, otherwise provisions
   * a new one from the signing key of the given Wallet.
   *
   * Note that provisioning a new auth token requires an API round trip.
   */
  public async getOrCreateValidAuthToken(): Promise<AuthToken> {
    if (
      this.authToken !== undefined &&
      !_isAuthTokenExpired(await this.authToken)
    ) {
      // existing auth token is still valid
      return await this.authToken;
    }

    // queue up a request for a new auth token
    this.authToken = this.createAuthToken();

    return await this.authToken;
  }

  /**
   * Delete a cast
   */
  public async deleteCast(castOrCastHash: Cast | string): Promise<void> {
    const authToken = await this.getOrCreateValidAuthToken();
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    await this.apis.casts.v2CastsDelete(authToken.secret, { castHash });
  }

  /**
   * Delete a recast
   */
  public async deleteRecast(castOrCastHash: Cast | string): Promise<void> {
    const authToken = await this.getOrCreateValidAuthToken();
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    await this.apis.casts.v2RecastsDelete(authToken.secret, { castHash });
  }

  /**
   * Gets information about an individual cast
   */
  public async fetchCast(
    castOrCastHash: Cast | string
  ): Promise<Cast | undefined> {
    const authToken = await this.getOrCreateValidAuthToken();
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    const response = await this.apis.casts.v2CastGet(
      castHash,
      authToken.secret,
      {
        validateStatus: (status) => {
          return status === 200 || status === 404;
        },
      }
    );
    if (response.status === 404) return undefined;
    return response.data.result.cast;
  }

  /**
   * Gets all casts (including replies and recasts) created by the specified user.
   *
   * @Note: Deleted cast filtering is applied server-side while recast filtering is applied
   * client-side.
   */
  public async *fetchCastsForUser(
    user: { fid: number },
    { includeDeletedCasts = false, includeRecasts = false, pageSize = 100 } = {}
  ): AsyncGenerator<Cast, void, undefined> {
    let cursor: string | undefined;
    let response: AxiosResponse<InlineResponse2006>;

    while (true) {
      // fetch one page of casts (with refreshed auth if necessary)
      const authToken = await this.getOrCreateValidAuthToken();
      response = await this.apis.casts.v2CastsGet(
        user.fid,
        includeDeletedCasts,
        pageSize,
        authToken.secret,
        cursor
      );

      // yield current page of casts
      for (const cast of response.data.result.casts) {
        if (includeRecasts || cast.recast === undefined || !cast.recast) {
          yield cast;
        }
      }

      // prep for next page
      if (response.data.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.next.cursor;
    }
  }

  /**
   * Gets the currently authenticated user
   */
  public async fetchCurrentUser(): Promise<User> {
    const authToken = await this.getOrCreateValidAuthToken();
    const response = await this.apis.user.v2MeGet(authToken.secret);
    return response.data.result.user;
  }

  public async fetchCustodyAddressForUser(
    userOrUsername: User | string
  ): Promise<string> {
    let username: string;
    if (typeof userOrUsername === "string") {
      username = userOrUsername;
    } else {
      if (userOrUsername.username === undefined) {
        throw new Error(`User ${userOrUsername.fid} has no username`);
      }
      username = userOrUsername.username;
    }
    const response = await this.apis.users.v2FnameGet(username);
    return response.data.result.custodyAddress;
  }

  /**
   * Fetch the latest cast for the user, if there is one
   */
  public async fetchLatestCastForUser(
    user: { fid: number },
    includeRecasts = false
  ): Promise<Cast | undefined> {
    // eslint-disable-next-line no-unreachable-loop
    for await (const cast of this.fetchCastsForUser(user, {
      pageSize: 5,
      includeRecasts,
    })) {
      return cast;
    }
    return undefined;
  }

  public async *fetchMentionAndReplyNotifications({
    pageSize = 100,
  } = {}): AsyncGenerator<Notification, void, undefined> {
    let cursor: string | undefined;

    while (true) {
      // fetch one page of notifications
      const authToken = await this.getOrCreateValidAuthToken();
      const response =
        await this.apis.notifications.v2MentionAndReplyNotificationsGet(
          pageSize,
          authToken.secret,
          cursor
        );

      // yield current page
      yield* response.data.result.notifications;

      // prep for next page
      if (response.data.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.next.cursor;
    }
  }

  /**
   * A list of the latest casts across all users in reverse chronological order based on timestamp
   */
  public async *fetchRecentCasts({ pageSize = 100 } = {}): AsyncGenerator<
    Cast,
    void,
    undefined
  > {
    let cursor: string | undefined;
    let response: AxiosResponse<InlineResponse2006>;

    while (true) {
      // fetch one page of casts (with refreshed auth if necessary)
      const authToken = await this.getOrCreateValidAuthToken();
      response = await this.apis.casts.v2RecentCastsGet(
        pageSize,
        authToken.secret,
        cursor
      );

      // yield current page of casts
      yield* response.data.result.casts;

      // prep for next page
      if (response.data.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.next.cursor;
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

    while (true) {
      // fetch one page of casts (with refreshed auth if necessary)
      const authToken = await this.getOrCreateValidAuthToken();
      const response = await this.apis.users.v2RecentUsersGet(
        pageSize,
        authToken.secret,
        cursor
      );

      // yield current page of casts
      yield* response.data.result.users;

      // prep for next page
      if (response.data.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.next.cursor;
    }
  }

  /**
   * Fetch all asset collections owned by the specified user.
   */
  public async *fetchUserAssetCollections(
    user: { fid: number },
    { pageSize = 100 } = {}
  ): AsyncGenerator<AssetCollection, void, undefined> {
    let cursor: string | undefined;
    let response: AxiosResponse<InlineResponse20011>;

    while (true) {
      // fetch one page of followers
      const authToken = await this.getOrCreateValidAuthToken();
      response = await this.apis.assets.v2UserCollectionsGet(
        user.fid,
        pageSize,
        authToken.secret,
        cursor
      );

      // yield current page of casts
      yield* response.data.result.collections;

      // prep for next page
      if (response.data.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.next.cursor;
    }
  }

  /**
   * Fetch all asset collections owned by the specified user.
   */
  public async *fetchUserAssetsInCollection(
    user: { fid: number },
    collectionId: string,
    { pageSize = 100 } = {}
  ): AsyncGenerator<Asset, void, undefined> {
    let cursor: string | undefined;
    let response: AxiosResponse<InlineResponse2005>;

    while (true) {
      // fetch one page of followers
      const authToken = await this.getOrCreateValidAuthToken();
      response = await this.apis.assets.v2CollectionAssetsGet(
        user.fid,
        collectionId,
        pageSize,
        authToken.secret,
        cursor
      );

      // yield current page of casts
      yield* response.data.result.assets;

      // prep for next page
      if (response.data.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.next.cursor;
    }
  }

  /**
   * Get all users that follow the specified user
   */
  public async *fetchUserFollowers(
    user: { fid: number },
    { pageSize = 100 } = {}
  ): AsyncGenerator<User, void, undefined> {
    let cursor: string | undefined;
    let response: AxiosResponse<InlineResponse2009>;

    while (true) {
      // fetch one page of followers
      const authToken = await this.getOrCreateValidAuthToken();
      response = await this.apis.follows.v2FollowersGet(
        user.fid,
        pageSize,
        authToken.secret,
        cursor
      );

      // yield current page of casts
      yield* response.data.result.users;

      // prep for next page
      if (response.data.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.next.cursor;
    }
  }

  /**
   * Get all users the specified user is following.
   */
  public async *fetchUserFollowing(
    user: { fid: number },
    { pageSize = 100 } = {}
  ): AsyncGenerator<User, void, undefined> {
    let cursor: string | undefined;
    let response: AxiosResponse<InlineResponse2009>;

    while (true) {
      // fetch one page of followers
      const authToken = await this.getOrCreateValidAuthToken();
      response = await this.apis.follows.v2FollowingGet(
        user.fid,
        pageSize,
        authToken.secret,
        cursor
      );

      // yield current page of casts
      yield* response.data.result.users;

      // prep for next page
      if (response.data.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.next.cursor;
    }
  }

  public async *fetchUserVerifications(
    user: {
      fid: number;
    },
    { pageSize = 100 } = {}
  ): AsyncGenerator<Verification, void, undefined> {
    let cursor: string | undefined;

    while (true) {
      const authToken = await this.getOrCreateValidAuthToken();
      const response = await this.apis.verifications.v2VerificationsGet(
        user.fid,
        pageSize,
        authToken.secret,
        cursor
      );

      yield* response.data.result.verifications;

      if (response.data.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.next.cursor;
    }
  }

  /**
   * Follow a user
   */
  public async followUser(user: { fid: number }): Promise<void> {
    const authToken = await this.getOrCreateValidAuthToken();
    await this.apis.follows.v2FollowsPut(authToken.secret, {
      targetFid: user.fid,
    });
  }

  /**
   * Gets the specified user via their FID (if found)
   */
  public async lookupUserByFid(fid: number): Promise<User | undefined> {
    const authToken = await this.getOrCreateValidAuthToken();
    const response = await this.apis.users.v2UserGet(fid, authToken.secret, {
      validateStatus: (status) => {
        return status === 200 || status === 404;
      },
    });
    if (response.status === 404) return undefined;
    return response.data.result.user;
  }

  /**
   * Gets the specified user via their username (if found)
   */
  public async lookupUserByUsername(
    username: string
  ): Promise<User | undefined> {
    const authToken = await this.getOrCreateValidAuthToken();
    const response = await this.apis.users.v2UserByUsernameGet(
      username,
      authToken.secret,
      {
        validateStatus: (status) => {
          return status === 200 || status === 404;
        },
      }
    );
    if (response.status === 404) return undefined;
    return response.data.result.user;
  }

  /**
   * Publishes a cast for the currently authenticated user
   */
  public async publishCast(
    text: string,
    replyTo?: Cast | { fid: number; hash: string }
  ): Promise<Cast> {
    const authToken = await this.getOrCreateValidAuthToken();
    const body: V2CastsBody = {
      text,
    };
    if (replyTo !== undefined) {
      let parentFid: number;
      if ("author" in replyTo) {
        parentFid = replyTo.author.fid;
      } else {
        parentFid = replyTo.fid;
      }
      body.parent = {
        fid: parentFid,
        hash: replyTo.hash,
      };
    }
    const response = await this.apis.casts.v2CastsPost(authToken.secret, body);
    return response.data.result.cast;
  }

  /**
   * React to a cast
   */
  public async reactToCast(
    reaction: CastReactionType,
    cast: Cast | { castHash: string }
  ): Promise<CastReaction> {
    const authToken = await this.getOrCreateValidAuthToken();
    let castHash: string;
    if ("author" in cast) {
      castHash = cast.hash;
    } else {
      castHash = cast.castHash;
    }
    const body: V2CastReactionsBody = {
      type: reaction,
      castHash,
    };
    const response = await this.apis.casts.v2CastReactionsPut(
      authToken.secret,
      body
    );
    return response.data.result.like;
  }

  /**
   * Recast a cast
   */
  public async recast(castOrCastHash: Cast | string): Promise<void> {
    const authToken = await this.getOrCreateValidAuthToken();
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    await this.apis.casts.v2RecastsPut(authToken.secret, {
      castHash,
    });
  }

  /**
   * Remove a reaction to a cast
   */
  public async removeReactionToCast(
    reaction: CastReactionType,
    cast: Cast | { castHash: string }
  ): Promise<void> {
    const authToken = await this.getOrCreateValidAuthToken();
    let castHash: string;
    if ("author" in cast) {
      castHash = cast.hash;
    } else {
      castHash = cast.castHash;
    }
    const body: V2CastReactionsBody = {
      type: reaction,
      castHash,
    };
    await this.apis.casts.v2CastReactionsDelete(authToken.secret, body);
  }

  public async revokeAuthToken(authToken: AuthToken): Promise<void> {
    // If caller requests to revoke the auth token that this API client was itself using,
    // then we need to clear out the handle to that token so that the client will not attempt
    // to reuse that revoked token for its next API call
    if (
      this.authToken !== undefined &&
      (await this.authToken).secret === authToken.secret
    ) {
      this.authToken = undefined;
    }

    const params: V2AuthBody1 = {
      method: V2AuthBody1MethodEnum.RevokeToken,
      params: {
        timestamp: authToken.expiresAt,
      },
    };

    await this.apis.auth.v2AuthDelete(`Bearer ${authToken.secret}`, params);
  }

  /**
   * Unfollow a user
   */
  public async unfollowUser(user: { fid: number }): Promise<void> {
    const authToken = await this.getOrCreateValidAuthToken();
    await this.apis.follows.v2FollowsDelete(authToken.secret, {
      targetFid: user.fid,
    });
  }

  /**
   * Unwatch a cast
   */
  public async unwatchCast(
    cast: Cast | { casterFid: number; castHash: string }
  ): Promise<void> {
    const authToken = await this.getOrCreateValidAuthToken();
    let castFid: number;
    let castHash: string;
    if ("author" in cast) {
      castFid = cast.author.fid;
      castHash = cast.hash;
    } else {
      castFid = cast.casterFid;
      castHash = cast.castHash;
    }
    const body: V2WatchedCastsBody = {
      castFid,
      castHash,
    };
    await this.apis.watches.v2WatchedCastsDelete(authToken.secret, body);
  }

  /**
   * Watch a cast
   */
  public async watchCast(
    cast: Cast | { casterFid: number; castHash: string }
  ): Promise<void> {
    const authToken = await this.getOrCreateValidAuthToken();
    let castFid: number;
    let castHash: string;
    if ("author" in cast) {
      castFid = cast.author.fid;
      castHash = cast.hash;
    } else {
      castFid = cast.casterFid;
      castHash = cast.castHash;
    }
    const body: V2WatchedCastsBody = {
      castFid,
      castHash,
    };
    await this.apis.watches.v2WatchedCastsPut(authToken.secret, body);
  }

  private async _authHeader(params: V2AuthBody | V2AuthBody1): Promise<string> {
    const payload = canonicalize(params);
    if (payload === undefined)
      throw new Error("failed to canonicalize auth params");

    const signature = Buffer.from(
      utils.arrayify(await this.wallet.signMessage(payload))
    ).toString("base64");

    return `Bearer eip191:${signature}`;
  }
}

function _isAuthTokenExpired(authToken: AuthToken): boolean {
  const now = Date.now();
  const expires = new Date(authToken.expiresAt);
  return now + THIRTY_SECONDS_IN_MILLIS > expires.valueOf();
}
