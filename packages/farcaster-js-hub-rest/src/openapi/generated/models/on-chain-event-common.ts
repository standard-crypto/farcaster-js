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



/**
 * 
 * @export
 * @interface OnChainEventCommon
 */
export interface OnChainEventCommon {
    /**
     * 
     * @type {string}
     * @memberof OnChainEventCommon
     */
    'type': string;
    /**
     * 
     * @type {number}
     * @memberof OnChainEventCommon
     */
    'chainId': number;
    /**
     * 
     * @type {number}
     * @memberof OnChainEventCommon
     */
    'blockNumber': number;
    /**
     * 
     * @type {string}
     * @memberof OnChainEventCommon
     */
    'blockHash': string;
    /**
     * 
     * @type {number}
     * @memberof OnChainEventCommon
     */
    'blockTimestamp': number;
    /**
     * 
     * @type {string}
     * @memberof OnChainEventCommon
     */
    'transactionHash': string;
    /**
     * 
     * @type {number}
     * @memberof OnChainEventCommon
     */
    'logIndex': number;
    /**
     * 
     * @type {number}
     * @memberof OnChainEventCommon
     */
    'txIndex': number;
    /**
     * 
     * @type {number}
     * @memberof OnChainEventCommon
     */
    'fid': number;
}
