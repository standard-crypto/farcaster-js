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
  V2castsParent,
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
} from "./swagger";
import canonicalize from "canonicalize";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { dummyLogger, Logger } from "./logger";

const THIRTY_SECONDS_IN_MILLIS = 30000;
const TEN_MINUTES_IN_MILLIS = 600000;

const BASE_PATH = "https://api.farcaster.xyz";

interface PaginatedResponseResult<ElemT> {
  [key: string]: ElemT[];
}

type PaginatedResponse<ElemT> = Promise<
  AxiosResponse<{
    result: PaginatedResponseResult<ElemT>;
    next?: {
      cursor?: string;
    };
  }>
>;

/* eslint-disable @typescript-eslint/no-explicit-any */
type PaginatedApiMethod<Args extends any[], ElemT> = (
  ...args: [
    ...Args,
    number, // pageLimit
    string, // authorization
    string | undefined, // cursor
    AxiosRequestConfig<any> | undefined
  ]
) => PaginatedResponse<ElemT>;
/* eslint-enable @typescript-eslint/no-explicit-any */

export class MerkleAPIClient {
  private authToken?: Promise<AuthToken>;

  public readonly apis: {
    assets: AssetsApi;
    auth: AuthApi;
    casts: CastsApi;
    follows: FollowsApi;
    user: UserApi;
    users: UsersApi;
    watches: WatchesApi;
  };

  constructor(
    private readonly wallet: Wallet,
    private readonly logger: Logger = dummyLogger
  ) {
    const axiosInstance = axios.create({
      headers: { "content-type": "application/json" },
    });
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
      user: new UserApi(config, undefined, axiosInstance),
      users: new UsersApi(config, undefined, axiosInstance),
      watches: new WatchesApi(config, undefined, axiosInstance),
    };
  }

  /**
   * Delete a cast
   */
  public async deleteCast(castOrCastHash: Cast | string): Promise<void> {
    const authToken = await this._getValidAuthToken();
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
    const authToken = await this._getValidAuthToken();
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    await this.apis.casts.v2RecastsDelete(authToken.secret, { castHash });
  }

  /**
   * Gets the currently authenticated user
   */
  public async fetchCurrentUser(): Promise<User> {
    const authToken = await this._getValidAuthToken();
    const response = await this.apis.user.v2MeGet(authToken.secret);
    return response.data.result.user;
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
      const authToken = await this._getValidAuthToken();
      response = await this.apis.casts.v2CastsGet(
        user.fid,
        includeDeletedCasts,
        pageSize,
        authToken.secret,
        cursor
      );

      // yield current page of casts
      for (const cast of response.data.result.casts) {
        if (includeRecasts || cast.author.fid === user.fid) {
          yield cast;
        }
      }

      // prep for next page
      if (response.data.next === undefined) {
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
      const authToken = await this._getValidAuthToken();
      response = await this.apis.assets.v2UserCollectionsGet(
        user.fid,
        pageSize,
        authToken.secret,
        cursor
      );

      // yield current page of casts
      yield* response.data.result.collections;

      // prep for next page
      if (response.data.next === undefined) {
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
      const authToken = await this._getValidAuthToken();
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
      if (response.data.next === undefined) {
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
      const authToken = await this._getValidAuthToken();
      response = await this.apis.follows.v2FollowersGet(
        user.fid,
        pageSize,
        authToken.secret,
        cursor
      );

      // yield current page of casts
      yield* response.data.result.users;

      // prep for next page
      if (response.data.next === undefined) {
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
      const authToken = await this._getValidAuthToken();
      response = await this.apis.follows.v2FollowingGet(
        user.fid,
        pageSize,
        authToken.secret,
        cursor
      );

      // yield current page of casts
      yield* response.data.result.users;

      // prep for next page
      if (response.data.next === undefined) {
        break;
      }
      cursor = response.data.next.cursor;
    }
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

  /**
   * Follow a user
   */
  public async followUser(user: { fid: number }): Promise<void> {
    const authToken = await this._getValidAuthToken();
    await this.apis.follows.v2FollowsPut(authToken.secret, {
      targetFid: user.fid,
    });
  }

  /**
   * Gets the specified user via their FID (if found)
   */
  public async lookupUserByFid(fid: number): Promise<User | undefined> {
    const authToken = await this._getValidAuthToken();
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
    const authToken = await this._getValidAuthToken();
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
    replyTo?: Cast | V2castsParent
  ): Promise<Cast> {
    const authToken = await this._getValidAuthToken();
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
    cast: Cast | { casterFid: number; castHash: string }
  ): Promise<CastReaction> {
    const authToken = await this._getValidAuthToken();
    let castFid: number;
    let castHash: string;
    if ("author" in cast) {
      castFid = cast.author.fid;
      castHash = cast.hash;
    } else {
      castFid = cast.casterFid;
      castHash = cast.castHash;
    }
    const body: V2CastReactionsBody = {
      type: reaction,
      castFid,
      castHash,
    };
    const response = await this.apis.casts.v2CastReactionsPut(
      authToken.secret,
      body
    );
    return response.data.result.reaction;
  }

  /**
   * Recast a cast
   */
  public async recast(castOrCastHash: Cast | string): Promise<void> {
    const authToken = await this._getValidAuthToken();
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
    cast: Cast | { casterFid: number; castHash: string }
  ): Promise<void> {
    const authToken = await this._getValidAuthToken();
    let castFid: number;
    let castHash: string;
    if ("author" in cast) {
      castFid = cast.author.fid;
      castHash = cast.hash;
    } else {
      castFid = cast.casterFid;
      castHash = cast.castHash;
    }
    const body: V2CastReactionsBody = {
      type: reaction,
      castFid,
      castHash,
    };
    await this.apis.casts.v2CastReactionsDelete(authToken.secret, body);
  }

  /**
   * Unfollow a user
   */
  public async unfollowUser(user: { fid: number }): Promise<void> {
    const authToken = await this._getValidAuthToken();
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
    const authToken = await this._getValidAuthToken();
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
    const authToken = await this._getValidAuthToken();
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

  private async _getValidAuthToken(): Promise<AuthToken> {
    if (
      this.authToken !== undefined &&
      !_isAuthTokenExpired(await this.authToken)
    ) {
      // existing auth token is still valid
      return await this.authToken;
    }

    // queue up a request for a new auth token
    this.authToken = (async (): Promise<AuthToken> => {
      this.logger.debug("fetching new authToken...");
      const now = Date.now();
      const params: V2AuthBody = {
        method: V2AuthBodyMethodEnum.GenerateToken,
        params: {
          timestamp: now,
          expiresAt: now + TEN_MINUTES_IN_MILLIS,
        },
      };
      const authHeader = await this._authHeader(params);
      const response = await this.apis.auth.v2AuthPut(params, {
        headers: { Authorization: authHeader },
      });
      return response.data.result.token;
    })();

    return await this.authToken;
  }

  private async _authHeader(params: V2AuthBody): Promise<string> {
    const payload = canonicalize(params);
    if (payload === undefined)
      throw new Error("failed to canonicalize auth params");

    const signature = Buffer.from(
      utils.arrayify(await this.wallet.signMessage(payload))
    ).toString("base64");

    return `Bearer eip191:${signature}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async *_paginate<Args extends any[], ElemT>(
    apiMethod: PaginatedApiMethod<Args, ElemT>,
    args: Args,
    keyInResult: keyof Awaited<ReturnType<typeof apiMethod>>["data"]["result"],
    pageSize: number
  ): AsyncGenerator<ElemT, void, undefined> {
    let cursor: string | undefined;
    while (true) {
      // fetch one page of data
      const authToken = await this._getValidAuthToken();
      const response = await apiMethod.apply(apiMethod, [
        ...args,
        pageSize,
        authToken.secret,
        cursor,
        undefined,
      ]);

      // yield current page's elements
      yield* response.data.result[keyInResult];

      // prep for next page
      if (response.data.next === undefined) {
        break;
      }
      cursor = response.data.next.cursor;
    }
  }
}

function _isAuthTokenExpired(authToken: AuthToken): boolean {
  const now = Date.now();
  const expires = new Date(authToken.expiresAt);
  return now + THIRTY_SECONDS_IN_MILLIS > expires.valueOf();
}
