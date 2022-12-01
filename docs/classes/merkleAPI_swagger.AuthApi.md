[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [merkleAPI/swagger](../modules/merkleAPI_swagger.md) / AuthApi

# Class: AuthApi

[merkleAPI/swagger](../modules/merkleAPI_swagger.md).AuthApi

AuthApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](merkleAPI_swagger.BaseAPI.md)

  ↳ **`AuthApi`**

## Table of contents

### Constructors

- [constructor](merkleAPI_swagger.AuthApi.md#constructor)

### Properties

- [axios](merkleAPI_swagger.AuthApi.md#axios)
- [basePath](merkleAPI_swagger.AuthApi.md#basepath)
- [configuration](merkleAPI_swagger.AuthApi.md#configuration)

### Methods

- [v2AuthDelete](merkleAPI_swagger.AuthApi.md#v2authdelete)
- [v2AuthPut](merkleAPI_swagger.AuthApi.md#v2authput)

## Constructors

### constructor

• **new AuthApi**(`configuration?`, `basePath?`, `axios?`)

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

### v2AuthDelete

▸ **v2AuthDelete**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

Revokes an authentication token.

**`Throws`**

**`Memberof`**

AuthApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2AuthBody1`](../interfaces/merkleAPI_swagger.V2AuthBody1.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/auth-api.ts:294](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/auth-api.ts#L294)

___

### v2AuthPut

▸ **v2AuthPut**(`body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2003`](../interfaces/merkleAPI_swagger.InlineResponse2003.md), `any`\>\>

Generates an authentication token.

**`Throws`**

**`Memberof`**

AuthApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body?` | [`V2AuthBody`](../interfaces/merkleAPI_swagger.V2AuthBody.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2003`](../interfaces/merkleAPI_swagger.InlineResponse2003.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/auth-api.ts:310](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/auth-api.ts#L310)
