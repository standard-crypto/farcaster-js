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
import { CastParamType } from '../models';
// @ts-ignore
import { CastResponse } from '../models';
// @ts-ignore
import { CastsResponse } from '../models';
// @ts-ignore
import { DeleteCastReqBody } from '../models';
// @ts-ignore
import { ErrorRes } from '../models';
// @ts-ignore
import { OperationResponse } from '../models';
// @ts-ignore
import { PostCastReqBody } from '../models';
// @ts-ignore
import { PostCastResponse } from '../models';
/**
 * CastApi - axios parameter creator
 * @export
 */
export const CastApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Gets information about an individual cast by passing in a Warpcast web URL or cast hash
         * @summary Retrieve cast for a given hash or Warpcast URL
         * @param {CastParamType} type 
         * @param {string} identifier Cast identifier (Its either a url or a hash)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cast: async (type: CastParamType, identifier: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'type' is not null or undefined
            assertParamExists('cast', 'type', type)
            // verify required parameter 'identifier' is not null or undefined
            assertParamExists('cast', 'identifier', identifier)
            const localVarPath = `/farcaster/cast`;
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

            if (type !== undefined) {
                localVarQueryParameter['type'] = type;
            }

            if (identifier !== undefined) {
                localVarQueryParameter['identifier'] = identifier;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Retrieve multiple casts using their respective hashes.
         * @summary Gets information about an array of casts
         * @param {string} casts Hashes of the cast to be retrieved (Comma separated)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        casts: async (casts: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'casts' is not null or undefined
            assertParamExists('casts', 'casts', casts)
            const localVarPath = `/farcaster/casts`;
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

            if (casts !== undefined) {
                localVarQueryParameter['casts'] = casts;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete an existing cast. \\ (In order to delete a cast `signer_uuid` must be approved) 
         * @summary Delete a cast
         * @param {DeleteCastReqBody} deleteCastReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteCast: async (deleteCastReqBody: DeleteCastReqBody, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'deleteCastReqBody' is not null or undefined
            assertParamExists('deleteCast', 'deleteCastReqBody', deleteCastReqBody)
            const localVarPath = `/farcaster/cast`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication ApiKeyAuth required
            await setApiKeyToObject(localVarHeaderParameter, "api_key", configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(deleteCastReqBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Posts a cast or cast reply. Works with mentions and embeds.   (In order to post a cast `signer_uuid` must be approved) 
         * @summary Posts a cast
         * @param {PostCastReqBody} postCastReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postCast: async (postCastReqBody: PostCastReqBody, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'postCastReqBody' is not null or undefined
            assertParamExists('postCast', 'postCastReqBody', postCastReqBody)
            const localVarPath = `/farcaster/cast`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication ApiKeyAuth required
            await setApiKeyToObject(localVarHeaderParameter, "api_key", configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(postCastReqBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CastApi - functional programming interface
 * @export
 */
export const CastApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CastApiAxiosParamCreator(configuration)
    return {
        /**
         * Gets information about an individual cast by passing in a Warpcast web URL or cast hash
         * @summary Retrieve cast for a given hash or Warpcast URL
         * @param {CastParamType} type 
         * @param {string} identifier Cast identifier (Its either a url or a hash)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async cast(type: CastParamType, identifier: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CastResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.cast(type, identifier, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Retrieve multiple casts using their respective hashes.
         * @summary Gets information about an array of casts
         * @param {string} casts Hashes of the cast to be retrieved (Comma separated)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async casts(casts: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CastsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.casts(casts, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Delete an existing cast. \\ (In order to delete a cast `signer_uuid` must be approved) 
         * @summary Delete a cast
         * @param {DeleteCastReqBody} deleteCastReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteCast(deleteCastReqBody: DeleteCastReqBody, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<OperationResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteCast(deleteCastReqBody, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Posts a cast or cast reply. Works with mentions and embeds.   (In order to post a cast `signer_uuid` must be approved) 
         * @summary Posts a cast
         * @param {PostCastReqBody} postCastReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async postCast(postCastReqBody: PostCastReqBody, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PostCastResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.postCast(postCastReqBody, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CastApi - factory interface
 * @export
 */
export const CastApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CastApiFp(configuration)
    return {
        /**
         * Gets information about an individual cast by passing in a Warpcast web URL or cast hash
         * @summary Retrieve cast for a given hash or Warpcast URL
         * @param {CastApiCastRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cast(requestParameters: CastApiCastRequest, options?: AxiosRequestConfig): AxiosPromise<CastResponse> {
            return localVarFp.cast(requestParameters.type, requestParameters.identifier, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve multiple casts using their respective hashes.
         * @summary Gets information about an array of casts
         * @param {CastApiCastsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        casts(requestParameters: CastApiCastsRequest, options?: AxiosRequestConfig): AxiosPromise<CastsResponse> {
            return localVarFp.casts(requestParameters.casts, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete an existing cast. \\ (In order to delete a cast `signer_uuid` must be approved) 
         * @summary Delete a cast
         * @param {CastApiDeleteCastRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteCast(requestParameters: CastApiDeleteCastRequest, options?: AxiosRequestConfig): AxiosPromise<OperationResponse> {
            return localVarFp.deleteCast(requestParameters.deleteCastReqBody, options).then((request) => request(axios, basePath));
        },
        /**
         * Posts a cast or cast reply. Works with mentions and embeds.   (In order to post a cast `signer_uuid` must be approved) 
         * @summary Posts a cast
         * @param {CastApiPostCastRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postCast(requestParameters: CastApiPostCastRequest, options?: AxiosRequestConfig): AxiosPromise<PostCastResponse> {
            return localVarFp.postCast(requestParameters.postCastReqBody, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for cast operation in CastApi.
 * @export
 * @interface CastApiCastRequest
 */
export interface CastApiCastRequest {
    /**
     * 
     * @type {CastParamType}
     * @memberof CastApiCast
     */
    readonly type: CastParamType

    /**
     * Cast identifier (Its either a url or a hash)
     * @type {string}
     * @memberof CastApiCast
     */
    readonly identifier: string
}

/**
 * Request parameters for casts operation in CastApi.
 * @export
 * @interface CastApiCastsRequest
 */
export interface CastApiCastsRequest {
    /**
     * Hashes of the cast to be retrieved (Comma separated)
     * @type {string}
     * @memberof CastApiCasts
     */
    readonly casts: string
}

/**
 * Request parameters for deleteCast operation in CastApi.
 * @export
 * @interface CastApiDeleteCastRequest
 */
export interface CastApiDeleteCastRequest {
    /**
     * 
     * @type {DeleteCastReqBody}
     * @memberof CastApiDeleteCast
     */
    readonly deleteCastReqBody: DeleteCastReqBody
}

/**
 * Request parameters for postCast operation in CastApi.
 * @export
 * @interface CastApiPostCastRequest
 */
export interface CastApiPostCastRequest {
    /**
     * 
     * @type {PostCastReqBody}
     * @memberof CastApiPostCast
     */
    readonly postCastReqBody: PostCastReqBody
}

/**
 * CastApi - object-oriented interface
 * @export
 * @class CastApi
 * @extends {BaseAPI}
 */
export class CastApi extends BaseAPI {
    /**
     * Gets information about an individual cast by passing in a Warpcast web URL or cast hash
     * @summary Retrieve cast for a given hash or Warpcast URL
     * @param {CastApiCastRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CastApi
     */
    public cast(requestParameters: CastApiCastRequest, options?: AxiosRequestConfig) {
        return CastApiFp(this.configuration).cast(requestParameters.type, requestParameters.identifier, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieve multiple casts using their respective hashes.
     * @summary Gets information about an array of casts
     * @param {CastApiCastsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CastApi
     */
    public casts(requestParameters: CastApiCastsRequest, options?: AxiosRequestConfig) {
        return CastApiFp(this.configuration).casts(requestParameters.casts, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Delete an existing cast. \\ (In order to delete a cast `signer_uuid` must be approved) 
     * @summary Delete a cast
     * @param {CastApiDeleteCastRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CastApi
     */
    public deleteCast(requestParameters: CastApiDeleteCastRequest, options?: AxiosRequestConfig) {
        return CastApiFp(this.configuration).deleteCast(requestParameters.deleteCastReqBody, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Posts a cast or cast reply. Works with mentions and embeds.   (In order to post a cast `signer_uuid` must be approved) 
     * @summary Posts a cast
     * @param {CastApiPostCastRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CastApi
     */
    public postCast(requestParameters: CastApiPostCastRequest, options?: AxiosRequestConfig) {
        return CastApiFp(this.configuration).postCast(requestParameters.postCastReqBody, options).then((request) => request(this.axios, this.basePath));
    }
}
