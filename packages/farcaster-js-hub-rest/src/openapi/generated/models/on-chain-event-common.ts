/* tslint:disable */
/* eslint-disable */
/**
 * Farcaster Hub REST API
 * Perform basic queries of Farcaster state via the REST API of a Farcaster hub. See the [Farcaster docs](https://www.thehubble.xyz/docs/httpapi/httpapi.html) for more details. Some client libraries:   - [TypeScript](https://www.npmjs.com/package/@standard-crypto/farcaster-js-hub-rest) 
 *
 * The version of the OpenAPI document: 1.0
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

