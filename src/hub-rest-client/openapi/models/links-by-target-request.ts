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
 * @interface LinksByTargetRequest
 */
export interface LinksByTargetRequest {
    /**
     * 
     * @type {string}
     * @memberof LinksByTargetRequest
     */
    'targetFid'?: string;
    /**
     * 
     * @type {string}
     * @memberof LinksByTargetRequest
     */
    'linkType'?: string;
    /**
     * 
     * @type {number}
     * @memberof LinksByTargetRequest
     */
    'pageSize'?: number;
    /**
     * 
     * @type {string}
     * @memberof LinksByTargetRequest
     */
    'pageToken'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof LinksByTargetRequest
     */
    'reverse'?: boolean;
}
