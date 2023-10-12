[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / CastsApi

# Class: CastsApi

[openapi](../modules/openapi.md).CastsApi

CastsApi - object-oriented interface

**`Export`**

## Hierarchy

- `BaseAPI`

  ↳ **`CastsApi`**

## Table of contents

### Constructors

- [constructor](openapi.CastsApi.md#constructor)

### Properties

- [axios](openapi.CastsApi.md#axios)
- [basePath](openapi.CastsApi.md#basepath)
- [configuration](openapi.CastsApi.md#configuration)

### Methods

- [getCastById](openapi.CastsApi.md#getcastbyid)
- [listCastsByFid](openapi.CastsApi.md#listcastsbyfid)
- [listCastsByMention](openapi.CastsApi.md#listcastsbymention)
- [listCastsByParent](openapi.CastsApi.md#listcastsbyparent)

## Constructors

### constructor

• **new CastsApi**(`configuration?`, `basePath?`, `axios?`)

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

### getCastById

▸ **getCastById**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`CastAdd`](../modules/openapi.md#castadd), `any`\>\>

**`Summary`**

Get a cast by its FID and Hash.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`CastsApiGetCastByIdRequest`](../interfaces/openapi.CastsApiGetCastByIdRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`CastAdd`](../modules/openapi.md#castadd), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts:518](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts#L518)

___

### listCastsByFid

▸ **listCastsByFid**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`ListCastsByFid200Response`](../interfaces/openapi.ListCastsByFid200Response.md), `any`\>\>

**`Summary`**

Fetch all casts authored by an FID.

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`CastsApiListCastsByFidRequest`](../interfaces/openapi.CastsApiListCastsByFidRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`ListCastsByFid200Response`](../interfaces/openapi.ListCastsByFid200Response.md), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts:530](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts#L530)

___

### listCastsByMention

▸ **listCastsByMention**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`ListCastsByFid200Response`](../interfaces/openapi.ListCastsByFid200Response.md), `any`\>\>

**`Summary`**

Fetch all casts that mention an FID

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`CastsApiListCastsByMentionRequest`](../interfaces/openapi.CastsApiListCastsByMentionRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`ListCastsByFid200Response`](../interfaces/openapi.ListCastsByFid200Response.md), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts:542](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts#L542)

___

### listCastsByParent

▸ **listCastsByParent**(`requestParameters?`, `options?`): `Promise`<`AxiosResponse`<[`ListCastsByFid200Response`](../interfaces/openapi.ListCastsByFid200Response.md), `any`\>\>

**`Summary`**

Fetch all casts by parent cast\'s FID and Hash OR by the parent\'s URL

**`Throws`**

**`Memberof`**

CastsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`CastsApiListCastsByParentRequest`](../interfaces/openapi.CastsApiListCastsByParentRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`ListCastsByFid200Response`](../interfaces/openapi.ListCastsByFid200Response.md), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts:554](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts#L554)
