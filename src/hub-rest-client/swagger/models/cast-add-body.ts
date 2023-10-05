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


// May contain unused imports in some cases
// @ts-ignore
import { CastId } from './cast-id';
// May contain unused imports in some cases
// @ts-ignore
import { Embed } from './embed';

/**
 * 
 * @export
 * @interface CastAddBody
 */
export interface CastAddBody {
    /**
     * 
     * @type {Array<string>}
     * @memberof CastAddBody
     */
    'embedsDeprecated'?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof CastAddBody
     */
    'mentions'?: Array<string>;
    /**
     * 
     * @type {CastId}
     * @memberof CastAddBody
     */
    'parentCastId'?: CastId;
    /**
     * 
     * @type {string}
     * @memberof CastAddBody
     */
    'parentUrl'?: string;
    /**
     * 
     * @type {string}
     * @memberof CastAddBody
     */
    'text'?: string;
    /**
     * 
     * @type {Array<number>}
     * @memberof CastAddBody
     */
    'mentionsPositions'?: Array<number>;
    /**
     * 
     * @type {Array<Embed>}
     * @memberof CastAddBody
     */
    'embeds'?: Array<Embed>;
}

