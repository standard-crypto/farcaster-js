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
  LinksApi,
  LinkType,
  CastAdd,
  ReactionsApi,
  ReactionsApiGetReactionByIdRequest,
  ReactionType,
  Reaction,
  LinkAdd,
  UserDataApi,
  UserDataType,
  UserDataAdd,
  GetUserDataByFid200ResponseOneOf,
} from "./openapi";

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
    links: LinksApi;
    reactions: ReactionsApi;
    userData: UserDataApi;
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
      links: new LinksApi(config, undefined, axiosInstance),
      reactions: new ReactionsApi(config, undefined, axiosInstance),
      userData: new UserDataApi(config, undefined, axiosInstance),
    };
  }

  /**
   * Get the Hub's info
   */
  public async getHubInfo({
    includeDbStats = false,
  } = {}): Promise<HubInfoResponse> {
    const response = await this.apis.info.getInfo({ dbstats: includeDbStats });
    return response.data;
  }

  /**
   * Get a cast by its FID and Hash.
   */
  public async getCastById({ fid, hash }: CastId): Promise<CastAdd | null> {
    try {
      const response = await this.apis.casts.getCastById({ fid, hash });
      return response.data;
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
   * Fetch all casts for authored by an FID.
   * @param fid The FID of the cast's creator
   * @param options
   */
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
      yield* response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === "") {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Fetch all casts that mention an FID
   * @param fid The FID that is mentioned in a cast
   * @param options
   */
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
      yield* response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === "") {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Fetch all casts by parent cast's FID and Hash OR by the parent's URL
   * @param parent
   * @param options
   */
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
      yield* response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === "") {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Get a reaction by its created FID and target Cast.
   * @param id
   * @returns
   */
  public async getReactionById(
    id: ReactionsApiGetReactionByIdRequest
  ): Promise<Reaction | null> {
    try {
      const result = await this.apis.reactions.getReactionById(id);
      return result.data;
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
   * Get all reactions by an FID
   * @param fid The FID of the reaction's creator
   * @param reactionType The type of reaction
   * @param options
   */
  public async *getReactionsByFid(
    fid: number,
    reactionType: ReactionType,
    options?: PaginationOptions
  ): AsyncGenerator<Reaction, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.reactions.getReactionsByFid({
        fid,
        reactionType,
        ...options,
        pageToken,
      });

      // yield current page
      yield* response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === "") {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Get all reactions to a cast
   * @param targetFid The FID of the cast's creator
   * @param targetHash The hash of the cast
   * @param reactionType The type of reaction
   * @param options
   */
  public async *getReactionsByCast(
    targetFid: number,
    targetHash: string,
    reactionType: ReactionType,
    options?: PaginationOptions
  ): AsyncGenerator<Reaction, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.reactions.getReactionsByCast({
        targetFid,
        targetHash,
        reactionType,
        ...options,
        pageToken,
      });

      // yield current page
      yield* response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === "") {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Get all reactions to cast's target URL
   * @param url The URL of the parent cast
   * @param reactionType The type of reaction
   * @param options
   */
  public async *getReactionsByTarget(
    url: string,
    reactionType: ReactionType,
    options?: PaginationOptions
  ): AsyncGenerator<Reaction, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.reactions.getReactionsByTarget({
        url,
        reactionType,
        ...options,
        pageToken,
      });

      // yield current page
      yield* response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === "") {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Get a link by its FID and target FID.
   */
  public async getLinkById(
    sourceFid: number,
    targetFid: number
  ): Promise<LinkAdd | null> {
    try {
      const result = await this.apis.links.getLinkById({
        fid: sourceFid,
        targetFid,
        linkType: LinkType.Follow,
      });
      return result.data;
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
   * Get all links from a source FID
   * @param fid The FID of the link's originator
   * @param options
   */
  public async *getLinksByFid(
    fid: number,
    options?: PaginationOptions
  ): AsyncGenerator<LinkAdd, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.links.getLinksByFid({
        fid,
        linkType: LinkType.Follow,
        ...options,
        pageToken,
      });

      // yield current page
      yield* response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === "") {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Get all links to a target FID
   * @param targetFid
   * @param options
   */
  public async *getLinksByTargetFid(
    targetFid: number,
    options?: PaginationOptions
  ): AsyncGenerator<LinkAdd, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.links.getLinksByTargetFid({
        targetFid,
        linkType: LinkType.Follow,
        ...options,
        pageToken,
      });

      // yield current page
      yield* response.data.messages;

      // prep for next page
      if (response.data.nextPageToken === "") {
        break;
      }
      pageToken = response.data.nextPageToken;
    }
  }

  /**
   * Get a specific type of UserData for a FID.
   * @param fid The FID that's being requested
   * @param userDataType The type of UserData requested
   * @returns
   */
  public async getSpecificUserDataByFid(
    fid: number,
    userDataType: UserDataType
  ): Promise<UserDataAdd | null> {
    try {
      const response = await this.apis.userData.getUserDataByFid({
        fid,
        userDataType,
      });
      return response.data as UserDataAdd;
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
   * Get all UserData for a FID.
   * @param fid The FID that's being requested
   * @returns
   */
  public async *getAllUserDataByFid(
    fid: number,
    options?: PaginationOptions
  ): AsyncGenerator<UserDataAdd, void, undefined> {
    let pageToken: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.userData.getUserDataByFid({
        fid,
        ...options,
        pageToken,
      });

      // yield current page
      const data = response.data as GetUserDataByFid200ResponseOneOf;
      yield* data.messages;

      // prep for next page
      if (data.nextPageToken === "") {
        break;
      }
      pageToken = data.nextPageToken;
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
