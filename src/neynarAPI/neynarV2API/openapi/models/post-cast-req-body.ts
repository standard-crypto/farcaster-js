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

// May contain unused imports in some cases
// @ts-ignore
import { CastEmbeds } from "./cast-embeds";

/**
 *
 * @export
 * @interface PostCastReqBody
 */
export interface PostCastReqBody {
  /**
   * UUID of the signer
   * @type {string}
   * @memberof PostCastReqBody
   */
  signer_uuid: string;
  /**
   *
   * @type {string}
   * @memberof PostCastReqBody
   */
  text: string;
  /**
   *
   * @type {CastEmbeds}
   * @memberof PostCastReqBody
   */
  embeds?: CastEmbeds[];
  /**
   * Ethereum address
   * @type {string}
   * @memberof PostCastReqBody
   */
  parent?: string;
}
