import axios, { AxiosError, AxiosInstance } from "axios";
import { Logger, silentLogger } from "../common/logger";
import { WithRequired } from "../common/typeUtils";
import { CastsApi, Configuration, InfoApi } from "./swagger";

export const DEFAULT_SERVER = "http://hub.farcaster.standardcrypto.vc:2281";

export interface HubRestAPIClientConfig {
  axiosInstance?: AxiosInstance;
  server?: string;
  logger?: Logger;
}

export class HubRestAPIClient {
  private readonly logger: Logger;

  public readonly apis: {
    info: InfoApi;
    casts: CastsApi;
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
        // if (HubRestAPIClient.isApiErrorResponse(error)) {
        //   const apiErrors = error.response.data;
        //   this.logger.warn(`API errors: ${JSON.stringify(apiErrors)}`);
        // }
        throw error;
      }
    );

    const config: Configuration = new Configuration({ basePath: server });
    this.apis = {
      casts: new CastsApi(config, undefined, axiosInstance),
      info: new InfoApi(config, undefined, axiosInstance),
    };
  }

  /**
   * Utility for parsing errors returned by the Merkle API server. Returns true
   * if the given error is caused by an error response from the server, and
   * narrows the type of `error` accordingly.
   */
  // public static isApiErrorResponse(
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   error: any
  // ): error is WithRequired<AxiosError<ApiErrorResponse>, "response"> {
  //   if (!(error instanceof AxiosError)) return false;
  //   return (
  //     error.response?.data !== undefined && "errors" in error.response.data
  //   );
  // }
}
