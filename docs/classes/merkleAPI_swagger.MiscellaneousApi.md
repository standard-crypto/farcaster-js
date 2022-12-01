[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [merkleAPI/swagger](../modules/merkleAPI_swagger.md) / MiscellaneousApi

# Class: MiscellaneousApi

[merkleAPI/swagger](../modules/merkleAPI_swagger.md).MiscellaneousApi

MiscellaneousApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](merkleAPI_swagger.BaseAPI.md)

  ↳ **`MiscellaneousApi`**

## Table of contents

### Constructors

- [constructor](merkleAPI_swagger.MiscellaneousApi.md#constructor)

### Properties

- [axios](merkleAPI_swagger.MiscellaneousApi.md#axios)
- [basePath](merkleAPI_swagger.MiscellaneousApi.md#basepath)
- [configuration](merkleAPI_swagger.MiscellaneousApi.md#configuration)

### Methods

- [healthcheckGet](merkleAPI_swagger.MiscellaneousApi.md#healthcheckget)

## Constructors

### constructor

• **new MiscellaneousApi**(`configuration?`, `basePath?`, `axios?`)

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

### healthcheckGet

▸ **healthcheckGet**(`options?`): `Promise`<`AxiosResponse`<[`InlineResponse200`](../interfaces/merkleAPI_swagger.InlineResponse200.md), `any`\>\>

Returns whether the server is healthy and responding to requests.

**`Throws`**

**`Memberof`**

MiscellaneousApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse200`](../interfaces/merkleAPI_swagger.InlineResponse200.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/miscellaneous-api.ts:160](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/miscellaneous-api.ts#L160)
