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
import { Def47Content } from "./def47-content";
/**
 *
 * @export
 * @interface Def47
 */
export interface Def47 {
  /**
   *
   * @type {string}
   * @memberof Def47
   */
  type: string;
  /**
   *
   * @type {string}
   * @memberof Def47
   */
  id: string;
  /**
   *
   * @type {Def18}
   * @memberof Def47
   */
  timestamp: Def18;
  /**
   *
   * @type {User}
   * @memberof Def47
   */
  actor: User;
  /**
   *
   * @type {Def47Content}
   * @memberof Def47
   */
  content: Def47Content;
}
