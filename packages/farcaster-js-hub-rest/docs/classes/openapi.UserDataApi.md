[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / UserDataApi

# Class: UserDataApi

[openapi](../modules/openapi.md).UserDataApi

UserDataApi - object-oriented interface

**`Export`**

## Hierarchy

- `BaseAPI`

  ↳ **`UserDataApi`**

## Table of contents

### Constructors

- [constructor](openapi.UserDataApi.md#constructor)

### Properties

- [axios](openapi.UserDataApi.md#axios)
- [basePath](openapi.UserDataApi.md#basepath)
- [configuration](openapi.UserDataApi.md#configuration)

### Methods

- [getUserDataByFid](openapi.UserDataApi.md#getuserdatabyfid)

## Constructors

### constructor

• **new UserDataApi**(`configuration?`, `basePath?`, `axios?`): [`UserDataApi`](openapi.UserDataApi.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `configuration?` | [`Configuration`](openapi.Configuration.md) | `undefined` |
| `basePath` | `string` | `BASE_PATH` |
| `axios` | `AxiosInstance` | `globalAxios` |

#### Returns

[`UserDataApi`](openapi.UserDataApi.md)

#### Inherited from

BaseAPI.constructor

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/base.ts:53](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/base.ts#L53)

## Properties

### axios

• `Protected` **axios**: `AxiosInstance` = `globalAxios`

#### Inherited from

BaseAPI.axios

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/base.ts:53](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/base.ts#L53)

___

### basePath

• `Protected` **basePath**: `string` = `BASE_PATH`

#### Inherited from

BaseAPI.basePath

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/base.ts:53](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/base.ts#L53)

___

### configuration

• `Protected` **configuration**: `undefined` \| [`Configuration`](openapi.Configuration.md)

#### Inherited from

BaseAPI.configuration

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/base.ts:51](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/base.ts#L51)

## Methods

### getUserDataByFid

▸ **getUserDataByFid**(`requestParameters`, `options?`): `Promise`\<`AxiosResponse`\<[`GetUserDataByFid200Response`](../modules/openapi.md#getuserdatabyfid200response), `any`\>\>

**Note:** one of two different response schemas is returned based on whether the caller provides the `user_data_type` parameter. If included, a single `UserDataAdd` message is returned (or a `not_found` error). If omitted, a paginated list of `UserDataAdd` messages is returned instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`UserDataApiGetUserDataByFidRequest`](../interfaces/openapi.UserDataApiGetUserDataByFidRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`\<`any`\> | Override http request option. |

#### Returns

`Promise`\<`AxiosResponse`\<[`GetUserDataByFid200Response`](../modules/openapi.md#getuserdatabyfid200response), `any`\>\>

**`Summary`**

Get UserData for a FID.

**`Throws`**

**`Memberof`**

UserDataApi

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts:198](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts#L198)
