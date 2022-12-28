[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / WatchesApi

# Class: WatchesApi

[index](../modules/index.md).WatchesApi

WatchesApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](index.BaseAPI.md)

  ↳ **`WatchesApi`**

## Table of contents

### Constructors

- [constructor](index.WatchesApi.md#constructor)

### Properties

- [axios](index.WatchesApi.md#axios)
- [basePath](index.WatchesApi.md#basepath)
- [configuration](index.WatchesApi.md#configuration)

### Methods

- [v2WatchedCastsDelete](index.WatchesApi.md#v2watchedcastsdelete)
- [v2WatchedCastsPut](index.WatchesApi.md#v2watchedcastsput)

## Constructors

### constructor

• **new WatchesApi**(`configuration?`, `basePath?`, `axios?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `configuration?` | [`Configuration`](index.Configuration.md) | `undefined` |
| `basePath` | `string` | `BASE_PATH` |
| `axios` | `AxiosInstance` | `globalAxios` |

#### Inherited from

[BaseAPI](index.BaseAPI.md).[constructor](index.BaseAPI.md#constructor)

#### Defined in

[src/merkleAPI/swagger/base.ts:50](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L50)

## Properties

### axios

• `Protected` **axios**: `AxiosInstance` = `globalAxios`

#### Inherited from

[BaseAPI](index.BaseAPI.md).[axios](index.BaseAPI.md#axios)

#### Defined in

[src/merkleAPI/swagger/base.ts:53](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L53)

___

### basePath

• `Protected` **basePath**: `string` = `BASE_PATH`

#### Inherited from

[BaseAPI](index.BaseAPI.md).[basePath](index.BaseAPI.md#basepath)

#### Defined in

[src/merkleAPI/swagger/base.ts:52](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L52)

___

### configuration

• `Protected` **configuration**: `undefined` \| [`Configuration`](index.Configuration.md)

#### Inherited from

[BaseAPI](index.BaseAPI.md).[configuration](index.BaseAPI.md#configuration)

#### Defined in

[src/merkleAPI/swagger/base.ts:48](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L48)

## Methods

### v2WatchedCastsDelete

▸ **v2WatchedCastsDelete**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/index.InlineResponse2004.md), `any`\>\>

Unwatch a cast.

**`Throws`**

**`Memberof`**

WatchesApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2WatchedCastsBody1`](../interfaces/index.V2WatchedCastsBody1.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/index.InlineResponse2004.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/watches-api.ts:310](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/watches-api.ts#L310)

___

### v2WatchedCastsPut

▸ **v2WatchedCastsPut**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/index.InlineResponse2004.md), `any`\>\>

Watch a cast.

**`Throws`**

**`Memberof`**

WatchesApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2WatchedCastsBody`](../interfaces/index.V2WatchedCastsBody.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/index.InlineResponse2004.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/watches-api.ts:327](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/watches-api.ts#L327)
