[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / VerificationsApi

# Class: VerificationsApi

[openapi](../modules/openapi.md).VerificationsApi

VerificationsApi - object-oriented interface

**`Export`**

## Hierarchy

- `BaseAPI`

  ↳ **`VerificationsApi`**

## Table of contents

### Constructors

- [constructor](openapi.VerificationsApi.md#constructor)

### Properties

- [axios](openapi.VerificationsApi.md#axios)
- [basePath](openapi.VerificationsApi.md#basepath)
- [configuration](openapi.VerificationsApi.md#configuration)

### Methods

- [listVerificationsByFid](openapi.VerificationsApi.md#listverificationsbyfid)

## Constructors

### constructor

• **new VerificationsApi**(`configuration?`, `basePath?`, `axios?`)

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

### listVerificationsByFid

▸ **listVerificationsByFid**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`ListVerificationsByFid200Response`](../interfaces/openapi.ListVerificationsByFid200Response.md), `any`\>\>

**`Summary`**

Get a list of verifications provided by an FID

**`Throws`**

**`Memberof`**

VerificationsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`VerificationsApiListVerificationsByFidRequest`](../interfaces/openapi.VerificationsApiListVerificationsByFidRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`ListVerificationsByFid200Response`](../interfaces/openapi.ListVerificationsByFid200Response.md), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts:196](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts#L196)
