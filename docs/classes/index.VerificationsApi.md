[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / VerificationsApi

# Class: VerificationsApi

[index](../modules/index.md).VerificationsApi

VerificationsApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](index.BaseAPI.md)

  ↳ **`VerificationsApi`**

## Table of contents

### Constructors

- [constructor](index.VerificationsApi.md#constructor)

### Properties

- [axios](index.VerificationsApi.md#axios)
- [basePath](index.VerificationsApi.md#basepath)
- [configuration](index.VerificationsApi.md#configuration)

### Methods

- [v2VerificationsGet](index.VerificationsApi.md#v2verificationsget)

## Constructors

### constructor

• **new VerificationsApi**(`configuration?`, `basePath?`, `axios?`)

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

### v2VerificationsGet

▸ **v2VerificationsGet**(`fid`, `limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse20016`](../interfaces/index.InlineResponse20016.md), `any`\>\>

Get all verifications for the authenticated user.

**`Throws`**

**`Memberof`**

VerificationsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | - |
| `limit` | `number` |  |
| `authorization` | `string` |  |
| `cursor?` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse20016`](../interfaces/index.InlineResponse20016.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/verifications-api.ts:221](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/verifications-api.ts#L221)
