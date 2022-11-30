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
import { Def18 } from "./def18";
import { Def2 } from "./def2";
import { Def52 } from "./def52";
/**
 *
 * @export
 * @interface Def59
 */
export interface Def59 {
  /**
   *
   * @type {string}
   * @memberof Def59
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Def59
   */
  type: string;
  /**
   *
   * @type {Def18}
   * @memberof Def59
   */
  latestTimestamp: Def18;
  /**
   *
   * @type {Def2}
   * @memberof Def59
   */
  totalItemCount: Def2;
  /**
   *
   * @type {Array<Def52>}
   * @memberof Def59
   */
  previewItems: Array<Def52>;
}
