[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / ValidateMessageApi

# Class: ValidateMessageApi

[openapi](../modules/openapi.md).ValidateMessageApi

ValidateMessageApi - object-oriented interface

**`Export`**

## Hierarchy

- `BaseAPI`

  ↳ **`ValidateMessageApi`**

## Table of contents

### Constructors

- [constructor](openapi.ValidateMessageApi.md#constructor)

### Properties

- [axios](openapi.ValidateMessageApi.md#axios)
- [basePath](openapi.ValidateMessageApi.md#basepath)
- [configuration](openapi.ValidateMessageApi.md#configuration)

### Methods

- [validateMessage](openapi.ValidateMessageApi.md#validatemessage)

## Constructors

### constructor

• **new ValidateMessageApi**(`configuration?`, `basePath?`, `axios?`): [`ValidateMessageApi`](openapi.ValidateMessageApi.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `configuration?` | [`Configuration`](openapi.Configuration.md) | `undefined` |
| `basePath` | `string` | `BASE_PATH` |
| `axios` | `AxiosInstance` | `globalAxios` |

#### Returns

[`ValidateMessageApi`](openapi.ValidateMessageApi.md)

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

### validateMessage

▸ **validateMessage**(`requestParameters`, `options?`): `Promise`\<`AxiosResponse`\<[`ValidateMessageResponse`](../interfaces/openapi.ValidateMessageResponse.md), `any`\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`ValidateMessageApiValidateMessageRequest`](../interfaces/openapi.ValidateMessageApiValidateMessageRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`\<`any`\> | Override http request option. |

#### Returns

`Promise`\<`AxiosResponse`\<[`ValidateMessageResponse`](../interfaces/openapi.ValidateMessageResponse.md), `any`\>\>

**`Summary`**

Validate a signed protobuf-serialized message with the Hub

**`Throws`**

**`Memberof`**

ValidateMessageApi

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/validate-message-api.ts:147](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/validate-message-api.ts#L147)
