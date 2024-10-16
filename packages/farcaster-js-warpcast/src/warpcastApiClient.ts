import axios, { type AxiosInstance } from 'axios';
import { Configuration, Conversation, ConversationDetails, ConversationMessage, DirectCastsApi, User, UsersApi } from './index.js';
import { Logger, silentLogger } from './logger.js';

export interface WarpcastAPIClientConfig {
  axiosInstance?: AxiosInstance
  hubUrl?: string
  logger?: Logger
}

export const WARPCAST_API_URL = 'https://client.warpcast.com';

export class WarpcastAPIClient {
  private readonly logger: Logger;

  public readonly apis: {
    directCasts: DirectCastsApi
    users: UsersApi
  };

  constructor(authToken: string, {
    axiosInstance,
    logger = silentLogger,
  }: WarpcastAPIClientConfig = {}) {
    this.logger = logger;

    if (axiosInstance === undefined) {
      axiosInstance = axios.create();
    }
    axiosInstance.defaults.decompress = true;
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${authToken}`;

    const config: Configuration = new Configuration({ basePath: WARPCAST_API_URL });
    this.apis = {
      directCasts: new DirectCastsApi(config, undefined, axiosInstance),
      users: new UsersApi(config, undefined, axiosInstance),
    };
  }

  public async getCurrentUser(): Promise<User> {
    const onboardingState = await this.apis.users.v2OnboardingStateGet();
    return onboardingState.data.result.state.user;
  }

  public async getUserByFid(fid: number): Promise<User> {
    const response = await this.apis.users.v2UserGet({ fid });
    return response.data.result.user;
  }

  public async * listConversations(): AsyncGenerator<Conversation, void, undefined> {
    let cursor: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.directCasts.v2DirectCastConversationListGet({ cursor });
      yield * response.data.result.conversations;

      // prep for next page
      if (response.data.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.next.cursor;
    }
  }

  /**
   * Get the details of a conversation.
   *
   * Be aware that the `messages` field is paginated by the server.
   * To iterate through all messages, see `listConversationMessages`.
   * @param conversationId The ID of the conversation
   */
  public async getConversationDetails(conversationId: string): Promise<ConversationDetails> {
    const response = await this.apis.directCasts.v2DirectCastConversationDetailsGet({ conversationId });
    return response.data.result;
  }

  /**
   * Paginates through all messages of a given conversation.
   * The server will return messages in reverse-chronological order (most recent messages first).
   * @param conversationId The ID of the conversation
   */
  public async * listConversationMessages(conversationId: string): AsyncGenerator<ConversationMessage, void, undefined> {
    let cursor: string | undefined;

    while (true) {
      // fetch one page
      const response = await this.apis.directCasts.v2DirectCastConversationDetailsGet({ conversationId, cursor });
      if (response.data.result.messages !== undefined) {
        yield * response.data.result.messages;
      }

      // prep for next page
      if (response.data.next?.cursor === undefined) {
        break;
      }
      cursor = response.data.next.cursor;
    }
  }
}
