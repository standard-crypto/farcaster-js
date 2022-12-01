[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [merkleAPI/swagger](../modules/merkleAPI_swagger.md) / VerificationsApi

# Class: VerificationsApi

[merkleAPI/swagger](../modules/merkleAPI_swagger.md).VerificationsApi

VerificationsApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](merkleAPI_swagger.BaseAPI.md)

  ↳ **`VerificationsApi`**

## Table of contents

### Constructors

- [constructor](merkleAPI_swagger.VerificationsApi.md#constructor)

### Properties

- [axios](merkleAPI_swagger.VerificationsApi.md#axios)
- [basePath](merkleAPI_swagger.VerificationsApi.md#basepath)
- [configuration](merkleAPI_swagger.VerificationsApi.md#configuration)

### Methods

- [v2VerificationsGet](merkleAPI_swagger.VerificationsApi.md#v2verificationsget)

## Constructors

### constructor

• **new VerificationsApi**(`configuration?`, `basePath?`, `axios?`)

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

### v2VerificationsGet

▸ **v2VerificationsGet**(`limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse20016`](../interfaces/merkleAPI_swagger.InlineResponse20016.md), `any`\>\>

Get all verifications for the authenticated user.

**`Throws`**

**`Memberof`**

VerificationsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `limit` | `number` |  |
| `authorization` | `string` |  |
| `cursor?` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse20016`](../interfaces/merkleAPI_swagger.InlineResponse20016.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/verifications-api.ts:207](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/verifications-api.ts#L207)
