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
import { Conversation } from './conversation.js';

/**
 * 
 * @export
 * @interface V2DirectCastConversationListGet200ResponseResult
 */
export interface V2DirectCastConversationListGet200ResponseResult {
    /**
     * 
     * @type {boolean}
     * @memberof V2DirectCastConversationListGet200ResponseResult
     */
    'hasArchived': boolean;
    /**
     * 
     * @type {Array<Conversation>}
     * @memberof V2DirectCastConversationListGet200ResponseResult
     */
    'conversations': Array<Conversation>;
}

