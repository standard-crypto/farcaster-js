[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / ReactionsApi

# Class: ReactionsApi

[openapi](../modules/openapi.md).ReactionsApi

ReactionsApi - object-oriented interface

**`Export`**

## Hierarchy

- `BaseAPI`

  ↳ **`ReactionsApi`**

## Table of contents

### Constructors

- [constructor](openapi.ReactionsApi.md#constructor)

### Properties

- [axios](openapi.ReactionsApi.md#axios)
- [basePath](openapi.ReactionsApi.md#basepath)
- [configuration](openapi.ReactionsApi.md#configuration)

### Methods

- [getReactionById](openapi.ReactionsApi.md#getreactionbyid)
- [listReactionsByCast](openapi.ReactionsApi.md#listreactionsbycast)
- [listReactionsByFid](openapi.ReactionsApi.md#listreactionsbyfid)
- [listReactionsByTarget](openapi.ReactionsApi.md#listreactionsbytarget)

## Constructors

### constructor

• **new ReactionsApi**(`configuration?`, `basePath?`, `axios?`)

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

### getReactionById

▸ **getReactionById**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`Reaction`](../modules/openapi.md#reaction), `any`\>\>

**`Summary`**

Get a reaction by its created FID and target Cast.

**`Throws`**

**`Memberof`**

ReactionsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`ReactionsApiGetReactionByIdRequest`](../interfaces/openapi.ReactionsApiGetReactionByIdRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`Reaction`](../modules/openapi.md#reaction), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:583](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L583)

___

### listReactionsByCast

▸ **listReactionsByCast**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`ListReactionsByCast200Response`](../interfaces/openapi.ListReactionsByCast200Response.md), `any`\>\>

**`Summary`**

Get all reactions to a cast

**`Throws`**

**`Memberof`**

ReactionsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`ReactionsApiListReactionsByCastRequest`](../interfaces/openapi.ReactionsApiListReactionsByCastRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`ListReactionsByCast200Response`](../interfaces/openapi.ListReactionsByCast200Response.md), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:595](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L595)

___

### listReactionsByFid

▸ **listReactionsByFid**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`ListReactionsByCast200Response`](../interfaces/openapi.ListReactionsByCast200Response.md), `any`\>\>

**`Summary`**

Get all reactions by an FID

**`Throws`**

**`Memberof`**

ReactionsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`ReactionsApiListReactionsByFidRequest`](../interfaces/openapi.ReactionsApiListReactionsByFidRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`ListReactionsByCast200Response`](../interfaces/openapi.ListReactionsByCast200Response.md), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:607](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L607)

___

### listReactionsByTarget

▸ **listReactionsByTarget**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`ListReactionsByCast200Response`](../interfaces/openapi.ListReactionsByCast200Response.md), `any`\>\>

**`Throws`**

**`Memberof`**

ReactionsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`ReactionsApiListReactionsByTargetRequest`](../interfaces/openapi.ReactionsApiListReactionsByTargetRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`ListReactionsByCast200Response`](../interfaces/openapi.ListReactionsByCast200Response.md), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:618](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L618)
