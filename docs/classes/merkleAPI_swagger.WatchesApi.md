[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [merkleAPI/swagger](../modules/merkleAPI_swagger.md) / WatchesApi

# Class: WatchesApi

[merkleAPI/swagger](../modules/merkleAPI_swagger.md).WatchesApi

WatchesApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](merkleAPI_swagger.BaseAPI.md)

  ↳ **`WatchesApi`**

## Table of contents

### Constructors

- [constructor](merkleAPI_swagger.WatchesApi.md#constructor)

### Properties

- [axios](merkleAPI_swagger.WatchesApi.md#axios)
- [basePath](merkleAPI_swagger.WatchesApi.md#basepath)
- [configuration](merkleAPI_swagger.WatchesApi.md#configuration)

### Methods

- [v2WatchedCastsDelete](merkleAPI_swagger.WatchesApi.md#v2watchedcastsdelete)
- [v2WatchedCastsPut](merkleAPI_swagger.WatchesApi.md#v2watchedcastsput)

## Constructors

### constructor

• **new WatchesApi**(`configuration?`, `basePath?`, `axios?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `configuration?` | [`Configuration`](merkleAPI_swagger.Configuration.md) | `undefined` |
| `basePath` | `string` | `BASE_PATH` |
| `axios` | `AxiosInstance` | `globalAxios` |

#### Inherited from

[BaseAPI](merkleAPI_swagger.BaseAPI.md).[constructor](merkleAPI_swagger.BaseAPI.md#constructor)

#### Defined in

[src/merkleAPI/swagger/base.ts:50](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L50)

## Properties

### axios

• `Protected` **axios**: `AxiosInstance` = `globalAxios`

#### Inherited from

[BaseAPI](merkleAPI_swagger.BaseAPI.md).[axios](merkleAPI_swagger.BaseAPI.md#axios)

#### Defined in

[src/merkleAPI/swagger/base.ts:53](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L53)

___

### basePath

• `Protected` **basePath**: `string` = `BASE_PATH`

#### Inherited from

[BaseAPI](merkleAPI_swagger.BaseAPI.md).[basePath](merkleAPI_swagger.BaseAPI.md#basepath)

#### Defined in

[src/merkleAPI/swagger/base.ts:52](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L52)

___

### configuration

• `Protected` **configuration**: `undefined` \| [`Configuration`](merkleAPI_swagger.Configuration.md)

#### Inherited from

[BaseAPI](merkleAPI_swagger.BaseAPI.md).[configuration](merkleAPI_swagger.BaseAPI.md#configuration)

#### Defined in

[src/merkleAPI/swagger/base.ts:48](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L48)

## Methods

### v2WatchedCastsDelete

▸ **v2WatchedCastsDelete**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

Unwatch a cast.

**`Throws`**

**`Memberof`**

WatchesApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2WatchedCastsBody1`](../interfaces/merkleAPI_swagger.V2WatchedCastsBody1.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/watches-api.ts:310](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/watches-api.ts#L310)

___

### v2WatchedCastsPut

▸ **v2WatchedCastsPut**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

Watch a cast.

**`Throws`**

**`Memberof`**

WatchesApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2WatchedCastsBody`](../interfaces/merkleAPI_swagger.V2WatchedCastsBody.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/watches-api.ts:327](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/watches-api.ts#L327)
