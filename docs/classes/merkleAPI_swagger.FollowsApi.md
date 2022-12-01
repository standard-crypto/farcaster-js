[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [merkleAPI/swagger](../modules/merkleAPI_swagger.md) / FollowsApi

# Class: FollowsApi

[merkleAPI/swagger](../modules/merkleAPI_swagger.md).FollowsApi

FollowsApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](merkleAPI_swagger.BaseAPI.md)

  ↳ **`FollowsApi`**

## Table of contents

### Constructors

- [constructor](merkleAPI_swagger.FollowsApi.md#constructor)

### Properties

- [axios](merkleAPI_swagger.FollowsApi.md#axios)
- [basePath](merkleAPI_swagger.FollowsApi.md#basepath)
- [configuration](merkleAPI_swagger.FollowsApi.md#configuration)

### Methods

- [v2FollowersGet](merkleAPI_swagger.FollowsApi.md#v2followersget)
- [v2FollowingGet](merkleAPI_swagger.FollowsApi.md#v2followingget)
- [v2FollowsDelete](merkleAPI_swagger.FollowsApi.md#v2followsdelete)
- [v2FollowsPut](merkleAPI_swagger.FollowsApi.md#v2followsput)

## Constructors

### constructor

• **new FollowsApi**(`configuration?`, `basePath?`, `axios?`)

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

### v2FollowersGet

▸ **v2FollowersGet**(`fid`, `limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2009`](../interfaces/merkleAPI_swagger.InlineResponse2009.md), `any`\>\>

Get all users that follow the specified user.

**`Throws`**

**`Memberof`**

FollowsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | - |
| `limit` | `number` |  |
| `authorization` | `string` |  |
| `cursor?` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2009`](../interfaces/merkleAPI_swagger.InlineResponse2009.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/follows-api.ts:596](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/follows-api.ts#L596)

___

### v2FollowingGet

▸ **v2FollowingGet**(`fid`, `limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2009`](../interfaces/merkleAPI_swagger.InlineResponse2009.md), `any`\>\>

Get all users the specified user is following.

**`Throws`**

**`Memberof`**

FollowsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | - |
| `limit` | `number` |  |
| `authorization` | `string` |  |
| `cursor?` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2009`](../interfaces/merkleAPI_swagger.InlineResponse2009.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/follows-api.ts:616](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/follows-api.ts#L616)

___

### v2FollowsDelete

▸ **v2FollowsDelete**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

Unfollow a user.

**`Throws`**

**`Memberof`**

FollowsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2FollowsBody1`](../interfaces/merkleAPI_swagger.V2FollowsBody1.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/follows-api.ts:635](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/follows-api.ts#L635)

___

### v2FollowsPut

▸ **v2FollowsPut**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

Follow a user.

**`Throws`**

**`Memberof`**

FollowsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2FollowsBody`](../interfaces/merkleAPI_swagger.V2FollowsBody.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/follows-api.ts:652](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/follows-api.ts#L652)
