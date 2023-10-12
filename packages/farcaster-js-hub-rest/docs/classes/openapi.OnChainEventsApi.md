[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / OnChainEventsApi

# Class: OnChainEventsApi

[openapi](../modules/openapi.md).OnChainEventsApi

OnChainEventsApi - object-oriented interface

**`Export`**

## Hierarchy

- `BaseAPI`

  ↳ **`OnChainEventsApi`**

## Table of contents

### Constructors

- [constructor](openapi.OnChainEventsApi.md#constructor)

### Properties

- [axios](openapi.OnChainEventsApi.md#axios)
- [basePath](openapi.OnChainEventsApi.md#basepath)
- [configuration](openapi.OnChainEventsApi.md#configuration)

### Methods

- [getOnChainIdRegistrationByAddress](openapi.OnChainEventsApi.md#getonchainidregistrationbyaddress)
- [listOnChainEventsByFid](openapi.OnChainEventsApi.md#listonchaineventsbyfid)
- [listOnChainSignersByFid](openapi.OnChainEventsApi.md#listonchainsignersbyfid)

## Constructors

### constructor

• **new OnChainEventsApi**(`configuration?`, `basePath?`, `axios?`)

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

### getOnChainIdRegistrationByAddress

▸ **getOnChainIdRegistrationByAddress**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`OnChainEventIdRegister`](../modules/openapi.md#onchaineventidregister), `any`\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`OnChainEventsApiGetOnChainIdRegistrationByAddressRequest`](../interfaces/openapi.OnChainEventsApiGetOnChainIdRegistrationByAddressRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`OnChainEventIdRegister`](../modules/openapi.md#onchaineventidregister), `any`\>\>

**`Summary`**

Get an on chain ID Registry Event for a given Address

**`Throws`**

**`Memberof`**

OnChainEventsApi

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/on-chain-events-api.ts:322](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/on-chain-events-api.ts#L322)

___

### listOnChainEventsByFid

▸ **listOnChainEventsByFid**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`ListOnChainEventsByFid200Response`](../interfaces/openapi.ListOnChainEventsByFid200Response.md), `any`\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`OnChainEventsApiListOnChainEventsByFidRequest`](../interfaces/openapi.OnChainEventsApiListOnChainEventsByFidRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`ListOnChainEventsByFid200Response`](../interfaces/openapi.ListOnChainEventsByFid200Response.md), `any`\>\>

**`Summary`**

Get a list of on-chain events provided by an FID

**`Throws`**

**`Memberof`**

OnChainEventsApi

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/on-chain-events-api.ts:334](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/on-chain-events-api.ts#L334)

___

### listOnChainSignersByFid

▸ **listOnChainSignersByFid**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`ListOnChainSignersByFid200Response`](../modules/openapi.md#listonchainsignersbyfid200response), `any`\>\>

**Note:** one of two different response schemas is returned based on whether the caller provides the `signer` parameter. If included, a single `OnChainEventSigner` message is returned (or a `not_found` error). If omitted, a non-paginated list of `OnChainEventSigner` messages is returned instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`OnChainEventsApiListOnChainSignersByFidRequest`](../interfaces/openapi.OnChainEventsApiListOnChainSignersByFidRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`ListOnChainSignersByFid200Response`](../modules/openapi.md#listonchainsignersbyfid200response), `any`\>\>

**`Summary`**

Get a list of signers provided by an FID

**`Throws`**

**`Memberof`**

OnChainEventsApi

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/on-chain-events-api.ts:346](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/on-chain-events-api.ts#L346)
