import {
  CastApi,
  SignerApi,
  Signer,
  Cast,
  CastParamType,
  PostCastResponseCast,
  DeleteCastReqBody,
  ReactionApi,
  ReactionReqBody,
  ReactionType,
  OperationResponse,
  FollowApi,
  FollowReqBody,
  BulkFollowResponse,
  EmbeddedCast,
  Configuration,
  ErrorRes,
  FeedApi,
  UserApi,
  SignerApiRegisterSignedKeyRequest,
  CastApiPostCastRequest,
  CastWithInteractions,
  SearchedUser,
} from "./openapi";
import axios, { AxiosError, AxiosInstance } from "axios";
import { silentLogger, Logger } from "../../common/logger";
import type { SetRequired } from "type-fest";

const BASE_PATH = "https://api.neynar.com/v2";

export class NeynarV2APIClient {
  private readonly logger: Logger;

  public readonly apis: {
    signer: SignerApi;
    feed: FeedApi;
    cast: CastApi;
    user: UserApi;
    reaction: ReactionApi;
    follow: FollowApi;
  };

  /**
   * Instantiates a NeynarV1APIClient
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

    if (apiKey === "") {
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
      signer: new SignerApi(config, undefined, axiosInstance),
      feed: new FeedApi(config, undefined, axiosInstance),
      cast: new CastApi(config, undefined, axiosInstance),
      user: new UserApi(config, undefined, axiosInstance),
      reaction: new ReactionApi(config, undefined, axiosInstance),
      follow: new FollowApi(config, undefined, axiosInstance),
    };
  }

  /**
   * Utility for parsing errors returned by the Neynar API servers. Returns true
   * if the given error is caused by an error response from the server, and
   * narrows the type of `error` accordingly.
   */
  public static isApiErrorResponse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
  ): error is SetRequired<AxiosError<ErrorRes>, "response"> {
    if (!(error instanceof AxiosError)) return false;
    return (
      error.response?.data !== undefined && "message" in error.response.data
    );
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
  public async fetchSigner(signerUuid: string): Promise<Signer | null> {
    try {
      const response = await this.apis.signer.signer({ signerUuid });
      return response.data;
    } catch (error) {
      if (NeynarV2APIClient.isApiErrorResponse(error)) {
        const status = error.response.status;
        if (status === 404) {
          return null;
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
    const request: SignerApiRegisterSignedKeyRequest = {
      registerSignerKeyReqBody: {
        signer_uuid: signerUuid,
        app_fid: fid,
        deadline: deadline,
        signature: signature,
      },
    };
    const response = await this.apis.signer.registerSignedKey(request);
    return response.data;
  }

  /**
   * Get reverse chronological feed for a user based on their follow graph. See [Neynar documentation](https://docs.neynar.com/reference/get-feed)
   */
  public async *fetchFeed(
    fid: number,
    options?: {
      feedType?: "filter" | "following";
      filterType?: "fids" | "parent_url";
      fids?: string;
      parentUrl?: string;
      pageSize?: number;
    }
  ): AsyncGenerator<CastWithInteractions, void, undefined> {
    let cursor: string | undefined;

    while (true) {
      const response = await this.apis.feed.feed({
        feedType: options?.feedType,
        filterType: options?.filterType,
        fid: fid,
        fids: options?.fids,
        parentUrl: options?.parentUrl,
        cursor: cursor,
        limit: options?.pageSize,
      });

      // yield current page of casts
      yield* response.data.casts;

      // prep for next page
      if (response.data.next.cursor === null) {
        break;
      }
      cursor = response.data.next.cursor;
    }
  }

  /**
   * Gets information about an individual cast. See [Neynar documentation](https://docs.neynar.com/reference/get-cast)
   */
  public async fetchCast(castOrCastHash: Cast | string): Promise<Cast | null> {
    let castHash: string;
    if (typeof castOrCastHash === "string") {
      castHash = castOrCastHash;
    } else {
      castHash = castOrCastHash.hash;
    }
    try {
      const response = await this.apis.cast.cast({
        type: CastParamType.Hash,
        identifier: castHash,
      });
      return response.data.cast;
    } catch (error) {
      if (NeynarV2APIClient.isApiErrorResponse(error)) {
        const status = error.response.status;
        if (status === 404) {
          return null;
        }
      }
      throw error;
    }
  }

  /**
   * Gets information about an array of casts. See [Neynar documentation](https://docs.neynar.com/reference/get-array-of-casts)
   */
  public async fetchCasts(castHashes: string[]): Promise<Cast[] | null> {
    try {
      const response = await this.apis.cast.casts({
        getCastsReqBody: {
          casts: castHashes.map((hash) => ({ hash })),
        },
      });
      return response.data.result.casts;
    } catch (error) {
      if (NeynarV2APIClient.isApiErrorResponse(error)) {
        const status = error.response.status;
        if (status === 404) {
          return null;
        }
      }
      throw error;
    }
  }

  /**
   * Publishes a cast for the currently authenticated user. See [Neynar documentation](https://docs.neynar.com/reference/post-a-cast)
   */
  public async publishCast(
    signerUuid: string,
    text: string,
    options?: { embeds?: EmbeddedCast[]; replyTo?: string }
  ): Promise<PostCastResponseCast> {
    const request: CastApiPostCastRequest = {
      postCastReqBody: {
        signer_uuid: signerUuid,
        text: text,
        embeds: options?.embeds,
        parent: options?.replyTo,
      },
    };
    const response = await this.apis.cast.postCast(request);
    return response.data.cast;
  }

  /**
   * Delete a cast. See [Neynar documentation](https://docs.neynar.com/reference/delete-a-cast)
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
    await this.apis.cast.deleteCast({ deleteCastReqBody: body });
  }

  /**
   * Search for Usernames. See [Neynar documentation](https://docs.neynar.com/reference/search-usernames)
   */
  public async searchUsernames(
    query: string,
    viewerFid: number
  ): Promise<SearchedUser[] | null> {
    const response = await this.apis.user.userSearch({
      q: query,
      viewerFid: viewerFid,
    });
    return response.data.result.users;
  }

  /**
   * Update User Profile. See [Neynar documentation](https://docs.neynar.com/reference/update-user-profile)
   */
  public async updateUserProfile(
    signerUuid: string,
    updates: {
      bio?: string;
      pfp_url?: string;
      url?: string;
      username?: string;
      display_name?: string;
    }
  ): Promise<OperationResponse | null> {
    const response = await this.apis.user.updateUser({
      updateUserReqBody: {
        signer_uuid: signerUuid,
        bio: updates.bio,
        pfp_url: updates.pfp_url,
        url: updates.url,
        username: updates.username,
        display_name: updates.display_name,
      },
    });
    return response.data;
  }

  /**
   * React to a cast. See [Neynar documentation](https://docs.neynar.com/reference/post-a-reaction)
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
    const response = await this.apis.reaction.postReaction({
      reactionReqBody: body,
    });
    return response.data;
  }

  /**
   * Remove a reaction to a cast. See [Neynar documentation](https://docs.neynar.com/reference/delete-a-reaction)
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
    const response = await this.apis.reaction.deleteReaction({
      reactionReqBody: body,
    });
    return response.data;
  }

  /**
   * Follow users. See [Neynar documentation](https://docs.neynar.com/reference/follow-a-user)
   */
  public async followUsers(
    signerUuid: string,
    fids: number[]
  ): Promise<BulkFollowResponse> {
    const body: FollowReqBody = {
      signer_uuid: signerUuid,
      target_fids: fids,
    };
    const response = await this.apis.follow.followUser({ followReqBody: body });
    return response.data;
  }

  /**
   * Unfollow users. See [Neynar documentation](https://docs.neynar.com/reference/unfollow-a-user)
   */
  public async unfollowUsers(
    signerUuid: string,
    fids: number[]
  ): Promise<BulkFollowResponse> {
    const body: FollowReqBody = {
      signer_uuid: signerUuid,
      target_fids: fids,
    };
    const response = await this.apis.follow.unfollowUser({
      followReqBody: body,
    });
    return response.data;
  }
}
