import axios, { AxiosError, AxiosInstance } from "axios";
import { Logger, silentLogger } from "../common/logger";
import type { SetRequired } from "type-fest";
import {
  CastId,
  CastsApi,
  Configuration,
  ErrorResponse,
  HubInfoResponse,
  InfoApi,
  ReactionsApi,
  ReactionsApiGetReactionByIdRequest,
} from "./openapi";
import { CastAdd, parseCastAdd, parseReaction, Reaction } from "./types";

export const DEFAULT_SERVER = "http://hub.farcaster.standardcrypto.vc:2281";

export interface HubRestAPIClientConfig {
  axiosInstance?: AxiosInstance;
  server?: string;
  logger?: Logger;
}

export interface PaginationOptions {
  pageSize?: number;
  reverse?: boolean;
}

export class HubRestAPIClient {
  private readonly logger: Logger;

  public readonly apis: {
    info: InfoApi;
    casts: CastsApi;
    reactions: ReactionsApi;
  };

  /**
   * Instantiates a MerkleAPIClient
   *
   * Note: A Wallet must be provided if the API client is to mint new AuthTokens
   */
  constructor({
    axiosInstance,
    server = DEFAULT_SERVER,
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
      }
    );

    const config: Configuration = new Configuration({ basePath: server });
    this.apis = {
      casts: new CastsApi(config, undefined, axiosInstance),
      info: new InfoApi(config, undefined, axiosInstance),
      reactions: new ReactionsApi(config, undefined, axiosInstance),
    };
  }

  public async getHubInfo({
    includeDbStats = false,
  } = {}): Promise<HubInfoResponse> {
    const response = await this.apis.info.getInfo({ dbstats: includeDbStats });
    return response.data;
  }

  public async getCastById({ fid, hash }: CastId): Promise<CastAdd | null> {
    try {
      const result = await this.apis.casts.getCastById({ fid, hash });
      return parseCastAdd(result.data);
    } catch (err) {
      if (
        HubRestAPIClient.isApiErrorResponse(err) &&
        err.response.data.errCode === "not_found"
      ) {
        return null;
      }
      throw err;
    }
  }

  public async *getCastsByFid(
    fid: number,
    options?: PaginationOptions
  ): AsyncGenerator<CastAdd, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.casts.getCastsByFid({
        fid,
        ...options,
        pageToken,
      });

      // yield current page
      for (const msg of response.data.messages) {
        yield parseCastAdd(msg);
      }

      // prep for next page
      if (response.data.nextPageToken === "") {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  public async *getCastsByMention(
    fid: number,
    options?: PaginationOptions
  ): AsyncGenerator<CastAdd, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.casts.getCastsByMention({
        ...options,
        fid,
        pageToken,
      });

      // yield current page
      for (const msg of response.data.messages) {
        yield parseCastAdd(msg);
      }

      // prep for next page
      if (response.data.nextPageToken === "") {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  public async *getCastsByParent(
    parent: CastId | { url: string },
    options?: PaginationOptions
  ): AsyncGenerator<CastAdd, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.casts.getCastsByParent({
        ...parent,
        ...options,
        pageToken,
      });

      // yield current page
      for (const msg of response.data.messages) {
        yield parseCastAdd(msg);
      }

      // prep for next page
      if (response.data.nextPageToken === "") {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  public async getReactionById(
    id: ReactionsApiGetReactionByIdRequest
  ): Promise<Reaction | null> {
    try {
      const result = await this.apis.reactions.getReactionById(id);
      return parseReaction(result.data);
    } catch (err) {
      if (
        HubRestAPIClient.isApiErrorResponse(err) &&
        err.response.data.errCode === "not_found"
      ) {
        return null;
      }
      throw err;
    }
  }

  /**
   * Utility for parsing errors returned by the Merkle API server. Returns true
   * if the given error is caused by an error response from the server, and
   * narrows the type of `error` accordingly.
   */
  public static isApiErrorResponse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
  ): error is SetRequired<AxiosError<ErrorResponse>, "response"> {
    if (!(error instanceof AxiosError)) return false;
    return (
      error.response?.data !== undefined && "errCode" in error.response.data
    );
  }
}
