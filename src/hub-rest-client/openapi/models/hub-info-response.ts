/* tslint:disable */
/* eslint-disable */
/**
 * Farcaster Hub REST API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { DbStats } from './db-stats';

/**
 * 
 * @export
 * @interface HubInfoResponse
 */
export interface HubInfoResponse {
    /**
     * 
     * @type {string}
     * @memberof HubInfoResponse
     */
    'version': string;
    /**
     * 
     * @type {boolean}
     * @memberof HubInfoResponse
     */
    'isSyncing': boolean;
    /**
     * 
     * @type {string}
     * @memberof HubInfoResponse
     */
    'nickname': string;
    /**
     * 
     * @type {string}
     * @memberof HubInfoResponse
     */
    'rootHash': string;
    /**
     * 
     * @type {DbStats}
     * @memberof HubInfoResponse
     */
    'dbStats'?: DbStats;
    /**
     * 
     * @type {string}
     * @memberof HubInfoResponse
     */
    'peerId': string;
    /**
     * 
     * @type {number}
     * @memberof HubInfoResponse
     */
    'hubOperatorFid': number;
}
