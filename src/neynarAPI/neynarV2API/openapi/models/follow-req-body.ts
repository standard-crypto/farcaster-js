/* tslint:disable */
/* eslint-disable */
/**
 * v2 Farcaster
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
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
 * @interface FollowReqBody
 */
export interface FollowReqBody {
  /**
   * UUID of the signer
   * @type {string}
   * @memberof FollowReqBody
   */
  signer_uuid: string;
  /**
   *
   * @type {Array<number>}
   * @memberof FollowReqBody
   */
  target_fids: Array<number>;
}
