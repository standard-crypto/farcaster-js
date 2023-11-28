[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / InfoApi

# Class: InfoApi

[openapi](../modules/openapi.md).InfoApi

InfoApi - object-oriented interface

**`Export`**

## Hierarchy

- `BaseAPI`

  ↳ **`InfoApi`**

## Table of contents

### Constructors

- [constructor](openapi.InfoApi.md#constructor)

### Properties

- [axios](openapi.InfoApi.md#axios)
- [basePath](openapi.InfoApi.md#basepath)
- [configuration](openapi.InfoApi.md#configuration)

### Methods

- [getInfo](openapi.InfoApi.md#getinfo)

## Constructors

### constructor

• **new InfoApi**(`configuration?`, `basePath?`, `axios?`): [`InfoApi`](openapi.InfoApi.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `configuration?` | [`Configuration`](openapi.Configuration.md) | `undefined` |
| `basePath` | `string` | `BASE_PATH` |
| `axios` | `AxiosInstance` | `globalAxios` |

#### Returns

[`InfoApi`](openapi.InfoApi.md)

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

### getInfo

▸ **getInfo**(`requestParameters`, `options?`): `Promise`\<`AxiosResponse`\<[`HubInfoResponse`](../interfaces/openapi.HubInfoResponse.md), `any`\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`InfoApiGetInfoRequest`](../interfaces/openapi.InfoApiGetInfoRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`\<`any`\> | Override http request option. |

#### Returns

`Promise`\<`AxiosResponse`\<[`HubInfoResponse`](../interfaces/openapi.HubInfoResponse.md), `any`\>\>

**`Summary`**

Sync Methods

**`Throws`**

**`Memberof`**

InfoApi

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/info-api.ts:144](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/info-api.ts#L144)
