/* tslint:disable */
/* eslint-disable */
/**
 * Farcaster API V2
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface AddVerificationReqBody
 */
export interface AddVerificationReqBody {
    /**
     * UUID of the signer
     * @type {string}
     * @memberof AddVerificationReqBody
     */
    'signer_uuid': string;
    /**
     * Ethereum address
     * @type {string}
     * @memberof AddVerificationReqBody
     */
    'address': string;
    /**
     * 
     * @type {string}
     * @memberof AddVerificationReqBody
     */
    'block_hash': string;
    /**
     * 
     * @type {string}
     * @memberof AddVerificationReqBody
     */
    'eth_signature': string;
}

