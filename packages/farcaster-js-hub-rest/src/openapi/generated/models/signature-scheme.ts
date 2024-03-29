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
 * Type of signature scheme used to sign the Message hash - SIGNATURE_SCHEME_ED25519: Ed25519 signature (default)  - SIGNATURE_SCHEME_EIP712: ECDSA signature using EIP-712 scheme
 * @export
 * @enum {string}
 */

export enum SignatureScheme {
    Ed25519 = 'SIGNATURE_SCHEME_ED25519',
    Eip712 = 'SIGNATURE_SCHEME_EIP712'
}



