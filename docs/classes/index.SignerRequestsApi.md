[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / SignerRequestsApi

# Class: SignerRequestsApi

[index](../modules/index.md).SignerRequestsApi

SignerRequestsApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](index.BaseAPI.md)

  ↳ **`SignerRequestsApi`**

## Table of contents

### Constructors

- [constructor](index.SignerRequestsApi.md#constructor)

### Properties

- [axios](index.SignerRequestsApi.md#axios)
- [basePath](index.SignerRequestsApi.md#basepath)
- [configuration](index.SignerRequestsApi.md#configuration)

### Methods

- [v2SignerRequestGet](index.SignerRequestsApi.md#v2signerrequestget)
- [v2SignerRequestsPost](index.SignerRequestsApi.md#v2signerrequestspost)

## Constructors

### constructor

• **new SignerRequestsApi**(`configuration?`, `basePath?`, `axios?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `configuration?` | [`Configuration`](index.Configuration.md) | `undefined` |
| `basePath` | `string` | `BASE_PATH` |
| `axios` | `AxiosInstance` | `globalAxios` |

#### Inherited from

[BaseAPI](index.BaseAPI.md).[constructor](index.BaseAPI.md#constructor)

#### Defined in

[src/merkleAPI/swagger/base.ts:50](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L50)

## Properties

### axios

• `Protected` **axios**: `AxiosInstance` = `globalAxios`

#### Inherited from

[BaseAPI](index.BaseAPI.md).[axios](index.BaseAPI.md#axios)

#### Defined in

[src/merkleAPI/swagger/base.ts:53](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L53)

___

### basePath

• `Protected` **basePath**: `string` = `BASE_PATH`

#### Inherited from

[BaseAPI](index.BaseAPI.md).[basePath](index.BaseAPI.md#basepath)

#### Defined in

[src/merkleAPI/swagger/base.ts:52](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L52)

___

### configuration

• `Protected` **configuration**: `undefined` \| [`Configuration`](index.Configuration.md)

#### Inherited from

[BaseAPI](index.BaseAPI.md).[configuration](index.BaseAPI.md#configuration)

#### Defined in

[src/merkleAPI/swagger/base.ts:48](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L48)

## Methods

### v2SignerRequestGet

▸ **v2SignerRequestGet**(`token`, `options?`): `Promise`<`AxiosResponse`<[`V2SignerRequestGet200Response`](../interfaces/index.V2SignerRequestGet200Response.md), `any`\>\>

Gets information about a Signer Request. This URL can be polled to check if a user has completed the Signer Request flow.

**`Throws`**

**`Memberof`**

SignerRequestsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`V2SignerRequestGet200Response`](../interfaces/index.V2SignerRequestGet200Response.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/signer-requests-api.ts:265](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/signer-requests-api.ts#L265)

___

### v2SignerRequestsPost

▸ **v2SignerRequestsPost**(`body?`, `options?`): `Promise`<`AxiosResponse`<[`V2SignerRequestsPost200Response`](../interfaces/index.V2SignerRequestsPost200Response.md), `any`\>\>

Creates a signer request used to initiate a signer request flow for a user in Warpcast. A Signer Request expires in 24 hours.

**`Throws`**

**`Memberof`**

SignerRequestsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body?` | [`V2SignerRequestsPostRequest`](../interfaces/index.V2SignerRequestsPostRequest.md) |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`V2SignerRequestsPost200Response`](../interfaces/index.V2SignerRequestsPost200Response.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/signer-requests-api.ts:278](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/signer-requests-api.ts#L278)
