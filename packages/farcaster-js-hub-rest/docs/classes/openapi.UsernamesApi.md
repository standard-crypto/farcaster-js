[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / UsernamesApi

# Class: UsernamesApi

[openapi](../modules/openapi.md).UsernamesApi

UsernamesApi - object-oriented interface

**`Export`**

## Hierarchy

- `BaseAPI`

  ↳ **`UsernamesApi`**

## Table of contents

### Constructors

- [constructor](openapi.UsernamesApi.md#constructor)

### Properties

- [axios](openapi.UsernamesApi.md#axios)
- [basePath](openapi.UsernamesApi.md#basepath)
- [configuration](openapi.UsernamesApi.md#configuration)

### Methods

- [getUsernameProof](openapi.UsernamesApi.md#getusernameproof)
- [listUsernameProofsByFid](openapi.UsernamesApi.md#listusernameproofsbyfid)

## Constructors

### constructor

• **new UsernamesApi**(`configuration?`, `basePath?`, `axios?`)

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

### getUsernameProof

▸ **getUsernameProof**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`UserNameProof`](../interfaces/openapi.UserNameProof.md), `any`\>\>

**`Summary`**

Get an proof for a username by the Farcaster username

**`Throws`**

**`Memberof`**

UsernamesApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`UsernamesApiGetUsernameProofRequest`](../interfaces/openapi.UsernamesApiGetUsernameProofRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`UserNameProof`](../interfaces/openapi.UserNameProof.md), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/usernames-api.ts:218](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/usernames-api.ts#L218)

___

### listUsernameProofsByFid

▸ **listUsernameProofsByFid**(`requestParameters`, `options?`): `Promise`<`AxiosResponse`<[`UsernameProofsResponse`](../interfaces/openapi.UsernameProofsResponse.md), `any`\>\>

**`Summary`**

Get a list of proofs provided by an FID

**`Throws`**

**`Memberof`**

UsernamesApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestParameters` | [`UsernamesApiListUsernameProofsByFidRequest`](../interfaces/openapi.UsernamesApiListUsernameProofsByFidRequest.md) | Request parameters. |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`UsernameProofsResponse`](../interfaces/openapi.UsernameProofsResponse.md), `any`\>\>

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/usernames-api.ts:230](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/usernames-api.ts#L230)
