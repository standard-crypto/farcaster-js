/* tslint:disable */
/* eslint-disable */
/**
 * Merkle API
 * API documentation for all publicly exposed APIs provided by Merkle Manufactory, Inc for Farcaster V2.
 *
 * OpenAPI spec version: 2.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { InlineResponse2001Next } from "./inline-response2001-next";
import { InlineResponse2007Result } from "./inline-response2007-result";
/**
 *
 * @export
 * @interface InlineResponse2007
 */
export interface InlineResponse2007 {
  /**
   *
   * @type {InlineResponse2007Result}
   * @memberof InlineResponse2007
   */
  result: InlineResponse2007Result;
  /**
   *
   * @type {InlineResponse2001Next}
   * @memberof InlineResponse2007
   */
  next?: InlineResponse2001Next;
}
