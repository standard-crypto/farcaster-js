[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [merkleAPI/swagger](../modules/merkleAPI_swagger.md) / UsersApi

# Class: UsersApi

[merkleAPI/swagger](../modules/merkleAPI_swagger.md).UsersApi

UsersApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](merkleAPI_swagger.BaseAPI.md)

  ↳ **`UsersApi`**

## Table of contents

### Constructors

- [constructor](merkleAPI_swagger.UsersApi.md#constructor)

### Properties

- [axios](merkleAPI_swagger.UsersApi.md#axios)
- [basePath](merkleAPI_swagger.UsersApi.md#basepath)
- [configuration](merkleAPI_swagger.UsersApi.md#configuration)

### Methods

- [v2FnameGet](merkleAPI_swagger.UsersApi.md#v2fnameget)
- [v2UserByUsernameGet](merkleAPI_swagger.UsersApi.md#v2userbyusernameget)
- [v2UserGet](merkleAPI_swagger.UsersApi.md#v2userget)

## Constructors

### constructor

• **new UsersApi**(`configuration?`, `basePath?`, `axios?`)

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

### v2FnameGet

▸ **v2FnameGet**(`fname`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse20012`](../interfaces/merkleAPI_swagger.InlineResponse20012.md), `any`\>\>

Get information about a Farcaster username (fname).

**`Throws`**

**`Memberof`**

UsersApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fname` | `string` | - |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse20012`](../interfaces/merkleAPI_swagger.InlineResponse20012.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/users-api.ts:403](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/users-api.ts#L403)

___

### v2UserByUsernameGet

▸ **v2UserByUsernameGet**(`username`, `authorization`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse20013`](../interfaces/merkleAPI_swagger.InlineResponse20013.md), `any`\>\>

Gets the specified user via their username.

**`Throws`**

**`Memberof`**

UsersApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` | - |
| `authorization` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse20013`](../interfaces/merkleAPI_swagger.InlineResponse20013.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/users-api.ts:418](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/users-api.ts#L418)

___

### v2UserGet

▸ **v2UserGet**(`fid`, `authorization`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse20013`](../interfaces/merkleAPI_swagger.InlineResponse20013.md), `any`\>\>

Gets the specified user via their FID or fname (username).

**`Throws`**

**`Memberof`**

UsersApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | - |
| `authorization` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse20013`](../interfaces/merkleAPI_swagger.InlineResponse20013.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/users-api.ts:434](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/users-api.ts#L434)
