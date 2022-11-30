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
import { User } from "./User";
import { Def43 } from "./def43";
/**
 *
 * @export
 * @interface Def44
 */
export interface Def44 {
  /**
   *
   * @type {string}
   * @memberof Def44
   */
  conversationId: string;
  /**
   *
   * @type {Array<User>}
   * @memberof Def44
   */
  participants: Array<User>;
  /**
   *
   * @type {Def43}
   * @memberof Def44
   */
  lastDirectCast: Def43;
  /**
   *
   * @type {Def18}
   * @memberof Def44
   */
  timestamp: Def18;
}
