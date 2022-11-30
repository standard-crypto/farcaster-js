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
    user: UserApi;
    users: UsersApi;
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
    this.apis = {
      auth: new AuthApi({ basePath: BASE_PATH }, undefined, axiosInstance),
      casts: new CastsApi({ basePath: BASE_PATH }, undefined, axiosInstance),
      user: new UserApi({ basePath: BASE_PATH }, undefined, axiosInstance),
      users: new UsersApi({ basePath: BASE_PATH }, undefined, axiosInstance),
    };
  }

  public async fetchCurrentUser(): Promise<User> {
    const authToken = await this._getValidAuthToken();
    const response = await this.apis.user.v2MeGet(authToken.secret);
    return response.data.result.user;
  }

  public async *fetchCastsForUser(
    user: { fid: number },
    includeDeletedCasts: boolean
  ): AsyncGenerator<Cast, void, undefined> {
    const pageSize = 100;
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

      // return current page of casts
      yield* response.data.result.casts;

      // pagination and recurse
      if (response.data.next === undefined) {
        break;
      }
      cursor = response.data.next.cursor;
    }
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

  private async _getValidAuthToken(): Promise<AuthToken> {
    if (
      this.authToken !== undefined &&
      !_isAuthTokenExpired(await this.authToken)
    ) {
      return await this.authToken;
    }

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
    const payload = canonicalize(params)!;

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
