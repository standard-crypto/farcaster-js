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
import { Def12 } from "./def12";
import { Def13 } from "./def13";
import { Def17 } from "./def17";
import { Def18 } from "./def18";
import { Def2 } from "./def2";
import { Def26 } from "./def26";
import { UserProfile } from "./UserProfile";
import { UserViewerContext } from "./UserViewerContext";
/**
 *
 * @export
 * @interface Def27
 */
export interface User {
  /**
   *
   * @type {Def12}
   * @memberof Def27
   */
  fid: Def12;
  /**
   *
   * @type {Def13}
   * @memberof Def27
   */
  username?: Def13;
  /**
   *
   * @type {Def17}
   * @memberof Def27
   */
  displayName?: Def17;
  /**
   *
   * @type {Def18}
   * @memberof Def27
   */
  registeredAt?: Def18;
  /**
   *
   * @type {Def26}
   * @memberof Def27
   */
  pfp?: Def26;
  /**
   *
   * @type {UserProfile}
   * @memberof Def27
   */
  profile?: UserProfile;
  /**
   *
   * @type {Def2}
   * @memberof Def27
   */
  followerCount: Def2;
  /**
   *
   * @type {Def2}
   * @memberof Def27
   */
  followingCount: Def2;
  /**
   *
   * @type {Def13}
   * @memberof Def27
   */
  referrerUsername?: Def13;
  /**
   *
   * @type {UserViewerContext}
   * @memberof Def27
   */
  viewerContext?: UserViewerContext;
}
