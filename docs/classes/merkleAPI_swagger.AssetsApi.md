[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [merkleAPI/swagger](../modules/merkleAPI_swagger.md) / AssetsApi

# Class: AssetsApi

[merkleAPI/swagger](../modules/merkleAPI_swagger.md).AssetsApi

AssetsApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](merkleAPI_swagger.BaseAPI.md)

  ↳ **`AssetsApi`**

## Table of contents

### Constructors

- [constructor](merkleAPI_swagger.AssetsApi.md#constructor)

### Properties

- [axios](merkleAPI_swagger.AssetsApi.md#axios)
- [basePath](merkleAPI_swagger.AssetsApi.md#basepath)
- [configuration](merkleAPI_swagger.AssetsApi.md#configuration)

### Methods

- [v2AssetEventsGet](merkleAPI_swagger.AssetsApi.md#v2asseteventsget)
- [v2AssetGet](merkleAPI_swagger.AssetsApi.md#v2assetget)
- [v2CollectionActivityGet](merkleAPI_swagger.AssetsApi.md#v2collectionactivityget)
- [v2CollectionAssetsGet](merkleAPI_swagger.AssetsApi.md#v2collectionassetsget)
- [v2CollectionGet](merkleAPI_swagger.AssetsApi.md#v2collectionget)
- [v2CollectionOwnersGet](merkleAPI_swagger.AssetsApi.md#v2collectionownersget)
- [v2UserCollectionsGet](merkleAPI_swagger.AssetsApi.md#v2usercollectionsget)

## Constructors

### constructor

• **new AssetsApi**(`configuration?`, `basePath?`, `axios?`)

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

### v2AssetEventsGet

▸ **v2AssetEventsGet**(`limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2001`](../interfaces/merkleAPI_swagger.InlineResponse2001.md), `any`\>\>

Gets all asset-related events for the specified user.

**`Throws`**

**`Memberof`**

AssetsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `limit` | `number` |  |
| `authorization` | `string` |  |
| `cursor?` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2001`](../interfaces/merkleAPI_swagger.InlineResponse2001.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/assets-api.ts:1077](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/assets-api.ts#L1077)

___

### v2AssetGet

▸ **v2AssetGet**(`tokenId`, `authorization`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2002`](../interfaces/merkleAPI_swagger.InlineResponse2002.md), `any`\>\>

Gets details about the specified asset.

**`Throws`**

**`Memberof`**

AssetsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenId` | `string` |  |
| `authorization` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2002`](../interfaces/merkleAPI_swagger.InlineResponse2002.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/assets-api.ts:1095](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/assets-api.ts#L1095)

___

### v2CollectionActivityGet

▸ **v2CollectionActivityGet**(`collectionId`, `limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2001`](../interfaces/merkleAPI_swagger.InlineResponse2001.md), `any`\>\>

Get all asset events related to the given collection.

**`Throws`**

**`Memberof`**

AssetsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `collectionId` | `string` |  |
| `limit` | `number` |  |
| `authorization` | `string` |  |
| `cursor?` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2001`](../interfaces/merkleAPI_swagger.InlineResponse2001.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/assets-api.ts:1114](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/assets-api.ts#L1114)

___

### v2CollectionAssetsGet

▸ **v2CollectionAssetsGet**(`fid`, `collectionId`, `limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2005`](../interfaces/merkleAPI_swagger.InlineResponse2005.md), `any`\>\>

Gets all assets owned by a given user for a specific collection.

**`Throws`**

**`Memberof`**

AssetsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | - |
| `collectionId` | `string` |  |
| `limit` | `number` |  |
| `authorization` | `string` |  |
| `cursor?` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2005`](../interfaces/merkleAPI_swagger.InlineResponse2005.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/assets-api.ts:1141](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/assets-api.ts#L1141)

___

### v2CollectionGet

▸ **v2CollectionGet**(`collectionId`, `authorization`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse20010`](../interfaces/merkleAPI_swagger.InlineResponse20010.md), `any`\>\>

Get details about a collection of assets.

**`Throws`**

**`Memberof`**

AssetsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `collectionId` | `string` |  |
| `authorization` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse20010`](../interfaces/merkleAPI_swagger.InlineResponse20010.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/assets-api.ts:1168](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/assets-api.ts#L1168)

___

### v2CollectionOwnersGet

▸ **v2CollectionOwnersGet**(`collectionId`, `limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse2009`](../interfaces/merkleAPI_swagger.InlineResponse2009.md), `any`\>\>

Get all users who own at least one asset from the specified collection.

**`Throws`**

**`Memberof`**

AssetsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `collectionId` | `string` |  |
| `limit` | `number` |  |
| `authorization` | `string` |  |
| `cursor?` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse2009`](../interfaces/merkleAPI_swagger.InlineResponse2009.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/assets-api.ts:1187](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/assets-api.ts#L1187)

___

### v2UserCollectionsGet

▸ **v2UserCollectionsGet**(`fid`, `limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse20011`](../interfaces/merkleAPI_swagger.InlineResponse20011.md), `any`\>\>

Get all collections owned by the specified user.

**`Throws`**

**`Memberof`**

AssetsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | - |
| `limit` | `number` |  |
| `authorization` | `string` |  |
| `cursor?` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse20011`](../interfaces/merkleAPI_swagger.InlineResponse20011.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/assets-api.ts:1213](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/assets-api.ts#L1213)
