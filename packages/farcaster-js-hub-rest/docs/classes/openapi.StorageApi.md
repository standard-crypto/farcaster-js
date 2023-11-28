[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / StorageApi

# Class: StorageApi

[openapi](../modules/openapi.md).StorageApi

StorageApi - object-oriented interface

**`Export`**

## Hierarchy

- `BaseAPI`

  ↳ **`StorageApi`**

## Table of contents

### Constructors

- [constructor](openapi.StorageApi.md#constructor)

### Properties

- [axios](openapi.StorageApi.md#axios)
- [basePath](openapi.StorageApi.md#basepath)
- [configuration](openapi.StorageApi.md#configuration)

### Methods

- [getStorageLimitsByFid](openapi.StorageApi.md#getstoragelimitsbyfid)

## Constructors

### constructor

• **new StorageApi**(`configuration?`, `basePath?`, `axios?`): [`StorageApi`](openapi.StorageApi.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `configuration?` | [`Configuration`](openapi.Configuration.md) | `undefined` |
| `basePath` | `string` | `BASE_PATH` |
| `axios` | `AxiosInstance` | `globalAxios` |

#### Returns

[`StorageApi`](openapi.StorageApi.md)

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

### getStorageLimitsByFid

▸ **getStorageLimitsByFid**(`requestParameters`, `options?`): `Promise`\<`AxiosResponse`\<[`StorageLimitsResponse`](../interfaces/openapi.StorageLimitsResponse.md), `any`\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`StorageApiGetStorageLimitsByFidRequest`](../interfaces/openapi.StorageApiGetStorageLimitsByFidRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`\<`any`\> | Override http request option. |

#### Returns

`Promise`\<`AxiosResponse`\<[`StorageLimitsResponse`](../interfaces/openapi.StorageLimitsResponse.md), `any`\>\>

**`Summary`**

Get an FID\'s storage limits.

**`Throws`**

**`Memberof`**

StorageApi

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/storage-api.ts:144](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/storage-api.ts#L144)
