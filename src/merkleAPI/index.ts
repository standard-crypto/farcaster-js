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
} from "./swagger";
import canonicalize from "canonicalize";
import axios, { AxiosResponse } from "axios";
import { dummyLogger, Logger } from "./logger";

const THIRTY_SECONDS_IN_MILLIS = 30000;
const TEN_MINUTES_IN_MILLIS = 600000;

const BASE_PATH = "https://api.farcaster.xyz";

export class MerkleAPIClient {
  private authToken?: Promise<AuthToken>;

  public readonly apis: {
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
      auth: new AuthApi(config, undefined, axiosInstance),
      casts: new CastsApi(config, undefined, axiosInstance),
      follows: new FollowsApi(config, undefined, axiosInstance),
      user: new UserApi(config, undefined, axiosInstance),
      users: new UsersApi(config, undefined, axiosInstance),
      watches: new WatchesApi(config, undefined, axiosInstance),
    };
  }

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

  public async fetchCurrentUser(): Promise<User> {
    const authToken = await this._getValidAuthToken();
    const response = await this.apis.user.v2MeGet(authToken.secret);
    return response.data.result.user;
  }

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

  public async followUser(user: { fid: number }): Promise<void> {
    const authToken = await this._getValidAuthToken();
    await this.apis.follows.v2FollowsPut(authToken.secret, {
      targetFid: user.fid,
    });
  }

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

  public async unfollowUser(user: { fid: number }): Promise<void> {
    const authToken = await this._getValidAuthToken();
    await this.apis.follows.v2FollowsDelete(authToken.secret, {
      targetFid: user.fid,
    });
  }

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
}

function _isAuthTokenExpired(authToken: AuthToken): boolean {
  const now = Date.now();
  const expires = new Date(authToken.expiresAt);
  return now + THIRTY_SECONDS_IN_MILLIS > expires.valueOf();
}
