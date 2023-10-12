[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / LinksApi

# Class: LinksApi

[openapi](../modules/openapi.md).LinksApi

LinksApi - object-oriented interface

**`Export`**

## Hierarchy

- `BaseAPI`

  ↳ **`LinksApi`**

## Table of contents

### Constructors

- [constructor](openapi.LinksApi.md#constructor)

### Properties

- [axios](openapi.LinksApi.md#axios)
- [basePath](openapi.LinksApi.md#basepath)
- [configuration](openapi.LinksApi.md#configuration)

### Methods

- [getLinkById](openapi.LinksApi.md#getlinkbyid)
- [listLinksByFid](openapi.LinksApi.md#listlinksbyfid)
- [listLinksByTargetFid](openapi.LinksApi.md#listlinksbytargetfid)

## Constructors

### constructor

• **new LinksApi**(`configuration?`, `basePath?`, `axios?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `configuration?` | [`Configuration`](openapi.Configuration.md) | `undefined` |
| `basePath` | `string` | `BASE_PATH` |
| `axios` | `AxiosInstance` | `globalAxios` |

#### Inherited from

BaseAPI.constructor

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/base.ts:53](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/base.ts#L53)

## Properties

### axios

• `Protected` **axios**: `AxiosInstance` = `globalAxios`

#### Inherited from

BaseAPI.axios

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/base.ts:53](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/base.ts#L53)

___

### basePath

• `Protected` **basePath**: `string` = `BASE_PATH`

#### Inherited from

BaseAPI.basePath

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/base.ts:53](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/base.ts#L53)

___

### configuration

• `Protected` **configuration**: `undefined` \| [`Configuration`](openapi.Configuration.md)

#### Inherited from

BaseAPI.configuration

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/base.ts:51](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/base.ts#L51)

## Methods

### getLinkById

▸ **getLinkById**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`LinkAdd`](../modules/openapi.md#linkadd), `any`\>\>

**`Summary`**

Get a link by its FID and target FID.

**`Throws`**

**`Memberof`**

LinksApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`LinksApiGetLinkByIdRequest`](../interfaces/openapi.LinksApiGetLinkByIdRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`LinkAdd`](../modules/openapi.md#linkadd), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:426](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L426)

___

### listLinksByFid

▸ **listLinksByFid**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`ListLinksByFid200Response`](../interfaces/openapi.ListLinksByFid200Response.md), `any`\>\>

**`Summary`**

Get all links from a source FID

**`Throws`**

**`Memberof`**

LinksApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`LinksApiListLinksByFidRequest`](../interfaces/openapi.LinksApiListLinksByFidRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`ListLinksByFid200Response`](../interfaces/openapi.ListLinksByFid200Response.md), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:438](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L438)

___

### listLinksByTargetFid

▸ **listLinksByTargetFid**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`ListLinksByFid200Response`](../interfaces/openapi.ListLinksByFid200Response.md), `any`\>\>

**`Summary`**

Get all links to a target FID

**`Throws`**

**`Memberof`**

LinksApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`LinksApiListLinksByTargetFidRequest`](../interfaces/openapi.LinksApiListLinksByTargetFidRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`ListLinksByFid200Response`](../interfaces/openapi.ListLinksByFid200Response.md), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:450](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L450)
