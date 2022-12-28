[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / MiscellaneousApi

# Class: MiscellaneousApi

[index](../modules/index.md).MiscellaneousApi

MiscellaneousApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](index.BaseAPI.md)

  ↳ **`MiscellaneousApi`**

## Table of contents

### Constructors

- [constructor](index.MiscellaneousApi.md#constructor)

### Properties

- [axios](index.MiscellaneousApi.md#axios)
- [basePath](index.MiscellaneousApi.md#basepath)
- [configuration](index.MiscellaneousApi.md#configuration)

### Methods

- [healthcheckGet](index.MiscellaneousApi.md#healthcheckget)

## Constructors

### constructor

• **new MiscellaneousApi**(`configuration?`, `basePath?`, `axios?`)

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

### healthcheckGet

▸ **healthcheckGet**(`options?`): `Promise`<`AxiosResponse`<[`InlineResponse200`](../interfaces/index.InlineResponse200.md), `any`\>\>

Returns whether the server is healthy and responding to requests.

**`Throws`**

**`Memberof`**

MiscellaneousApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse200`](../interfaces/index.InlineResponse200.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/miscellaneous-api.ts:160](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/miscellaneous-api.ts#L160)
