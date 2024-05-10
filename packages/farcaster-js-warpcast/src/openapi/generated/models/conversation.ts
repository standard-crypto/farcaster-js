/* tslint:disable */
/* eslint-disable */
/**
 * Warpcast API
 * Private API used by the Warpcast client
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { ConversationMessage } from './conversation-message.js';
// May contain unused imports in some cases
// @ts-ignore
import { ConversationViewerContext } from './conversation-viewer-context.js';
// May contain unused imports in some cases
// @ts-ignore
import { User } from './user.js';

/**
 * 
 * @export
 * @interface Conversation
 */
export interface Conversation {
    /**
     * 
     * @type {string}
     * @memberof Conversation
     */
    'conversationId': string;
    /**
     * 
     * @type {Array<number>}
     * @memberof Conversation
     */
    'adminFids': Array<number>;
    /**
     * 
     * @type {Array<number>}
     * @memberof Conversation
     */
    'removedFids': Array<number>;
    /**
     * 
     * @type {Array<User>}
     * @memberof Conversation
     */
    'participants': Array<User>;
    /**
     * 
     * @type {number}
     * @memberof Conversation
     */
    'lastReadTime': number;
    /**
     * 
     * @type {number}
     * @memberof Conversation
     */
    'selfLastReadTime': number;
    /**
     * 
     * @type {ConversationMessage}
     * @memberof Conversation
     */
    'lastMessage': ConversationMessage;
    /**
     * 
     * @type {boolean}
     * @memberof Conversation
     */
    'isGroup': boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Conversation
     */
    'isCollectionTokenGated': boolean;
    /**
     * 
     * @type {number}
     * @memberof Conversation
     */
    'unreadCount': number;
    /**
     * 
     * @type {boolean}
     * @memberof Conversation
     */
    'muted': boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Conversation
     */
    'hasMention': boolean;
    /**
     * 
     * @type {ConversationViewerContext}
     * @memberof Conversation
     */
    'viewerContext': ConversationViewerContext;
}

