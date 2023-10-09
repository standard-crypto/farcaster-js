import {
  CastApi,
  SignerApi,
  Configuration,
  ErrorRes,
  Signer,
  Cast,
  CastParamType,
  PostCastReqBody,
  PostCastResponseCast,
  DeleteCastReqBody,
  RegisterSignerKeyReqBody,
  ReactionApi,
  ReactionReqBody,
  ReactionType,
  OperationResponse,
  FollowApi,
  FollowReqBody,
  BulkFollowResponse,
} from "./swagger";
import axios, { AxiosError, AxiosInstance } from "axios";
import { silentLogger, Logger } from "./logger";
import type { WithRequired } from "../utils";

const BASE_PATH = "https://api.neynar.com/v2";

export class NeynarV2APIClient {
  private readonly logger: Logger;

  public readonly apis: {
    signer: SignerApi;
    cast: CastApi;
    reaction: ReactionApi;
    follow: FollowApi;
  };

  /**
   * Instantiates a NeynarV2APIClient
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
        if (NeynarV2APIClient.isApiErrorResponse(error)) {
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
      cast: new CastApi(config, undefined, axiosInstance),
      signer: new SignerApi(config, undefined, axiosInstance),
      reaction: new ReactionApi(config, undefined, axiosInstance),
      follow: new FollowApi(config, undefined, axiosInstance),
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
   * Creates a Signer. See [Neynar documentation](https://docs.neynar.com/reference/create-signer)
   * for more details.
   */
  public async createSigner(): Promise<Signer> {
    const response = await this.apis.signer.createSigner();
    return response.data;
  }

  /**
   * Fetches an existing Signer. See [Neynar documentation](https://docs.neynar.com/reference/get-signer)
   * for more details.
   *
   */
  public async fetchSigner(signerUuid: string): Promise<Signer | undefined> {
    try {
      const response = await this.apis.signer.signer(signerUuid);
      return response.data;
    } catch (error) {
      if (NeynarV2APIClient.isApiErrorResponse(error)) {
        const status = error.response.status;
        if (status === 404) {
          return undefined;
        }
      }
      throw error;
    }
  }

  /**
   * Registers a Signer with an fid. See [Neynar documentation](https://docs.neynar.com/reference/register-app-fid)
   * for more details.
   */
  public async registerSigner(
    signerUuid: string,
    fid: number,
    deadline: number,
    signature: string
  ): Promise<Signer> {
    const body: RegisterSignerKeyReqBody = {
      signer_uuid: signerUuid,
      app_fid: fid,
      deadline,
      signature,
    };
    const response = await this.apis.signer.registerSignedKey(body);
    return response.data;
  }

  /**
   * Gets information about an individual cast
   */
  public async fetchCast(
    castOrCastHash: Cast | string
  ): Promise<Cast | undefined> {
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    try {
      const response = await this.apis.cast.cast(CastParamType.Hash, castHash);
      return response.data.cast ?? undefined;
    } catch (error) {
      if (NeynarV2APIClient.isApiErrorResponse(error)) {
        const status = error.response.status;
        if (status === 404) {
          return undefined;
        }
      }
      throw error;
    }
  }

  /**
   * Publishes a cast for the currently authenticated user
   */
  public async publishCast(
    signerUuid: string,
    text: string,
    replyTo?: Cast | { fid?: number; hash: string },
    embeds?: string[]
  ): Promise<PostCastResponseCast> {
    const body: PostCastReqBody = {
      signer_uuid: signerUuid,
      text: text,
      embeds: embeds !== undefined ? [{ url: embeds[0] }] : undefined,
      parent: replyTo !== undefined ? replyTo.hash : undefined,
    };
    const response = await this.apis.cast.postCast(body);
    return response.data.cast;
  }

  /**
   * Delete a cast
   */
  public async deleteCast(
    signerUuid: string,
    castOrCastHash: Cast | string
  ): Promise<void> {
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    const body: DeleteCastReqBody = {
      signer_uuid: signerUuid,
      target_hash: castHash,
    };
    await this.apis.cast.deleteCast(body);
  }

  /**
   * React to a cast
   */
  public async reactToCast(
    signerUuid: string,
    reaction: ReactionType,
    castOrCastHash: Cast | string
  ): Promise<OperationResponse> {
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    const body: ReactionReqBody = {
      signer_uuid: signerUuid,
      reaction_type: reaction,
      target: castHash,
    };
    const response = await this.apis.reaction.postReaction(body);
    return response.data;
  }

  /**
   * Remove a reaction to a cast
   */
  public async removeReactionToCast(
    signerUuid: string,
    reaction: ReactionType,
    castOrCastHash: Cast | string
  ): Promise<OperationResponse> {
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    const body: ReactionReqBody = {
      signer_uuid: signerUuid,
      reaction_type: reaction,
      target: castHash,
    };
    const response = await this.apis.reaction.deleteReaction(body);
    return response.data;
  }

  /**
   * Follow a user
   */
  public async followUser(
    signerUuid: string,
    user: { fid: number }
  ): Promise<BulkFollowResponse> {
    const body: FollowReqBody = {
      signer_uuid: signerUuid,
      target_fids: [user.fid],
    };
    const response = await this.apis.follow.followUser(body);
    return response.data;
  }

  /**
   * Follow multiple users
   */
  public async followUsers(
    signerUuid: string,
    fids: number[]
  ): Promise<BulkFollowResponse> {
    const body: FollowReqBody = {
      signer_uuid: signerUuid,
      target_fids: fids,
    };
    const response = await this.apis.follow.followUser(body);
    return response.data;
  }

  /**
   * Unfollow a user
   */
  public async unfollowUser(
    signerUuid: string,
    user: { fid: number }
  ): Promise<BulkFollowResponse> {
    const body: FollowReqBody = {
      signer_uuid: signerUuid,
      target_fids: [user.fid],
    };
    const response = await this.apis.follow.unfollowUser(body);
    return response.data;
  }

  /**
   * Unfollow multiple users
   */
  public async unfollowUsers(
    signerUuid: string,
    fids: number[]
  ): Promise<BulkFollowResponse> {
    const body: FollowReqBody = {
      signer_uuid: signerUuid,
      target_fids: fids,
    };
    const response = await this.apis.follow.unfollowUser(body);
    return response.data;
  }
}
