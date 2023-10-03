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
  NotificationCastMention,
  NotificationCastReply,
  V2SignerRequestsPost200ResponseResult,
  SignerRequest,
  Configuration,
  MiscellaneousApi,
} from "./swagger";
import canonicalize from "canonicalize";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { silentLogger, Logger } from "./logger";
import type { WithRequired } from "../utils";
import { SignerRequestsApi } from "./swagger/apis/signer-requests-api";

const THIRTY_SECONDS_IN_MILLIS = 30000;
const TEN_MINUTES_IN_MILLIS = 600000;

const BASE_PATH = "https://client.warpcast.com";

export class MerkleAPIClient {
  private authToken?: Promise<AuthToken>;
  private readonly logger: Logger;
  private readonly wallet?: Wallet;

  public readonly apis: {
    assets: AssetsApi;
    auth: AuthApi;
    casts: CastsApi;
    follows: FollowsApi;
    miscellaneous: MiscellaneousApi;
    notifications: NotificationsApi;
    signerRequests: SignerRequestsApi;
    user: UserApi;
    users: UsersApi;
    verifications: VerificationsApi;
    watches: WatchesApi;
  };

  /**
   * Instantiates a MerkleAPIClient
   *
   * Note: A Wallet must be provided if the API client is to mint new AuthTokens
   */
  constructor(
    walletOrAuthToken?: Wallet | { secret: string; expiresAt?: number },
    {
      logger = silentLogger,
      axiosInstance,
    }: { logger?: Logger; axiosInstance?: AxiosInstance } = {}
  ) {
    this.logger = logger;

    if (walletOrAuthToken === undefined) {
      this.authToken = Promise.reject(
        new Error(
          "Attempt to use an authenticated API method without first providing a wallet or AuthToken"
        )
      );
    } else if (walletOrAuthToken instanceof Wallet) {
      this.wallet = walletOrAuthToken;
    } else {
      const authToken: AuthToken = {
        secret: walletOrAuthToken.secret,
        expiresAt: walletOrAuthToken.expiresAt ?? 33228645430000,
      };
      this.authToken = Promise.resolve(authToken);
    }

    if (axiosInstance === undefined) {
      axiosInstance = axios.create();
    }
    axiosInstance.defaults.decompress = true;
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (MerkleAPIClient.isApiErrorResponse(error)) {
          const apiErrors = error.response.data;
          this.logger.warn(`API errors: ${JSON.stringify(apiErrors)}`);
        }
        throw error;
      }
    );

    const config: Configuration = new Configuration({ basePath: BASE_PATH });
    this.apis = {
      assets: new AssetsApi(config, undefined, axiosInstance),
      auth: new AuthApi(config, undefined, axiosInstance),
      casts: new CastsApi(config, undefined, axiosInstance),
      follows: new FollowsApi(config, undefined, axiosInstance),
      miscellaneous: new MiscellaneousApi(config, undefined, axiosInstance),
      notifications: new NotificationsApi(config, undefined, axiosInstance),
      signerRequests: new SignerRequestsApi(config, undefined, axiosInstance),
      user: new UserApi(config, undefined, axiosInstance),
      users: new UsersApi(config, undefined, axiosInstance),
      verifications: new VerificationsApi(config, undefined, axiosInstance),
      watches: new WatchesApi(config, undefined, axiosInstance),
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
  ): error is WithRequired<AxiosError<ApiErrorResponse>, "response"> {
    if (!(error instanceof AxiosError)) return false;
    return (
      error.response?.data !== undefined && "errors" in error.response.data
    );
  }

  public async checkServerAcceptsAuthToken(
    authToken: AuthToken
  ): Promise<void> {
    await this.apis.user.v2MeGet(authToken.secret);
  }

  /**
   * Creates a new auth token from the signing key of the Wallet
   * configured with this API client.
   */
  public async createAuthToken(
    expiryDurationMillis = TEN_MINUTES_IN_MILLIS,
    { checkServerAcceptsToken = true } = {}
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
    try {
      if (checkServerAcceptsToken) {
        await this.checkServerAcceptsAuthToken(response.data.result.token);
      }
      return response.data.result.token;
    } catch (error) {
      if (MerkleAPIClient.isApiErrorResponse(error)) {
        const errors = error.response.data.errors;
        if (
          errors.length === 1 &&
          errors[0].message.includes("Invalid authentication token")
        ) {
          throw Error(
            "Warpcast API did not accept the auth token it just created. You may have too many long-lived tokens active at once, and should consider #revokeAllTokens()"
          );
        }
      }
      throw error;
    }
  }

  /**
   * Creates a SignerRequest. See [Warpcast documentation](https://warpcast.notion.site/Warpcast-API-Docs-Signer-Requests-Public-e02ef71883374d2ca8d27239a8cc35d5)
   * for more details.
   *
   * Note: Authentication credentials are not required for this API endpoint.
   * @param publicKey
   * @param name
   */
  public async createSignerRequest(
    publicKey: string,
    name: string
  ): Promise<V2SignerRequestsPost200ResponseResult> {
    const response = await this.apis.signerRequests.v2SignerRequestsPost({
      publicKey,
      name,
    });
    return response.data.result;
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

    if (this.wallet === undefined) {
      throw new Error("the AuthToken provided has expired");
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
   * Fetches casts in a given thread.
   * Note that the parent provided by the caller is included in the response.
   */
  public async *fetchCastsInThread(
    threadParent: Cast | { hash: string },
    { pageSize = 100 } = {}
  ): AsyncGenerator<Cast, void, undefined> {
    let cursor: string | undefined;

    while (true) {
      // fetch one page of casts (with refreshed auth if necessary)
      const authToken = await this.getOrCreateValidAuthToken();
      const response = await this.apis.casts.v2AllCastsInThreadGet(
        threadParent.hash,
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
  } = {}): AsyncGenerator<
    NotificationCastMention | NotificationCastReply,
    void,
    undefined
  > {
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
   * Lists a given cast's likes
   */
  public async *fetchCastLikes(
    castOrCastHash: Cast | string,
    { pageSize = 100 } = {}
  ): AsyncGenerator<CastReaction, void, undefined> {
    let cursor: string | undefined;
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }

    while (true) {
      const authToken = await this.getOrCreateValidAuthToken();
      const response = await this.apis.casts.v2CastLikesGet(
        castHash,
        pageSize,
        authToken.secret,
        cursor
      );

      yield* response.data.result.likes;

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
   * Fetches an existing SignerRequest. See [Warpcast documentation](https://warpcast.notion.site/Warpcast-API-Docs-Signer-Requests-Public-e02ef71883374d2ca8d27239a8cc35d5)
   * for more details.
   *
   * Note: Authentication credentials are not required for this API endpoint.
   */
  public async fetchSignerRequest(
    token: string
  ): Promise<SignerRequest | undefined> {
    try {
      const response = await this.apis.signerRequests.v2SignerRequestGet(token);
      return response.data.result.signerRequest;
    } catch (error) {
      if (MerkleAPIClient.isApiErrorResponse(error)) {
        const errors = error.response.data.errors;
        if (
          errors.length === 1 &&
          errors[0].message.includes("No signer request found with token")
        ) {
          return undefined;
        }
      }
      throw error;
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
   * Fetch all assets owned by a given user for a specific collection.
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
   * Fetch all likes by a given user.
   */
  public async *fetchUserCastLikes(
    user: { fid: number },
    { pageSize = 100 } = {}
  ): AsyncGenerator<CastReaction, void, undefined> {
    let cursor: string | undefined;

    while (true) {
      // fetch one page of likes
      const authToken = await this.getOrCreateValidAuthToken();
      const response = await this.apis.casts.v2UserCastLikesGet(
        user.fid,
        pageSize,
        authToken.secret,
        cursor
      );

      // yield current page of likes
      yield* response.data.result.likes;

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
   * Check the status of the API. Expected status is "ok".
   *
   * Note: authentication parameters are not required.
   */
  public async healthcheck(): Promise<{ status: string }> {
    const response = await this.apis.miscellaneous.healthcheckGet();
    return response.data.result;
  }

  /**
   * Gets the specified user via their FID (if found)
   */
  public async lookupUserByFid(fid: number): Promise<User | undefined> {
    const authToken = await this.getOrCreateValidAuthToken();
    try {
      const response = await this.apis.users.v2UserGet(fid, authToken.secret);
      return response.data.result.user;
    } catch (error) {
      if (MerkleAPIClient.isApiErrorResponse(error)) {
        const errors = error.response.data.errors;
        if (
          errors.length === 1 &&
          errors[0].message.includes("No account found with fid")
        ) {
          return undefined;
        }
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
   * Checks if a given Ethereum address has a Farcaster user associated with it.
   * Note: if an address is associated with multiple users, the API will return
   * the user who most recently published a verification with the address
   * (based on when Merkle received the proof, not a self-reported timestamp).
   */
  public async lookupUserByVerification(
    address: string
  ): Promise<User | undefined> {
    const authToken = await this.getOrCreateValidAuthToken();
    const response = await this.apis.users.v2UserByVerificationGet(
      address,
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
    replyTo?: Cast | { fid: number; hash: string } | string,
    embeds?: string[]
  ): Promise<Cast> {
    const authToken = await this.getOrCreateValidAuthToken();
    const body: V2CastsBody = {
      text,
      embeds,
    };
    if (replyTo !== undefined) {
      if (typeof replyTo === "string") {
        body.parent = replyTo;
      } 
      else {
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
      if (embeds !== undefined) {
        body.embeds = embeds;
      }
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
   * Revokes all other auth tokens created for this user, with the exception of
   * the one token still in use by this particular instance.
   *
   * You may still use this instance after calling this method, but any other
   * applications using Auth Tokens for your user will most likely cease working.
   *
   * Credit to DavidFurlong for this approach:
   * https://github.com/davidfurlong/farcaster-auth-tokens/blob/a114450a1d511caa044e8ace0674146e1ace2531/revoke-all.ts
   */
  public async revokeAllAuthTokens(): Promise<void> {
    const NUM_TOKENS = 50;

    const tokens = await Promise.all(
      Array.from(Array(NUM_TOKENS).keys()).map(async () => {
        // go for the a very big expiry to make sure they have longer expiry than all existing tokens
        return await this.createAuthToken(109999999999999, {
          checkServerAcceptsToken: false,
        });
      })
    );

    // since we will blow up all tokens, whatever old one this client was using is no longer valid.
    // marking as undefined flags that a new one must be re-created next time this client is used
    this.authToken = undefined;

    // revoke all of these auth tokens
    for (const token of tokens) {
      await this.revokeAuthToken(token);
    }
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
    if (payload === undefined) {
      throw new Error("failed to canonicalize auth params");
    }

    if (this.wallet === undefined) {
      throw new Error(
        "MerkleAPIClient cannot create new auth tokens as it was initialized without a Wallet instance"
      );
    }

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
