[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [merkleAPI/swagger](../modules/merkleAPI_swagger.md) / UserApi

# Class: UserApi

[merkleAPI/swagger](../modules/merkleAPI_swagger.md).UserApi

UserApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](merkleAPI_swagger.BaseAPI.md)

  ↳ **`UserApi`**

## Table of contents

### Constructors

- [constructor](merkleAPI_swagger.UserApi.md#constructor)

### Properties

- [axios](merkleAPI_swagger.UserApi.md#axios)
- [basePath](merkleAPI_swagger.UserApi.md#basepath)
- [configuration](merkleAPI_swagger.UserApi.md#configuration)

### Methods

- [v2MeGet](merkleAPI_swagger.UserApi.md#v2meget)

## Constructors

### constructor

• **new UserApi**(`configuration?`, `basePath?`, `axios?`)

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

### v2MeGet

▸ **v2MeGet**(`authorization`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse20013`](../interfaces/merkleAPI_swagger.InlineResponse20013.md), `any`\>\>

Gets the currently authenticated user.

**`Throws`**

**`Memberof`**

UserApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse20013`](../interfaces/merkleAPI_swagger.InlineResponse20013.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/user-api.ts:178](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/user-api.ts#L178)
