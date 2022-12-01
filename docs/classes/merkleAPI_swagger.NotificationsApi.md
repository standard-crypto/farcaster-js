[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [merkleAPI/swagger](../modules/merkleAPI_swagger.md) / NotificationsApi

# Class: NotificationsApi

[merkleAPI/swagger](../modules/merkleAPI_swagger.md).NotificationsApi

NotificationsApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](merkleAPI_swagger.BaseAPI.md)

  ↳ **`NotificationsApi`**

## Table of contents

### Constructors

- [constructor](merkleAPI_swagger.NotificationsApi.md#constructor)

### Properties

- [axios](merkleAPI_swagger.NotificationsApi.md#axios)
- [basePath](merkleAPI_swagger.NotificationsApi.md#basepath)
- [configuration](merkleAPI_swagger.NotificationsApi.md#configuration)

### Methods

- [v2MentionAndReplyNotificationsGet](merkleAPI_swagger.NotificationsApi.md#v2mentionandreplynotificationsget)

## Constructors

### constructor

• **new NotificationsApi**(`configuration?`, `basePath?`, `axios?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `configuration?` | [`Configuration`](merkleAPI_swagger.Configuration.md) | `undefined` |
| `basePath` | `string` | `BASE_PATH` |
| `axios` | `AxiosInstance` | `globalAxios` |

#### Inherited from

[BaseAPI](merkleAPI_swagger.BaseAPI.md).[constructor](merkleAPI_swagger.BaseAPI.md#constructor)

#### Defined in

[src/merkleAPI/swagger/base.ts:50](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L50)

## Properties

### axios

• `Protected` **axios**: `AxiosInstance` = `globalAxios`

#### Inherited from

[BaseAPI](merkleAPI_swagger.BaseAPI.md).[axios](merkleAPI_swagger.BaseAPI.md#axios)

#### Defined in

[src/merkleAPI/swagger/base.ts:53](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L53)

___

### basePath

• `Protected` **basePath**: `string` = `BASE_PATH`

#### Inherited from

[BaseAPI](merkleAPI_swagger.BaseAPI.md).[basePath](merkleAPI_swagger.BaseAPI.md#basepath)

#### Defined in

[src/merkleAPI/swagger/base.ts:52](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L52)

___

### configuration

• `Protected` **configuration**: `undefined` \| [`Configuration`](merkleAPI_swagger.Configuration.md)

#### Inherited from

[BaseAPI](merkleAPI_swagger.BaseAPI.md).[configuration](merkleAPI_swagger.BaseAPI.md#configuration)

#### Defined in

[src/merkleAPI/swagger/base.ts:48](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L48)

## Methods

### v2MentionAndReplyNotificationsGet

▸ **v2MentionAndReplyNotificationsGet**(`limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse20014`](../interfaces/merkleAPI_swagger.InlineResponse20014.md), `any`\>\>

Get notifications where the authenticated user was mentioned.

**`Throws`**

**`Memberof`**

NotificationsApi

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `limit` | `number` |  |
| `authorization` | `string` |  |
| `cursor?` | `string` |  |
| `options?` | `AxiosRequestConfig`<`any`\> | Override http request option. |

#### Returns

`Promise`<`AxiosResponse`<[`InlineResponse20014`](../interfaces/merkleAPI_swagger.InlineResponse20014.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/notifications-api.ts:217](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/notifications-api.ts#L217)
