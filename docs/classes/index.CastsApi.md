[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / CastsApi

# Class: CastsApi

[index](../modules/index.md).CastsApi

CastsApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](index.BaseAPI.md)

  ↳ **`CastsApi`**

## Table of contents

### Constructors

- [constructor](index.CastsApi.md#constructor)

### Properties

- [axios](index.CastsApi.md#axios)
- [basePath](index.CastsApi.md#basepath)
- [configuration](index.CastsApi.md#configuration)

### Methods

- [v2AllCastsInThreadGet](index.CastsApi.md#v2allcastsinthreadget)
- [v2CastGet](index.CastsApi.md#v2castget)
- [v2CastLikesGet](index.CastsApi.md#v2castlikesget)
- [v2CastReactionsDelete](index.CastsApi.md#v2castreactionsdelete)
- [v2CastReactionsPut](index.CastsApi.md#v2castreactionsput)
- [v2CastRecastersGet](index.CastsApi.md#v2castrecastersget)
- [v2CastsDelete](index.CastsApi.md#v2castsdelete)
- [v2CastsGet](index.CastsApi.md#v2castsget)
- [v2CastsPost](index.CastsApi.md#v2castspost)
- [v2RecastsDelete](index.CastsApi.md#v2recastsdelete)
- [v2RecastsPut](index.CastsApi.md#v2recastsput)
- [v2RecentCastsGet](index.CastsApi.md#v2recentcastsget)
- [v2UserCastLikesGet](index.CastsApi.md#v2usercastlikesget)

## Constructors

### constructor

• **new CastsApi**(`configuration?`, `basePath?`, `axios?`)

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

### v2AllCastsInThreadGet

▸ **v2AllCastsInThreadGet**(`threadHash`, `limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2006`](../interfaces/index.InlineResponse2006.md), `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `threadHash` | `string` |
| `limit` | `number` |
| `authorization` | `string` |
| `cursor?` | `string` |
| `options?` | `AxiosRequestConfig`<`any`\> |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2006`](../interfaces/index.InlineResponse2006.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1707](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1707)

___

### v2CastGet

▸ **v2CastGet**(`hash`, `authorization`, `options?`): `Promise`<`AxiosResponse`<[`GetCastResponse`](../interfaces/index.GetCastResponse.md), `any`\>\>

Gets information about an individual cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |
| `authorization` | `string` |
| `options?` | `AxiosRequestConfig`<`any`\> |

#### Returns

`Promise`<`AxiosResponse`<[`GetCastResponse`](../interfaces/index.GetCastResponse.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1811](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1811)

___

### v2CastLikesGet

▸ **v2CastLikesGet**(`hash`, `limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2007`](../interfaces/index.InlineResponse2007.md), `any`\>\>

Get all reactions to a cast.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `string` | - |
| `limit` | `number` |  |
| `authorization` | `string` |  |
| `cursor?` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2007`](../interfaces/index.InlineResponse2007.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1744](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1744)

___

### v2CastReactionsDelete

▸ **v2CastReactionsDelete**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/index.InlineResponse2004.md), `any`\>\>

Remove a reaction from a cast.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2CastReactionsBody1`](../interfaces/index.V2CastReactionsBody1.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/index.InlineResponse2004.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1726](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1726)

___

### v2CastReactionsPut

▸ **v2CastReactionsPut**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2008`](../interfaces/index.InlineResponse2008.md), `any`\>\>

Create a reaction to a cast.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2CastReactionsBody`](../interfaces/index.V2CastReactionsBody.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2008`](../interfaces/index.InlineResponse2008.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1763](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1763)

___

### v2CastRecastersGet

▸ **v2CastRecastersGet**(`limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2009`](../interfaces/index.InlineResponse2009.md), `any`\>\>

Get all users who recasted a cast.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `limit` | `number` |  |
| `authorization` | `string` |  |
| `cursor?` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2009`](../interfaces/index.InlineResponse2009.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1781](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1781)

___

### v2CastsDelete

▸ **v2CastsDelete**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/index.InlineResponse2004.md), `any`\>\>

Deletes a cast.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2CastsBody1`](../interfaces/index.V2CastsBody1.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/index.InlineResponse2004.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1799](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1799)

___

### v2CastsGet

▸ **v2CastsGet**(`fid`, `includeDeletedCasts`, `limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2006`](../interfaces/index.InlineResponse2006.md), `any`\>\>

Gets all casts created by the specified user.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | - |
| `includeDeletedCasts` | `boolean` |  |
| `limit` | `number` |  |
| `authorization` | `string` |  |
| `cursor?` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2006`](../interfaces/index.InlineResponse2006.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1830](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1830)

___

### v2CastsPost

▸ **v2CastsPost**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse201`](../interfaces/index.InlineResponse201.md), `any`\>\>

Creates a cast for the currently authenticated user.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2CastsBody`](../interfaces/index.V2CastsBody.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse201`](../interfaces/index.InlineResponse201.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1870](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1870)

___

### v2RecastsDelete

▸ **v2RecastsDelete**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/index.InlineResponse2004.md), `any`\>\>

Delete a recast.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2RecastsBody1`](../interfaces/index.V2RecastsBody1.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/index.InlineResponse2004.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1887](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1887)

___

### v2RecastsPut

▸ **v2RecastsPut**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse20015`](../interfaces/index.InlineResponse20015.md), `any`\>\>

Recast a cast.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2RecastsBody`](../interfaces/index.V2RecastsBody.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse20015`](../interfaces/index.InlineResponse20015.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1904](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1904)

___

### v2RecentCastsGet

▸ **v2RecentCastsGet**(`limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2006`](../interfaces/index.InlineResponse2006.md), `any`\>\>

A list of casts in reverse chronological order based on timestamp

#### Parameters

| Name | Type |
| :------ | :------ |
| `limit` | `number` |
| `authorization` | `string` |
| `cursor?` | `string` |
| `options?` | `AxiosRequestConfig`<`any`\> |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2006`](../interfaces/index.InlineResponse2006.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1852](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1852)

___

### v2UserCastLikesGet

▸ **v2UserCastLikesGet**(`fid`, `limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`UserCastLikesGetResponse`](../interfaces/index.UserCastLikesGetResponse.md), `any`\>\>

Returns all likes by a given user.

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |
| `limit` | `number` |
| `authorization` | `string` |
| `cursor?` | `string` |
| `options?` | `AxiosRequestConfig`<`any`\> |

#### Returns

`Promise`<`AxiosResponse`<[`UserCastLikesGetResponse`](../interfaces/index.UserCastLikesGetResponse.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1916](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1916)
