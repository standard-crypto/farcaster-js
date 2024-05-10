/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/v2/direct-cast-conversation-list": {
    get: {
      responses: {
        /** @description List of conversations */
        200: {
          content: {
            "application/json": {
              result: {
                hasArchived: boolean;
                conversations: components["schemas"]["Conversation"][];
              };
            };
          };
        };
      };
    };
  };
  "/v2/direct-cast-conversation": {
    get: {
      parameters: {
        query: {
          conversationId: string;
        };
      };
      responses: {
        /** @description Overview of a conversation */
        200: {
          content: {
            "application/json": {
              result: {
                conversation: components["schemas"]["Conversation"];
              };
            };
          };
        };
      };
    };
  };
  "/v2/direct-cast-conversation-details": {
    get: {
      parameters: {
        query: {
          conversationId: string;
          limit?: string;
        };
      };
      responses: {
        /** @description Conversation Details */
        200: {
          content: {
            "application/json": {
              result: components["schemas"]["ConversationDetails"];
            };
          };
        };
      };
    };
  };
  "/v2/user": {
    get: {
      parameters: {
        query: {
          fid: number;
        };
      };
      responses: {
        /** @description User details */
        200: {
          content: {
            "application/json": {
              result: {
                user: components["schemas"]["User"];
                collectionsOwned: components["schemas"]["Collection"][];
                extras: {
                  fid?: components["schemas"]["Fid"];
                  custodyAddress?: components["schemas"]["Address"];
                };
              };
            };
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** @example 0xefcbf0a3c475780a4ed25158e35f528d929c9a23 */
    Address: string;
    Collection: Record<string, never>;
    Conversation: {
      /** @example 347-69 */
      conversationId: string;
      adminFids: components["schemas"]["Fid"][];
      removedFids: components["schemas"]["Fid"][];
      participants: components["schemas"]["User"][];
      lastReadTime: components["schemas"]["EpochMilliseconds"];
      selfLastReadTime: components["schemas"]["EpochMilliseconds"];
      lastMessage: components["schemas"]["ConversationMessage"];
      isGroup: boolean;
      isCollectionTokenGated: boolean;
      unreadCount: number;
      muted: boolean;
      hasMention: boolean;
      viewerContext: {
        category: string;
        archived: boolean;
        muted: boolean;
        unreadCount: number;
        unreadMentionsCount: number;
      };
    };
    ConversationDetails: {
      /** @example 580-50 */
      conversationId: string;
      muted: boolean;
      adminFids: components["schemas"]["Fid"][];
      removedFids: components["schemas"]["Fid"][];
      participants: components["schemas"]["User"][];
      lastReadTime: number;
      hasMention: boolean;
      messages: components["schemas"]["ConversationMessage"][];
    };
    ConversationMessage: {
      /** @example 680-69 */
      conversationId: string;
      senderFid: components["schemas"]["Fid"];
      /** @example 1f391f8873f9a404f35d87ee31ffecad */
      messageId: string;
      serverTimestamp: components["schemas"]["EpochMilliseconds"];
      /** @example text */
      type: string;
      /** @example message contents */
      message: string;
      hasMention?: boolean;
      reactions: components["schemas"]["Reaction"][];
    };
    /** @example 347 */
    Fid: number;
    /** @example 1715285986098 */
    EpochMilliseconds: number;
    Reaction: Record<string, never>;
    User: {
      fid: components["schemas"]["Fid"];
      /** @example gavi */
      username: string;
      /** @example Gavi Galloway */
      displayName: string;
      pfp: {
        /** Format: uri */
        url: string;
        verified: boolean;
      };
      profile: {
        bio: {
          text: string;
          mentions: string;
        };
        location: {
          placeId: string;
          description: string;
        };
      };
      followerCount: number;
      followingCount: number;
      activeOnFcNetwork: boolean;
      referrerUsername: string;
      viewerContext: {
        following: boolean;
        followedBy: boolean;
        enableNotifications: boolean;
      };
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
