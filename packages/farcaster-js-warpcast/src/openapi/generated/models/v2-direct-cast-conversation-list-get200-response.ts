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
import { Pagination } from './pagination.js';
// May contain unused imports in some cases
// @ts-ignore
import { V2DirectCastConversationListGet200ResponseResult } from './v2-direct-cast-conversation-list-get200-response-result.js';

/**
 * 
 * @export
 * @interface V2DirectCastConversationListGet200Response
 */
export interface V2DirectCastConversationListGet200Response {
    /**
     * 
     * @type {V2DirectCastConversationListGet200ResponseResult}
     * @memberof V2DirectCastConversationListGet200Response
     */
    'result': V2DirectCastConversationListGet200ResponseResult;
    /**
     * 
     * @type {Pagination}
     * @memberof V2DirectCastConversationListGet200Response
     */
    'next'?: Pagination;
}

