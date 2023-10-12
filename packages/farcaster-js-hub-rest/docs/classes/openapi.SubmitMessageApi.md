[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / SubmitMessageApi

# Class: SubmitMessageApi

[openapi](../modules/openapi.md).SubmitMessageApi

SubmitMessageApi - object-oriented interface

**`Export`**

## Hierarchy

- `BaseAPI`

  ↳ **`SubmitMessageApi`**

## Table of contents

### Constructors

- [constructor](openapi.SubmitMessageApi.md#constructor)

### Properties

- [axios](openapi.SubmitMessageApi.md#axios)
- [basePath](openapi.SubmitMessageApi.md#basepath)
- [configuration](openapi.SubmitMessageApi.md#configuration)

### Methods

- [submitMessage](openapi.SubmitMessageApi.md#submitmessage)

## Constructors

### constructor

• **new SubmitMessageApi**(`configuration?`, `basePath?`, `axios?`)

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

### submitMessage

▸ **submitMessage**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`Message`](../modules/openapi.md#message), `any`\>\>

**`Summary`**

Submit a signed protobuf-serialized message to the Hub

**`Throws`**

**`Memberof`**

SubmitMessageApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`SubmitMessageApiSubmitMessageRequest`](../interfaces/openapi.SubmitMessageApiSubmitMessageRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`Message`](../modules/openapi.md#message), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/submit-message-api.ts:147](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/submit-message-api.ts#L147)
