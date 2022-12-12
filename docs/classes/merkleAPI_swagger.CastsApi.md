[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [merkleAPI/swagger](../modules/merkleAPI_swagger.md) / CastsApi

# Class: CastsApi

[merkleAPI/swagger](../modules/merkleAPI_swagger.md).CastsApi

CastsApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](merkleAPI_swagger.BaseAPI.md)

  ↳ **`CastsApi`**

## Table of contents

### Constructors

- [constructor](merkleAPI_swagger.CastsApi.md#constructor)

### Properties

- [axios](merkleAPI_swagger.CastsApi.md#axios)
- [basePath](merkleAPI_swagger.CastsApi.md#basepath)
- [configuration](merkleAPI_swagger.CastsApi.md#configuration)

### Methods

- [v2AllCastsInThreadGet](merkleAPI_swagger.CastsApi.md#v2allcastsinthreadget)
- [v2CastGet](merkleAPI_swagger.CastsApi.md#v2castget)
- [v2CastReactionsDelete](merkleAPI_swagger.CastsApi.md#v2castreactionsdelete)
- [v2CastReactionsGet](merkleAPI_swagger.CastsApi.md#v2castreactionsget)
- [v2CastReactionsPut](merkleAPI_swagger.CastsApi.md#v2castreactionsput)
- [v2CastRecastersGet](merkleAPI_swagger.CastsApi.md#v2castrecastersget)
- [v2CastsDelete](merkleAPI_swagger.CastsApi.md#v2castsdelete)
- [v2CastsGet](merkleAPI_swagger.CastsApi.md#v2castsget)
- [v2CastsPost](merkleAPI_swagger.CastsApi.md#v2castspost)
- [v2RecastsDelete](merkleAPI_swagger.CastsApi.md#v2recastsdelete)
- [v2RecastsPut](merkleAPI_swagger.CastsApi.md#v2recastsput)
- [v2RecentCastsGet](merkleAPI_swagger.CastsApi.md#v2recentcastsget)
- [v2UserCastLikesGet](merkleAPI_swagger.CastsApi.md#v2usercastlikesget)

## Constructors

### constructor

• **new CastsApi**(`configuration?`, `basePath?`, `axios?`)

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

### v2AllCastsInThreadGet

▸ **v2AllCastsInThreadGet**(`threadHash`, `limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2006`](../interfaces/merkleAPI_swagger.InlineResponse2006.md), `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `threadHash` | `string` |
| `limit` | `number` |
| `authorization` | `string` |
| `cursor?` | `string` |
| `options?` | `AxiosRequestConfig`<`any`\> |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2006`](../interfaces/merkleAPI_swagger.InlineResponse2006.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1693](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1693)

___

### v2CastGet

▸ **v2CastGet**(`hash`, `authorization`, `options?`): `Promise`<`AxiosResponse`<[`GetCastResponse`](../interfaces/merkleAPI_swagger.GetCastResponse.md), `any`\>\>

Gets information about an individual cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |
| `authorization` | `string` |
| `options?` | `AxiosRequestConfig`<`any`\> |

#### Returns

`Promise`<`AxiosResponse`<[`GetCastResponse`](../interfaces/merkleAPI_swagger.GetCastResponse.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1796](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1796)

___

### v2CastReactionsDelete

▸ **v2CastReactionsDelete**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

Remove a reaction from a cast.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2CastReactionsBody1`](../interfaces/merkleAPI_swagger.V2CastReactionsBody1.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1712](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1712)

___

### v2CastReactionsGet

▸ **v2CastReactionsGet**(`limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2007`](../interfaces/merkleAPI_swagger.InlineResponse2007.md), `any`\>\>

Get all reactions to a cast.

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

`Promise`<`AxiosResponse`<[`InlineResponse2007`](../interfaces/merkleAPI_swagger.InlineResponse2007.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1730](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1730)

___

### v2CastReactionsPut

▸ **v2CastReactionsPut**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2008`](../interfaces/merkleAPI_swagger.InlineResponse2008.md), `any`\>\>

Create a reaction to a cast.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2CastReactionsBody`](../interfaces/merkleAPI_swagger.V2CastReactionsBody.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2008`](../interfaces/merkleAPI_swagger.InlineResponse2008.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1748](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1748)

___

### v2CastRecastersGet

▸ **v2CastRecastersGet**(`limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2009`](../interfaces/merkleAPI_swagger.InlineResponse2009.md), `any`\>\>

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

`Promise`<`AxiosResponse`<[`InlineResponse2009`](../interfaces/merkleAPI_swagger.InlineResponse2009.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1766](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1766)

___

### v2CastsDelete

▸ **v2CastsDelete**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

Deletes a cast.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2CastsBody1`](../interfaces/merkleAPI_swagger.V2CastsBody1.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1784](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1784)

___

### v2CastsGet

▸ **v2CastsGet**(`fid`, `includeDeletedCasts`, `limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2006`](../interfaces/merkleAPI_swagger.InlineResponse2006.md), `any`\>\>

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

`Promise`<`AxiosResponse`<[`InlineResponse2006`](../interfaces/merkleAPI_swagger.InlineResponse2006.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1815](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1815)

___

### v2CastsPost

▸ **v2CastsPost**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse201`](../interfaces/merkleAPI_swagger.InlineResponse201.md), `any`\>\>

Creates a cast for the currently authenticated user.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2CastsBody`](../interfaces/merkleAPI_swagger.V2CastsBody.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse201`](../interfaces/merkleAPI_swagger.InlineResponse201.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1855](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1855)

___

### v2RecastsDelete

▸ **v2RecastsDelete**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

Delete a recast.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2RecastsBody1`](../interfaces/merkleAPI_swagger.V2RecastsBody1.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2004`](../interfaces/merkleAPI_swagger.InlineResponse2004.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1872](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1872)

___

### v2RecastsPut

▸ **v2RecastsPut**(`authorization`, `body?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse20015`](../interfaces/merkleAPI_swagger.InlineResponse20015.md), `any`\>\>

Recast a cast.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorization` | `string` |  |
| `body?` | [`V2RecastsBody`](../interfaces/merkleAPI_swagger.V2RecastsBody.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse20015`](../interfaces/merkleAPI_swagger.InlineResponse20015.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1889](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1889)

___

### v2RecentCastsGet

▸ **v2RecentCastsGet**(`limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2006`](../interfaces/merkleAPI_swagger.InlineResponse2006.md), `any`\>\>

A list of casts in reverse chronological order based on timestamp

#### Parameters

| Name | Type |
| :------ | :------ |
| `limit` | `number` |
| `authorization` | `string` |
| `cursor?` | `string` |
| `options?` | `AxiosRequestConfig`<`any`\> |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2006`](../interfaces/merkleAPI_swagger.InlineResponse2006.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1837](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1837)

___

### v2UserCastLikesGet

▸ **v2UserCastLikesGet**(`fid`, `limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`UserCastLikesGetResponse`](../interfaces/merkleAPI_swagger.UserCastLikesGetResponse.md), `any`\>\>

Returns all casts liked by a given user.

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |
| `limit` | `number` |
| `authorization` | `string` |
| `cursor?` | `string` |
| `options?` | `AxiosRequestConfig`<`any`\> |

#### Returns

`Promise`<`AxiosResponse`<[`UserCastLikesGetResponse`](../interfaces/merkleAPI_swagger.UserCastLikesGetResponse.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/casts-api.ts:1901](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/casts-api.ts#L1901)
