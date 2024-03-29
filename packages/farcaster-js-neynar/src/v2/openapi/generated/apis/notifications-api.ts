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


import type { Configuration } from '../configuration.js';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common.js';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base.js';
// @ts-ignore
import { ErrorRes } from '../models';
// @ts-ignore
import { NotificationsResponse } from '../models';
/**
 * NotificationsApi - axios parameter creator
 * @export
 */
export const NotificationsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Returns a list of notifications for a specific FID.
         * @summary Retrieve notifications for a given user
         * @param {number} fid 
         * @param {string} [cursor] Pagination cursor.
         * @param {number} [limit] Number of results to retrieve (default 25, max 50)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        notifications: async (fid: number, cursor?: string, limit?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'fid' is not null or undefined
            assertParamExists('notifications', 'fid', fid)
            const localVarPath = `/farcaster/notifications`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication ApiKeyAuth required
            await setApiKeyToObject(localVarHeaderParameter, "api_key", configuration)

            if (fid !== undefined) {
                localVarQueryParameter['fid'] = fid;
            }

            if (cursor !== undefined) {
                localVarQueryParameter['cursor'] = cursor;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * NotificationsApi - functional programming interface
 * @export
 */
export const NotificationsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = NotificationsApiAxiosParamCreator(configuration)
    return {
        /**
         * Returns a list of notifications for a specific FID.
         * @summary Retrieve notifications for a given user
         * @param {number} fid 
         * @param {string} [cursor] Pagination cursor.
         * @param {number} [limit] Number of results to retrieve (default 25, max 50)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async notifications(fid: number, cursor?: string, limit?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NotificationsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.notifications(fid, cursor, limit, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * NotificationsApi - factory interface
 * @export
 */
export const NotificationsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = NotificationsApiFp(configuration)
    return {
        /**
         * Returns a list of notifications for a specific FID.
         * @summary Retrieve notifications for a given user
         * @param {NotificationsApiNotificationsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        notifications(requestParameters: NotificationsApiNotificationsRequest, options?: AxiosRequestConfig): AxiosPromise<NotificationsResponse> {
            return localVarFp.notifications(requestParameters.fid, requestParameters.cursor, requestParameters.limit, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for notifications operation in NotificationsApi.
 * @export
 * @interface NotificationsApiNotificationsRequest
 */
export interface NotificationsApiNotificationsRequest {
    /**
     * 
     * @type {number}
     * @memberof NotificationsApiNotifications
     */
    readonly fid: number

    /**
     * Pagination cursor.
     * @type {string}
     * @memberof NotificationsApiNotifications
     */
    readonly cursor?: string

    /**
     * Number of results to retrieve (default 25, max 50)
     * @type {number}
     * @memberof NotificationsApiNotifications
     */
    readonly limit?: number
}

/**
 * NotificationsApi - object-oriented interface
 * @export
 * @class NotificationsApi
 * @extends {BaseAPI}
 */
export class NotificationsApi extends BaseAPI {
    /**
     * Returns a list of notifications for a specific FID.
     * @summary Retrieve notifications for a given user
     * @param {NotificationsApiNotificationsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NotificationsApi
     */
    public notifications(requestParameters: NotificationsApiNotificationsRequest, options?: AxiosRequestConfig) {
        return NotificationsApiFp(this.configuration).notifications(requestParameters.fid, requestParameters.cursor, requestParameters.limit, options).then((request) => request(this.axios, this.basePath));
    }
}
