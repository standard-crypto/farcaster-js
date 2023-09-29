import { User, UserApi, Configuration, ErrorRes, Reaction } from "./swagger";
import axios, { AxiosError, AxiosInstance } from "axios";
import { silentLogger, Logger } from "./logger";
import type { WithRequired } from "../utils";

const BASE_PATH = "https://api.neynar.com/v1";

export class NeynarAPIClient {
  private readonly logger: Logger;

  public readonly apis: {
    user: UserApi;
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
      user: new UserApi(config, undefined, axiosInstance),
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
      cursor = response.data.result?.next.cursor ?? undefined;
    }
  }

  /**
   * Fetch all likes by a given user.
   */
  public async *fetchUserCastLikes(
    user: { fid: number },
    { pageSize = 100 } = {}
  ): AsyncGenerator<Reaction, void, undefined> {
    let cursor: string | undefined;
    let viewer: number | undefined;

    while (true) {
      // fetch one page of likes
      const response = await this.apis.user.getUserCastLikes(
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
      const response = await this.apis.user.getUserInformationByFid(fid);
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
    const response = await this.apis.user.getUserInformationByUsername(
      username,
      viewer,
      {
        validateStatus: (status: number) => {
          return status === 200 || status === 404;
        },
      }
    );
    if (response.status === 404) return undefined;
    return response.data.result?.user;
  }
}
