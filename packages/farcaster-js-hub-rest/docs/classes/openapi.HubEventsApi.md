[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / HubEventsApi

# Class: HubEventsApi

[openapi](../modules/openapi.md).HubEventsApi

HubEventsApi - object-oriented interface

**`Export`**

## Hierarchy

- `BaseAPI`

  ↳ **`HubEventsApi`**

## Table of contents

### Constructors

- [constructor](openapi.HubEventsApi.md#constructor)

### Properties

- [axios](openapi.HubEventsApi.md#axios)
- [basePath](openapi.HubEventsApi.md#basepath)
- [configuration](openapi.HubEventsApi.md#configuration)

### Methods

- [getEventById](openapi.HubEventsApi.md#geteventbyid)
- [listEvents](openapi.HubEventsApi.md#listevents)

## Constructors

### constructor

• **new HubEventsApi**(`configuration?`, `basePath?`, `axios?`)

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

### getEventById

▸ **getEventById**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`HubEvent`](../modules/openapi.md#hubevent), `any`\>\>

**`Summary`**

Get an event by its ID

**`Throws`**

**`Memberof`**

HubEventsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`HubEventsApiGetEventByIdRequest`](../interfaces/openapi.HubEventsApiGetEventByIdRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`HubEvent`](../modules/openapi.md#hubevent), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/hub-events-api.ts:216](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/hub-events-api.ts#L216)

___

### listEvents

▸ **listEvents**(`requestParameters?`, `options?`): `Promise`<`AxiosResponse`<[`ListEvents200Response`](../interfaces/openapi.ListEvents200Response.md), `any`\>\>

**`Summary`**

Get a page of Hub events

**`Throws`**

**`Memberof`**

HubEventsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`HubEventsApiListEventsRequest`](../interfaces/openapi.HubEventsApiListEventsRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`ListEvents200Response`](../interfaces/openapi.ListEvents200Response.md), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/hub-events-api.ts:228](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/hub-events-api.ts#L228)
