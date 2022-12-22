[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / NotificationsApi

# Class: NotificationsApi

[index](../modules/index.md).NotificationsApi

NotificationsApi - object-oriented interface

**`Export`**

## Hierarchy

- [`BaseAPI`](index.BaseAPI.md)

  ↳ **`NotificationsApi`**

## Table of contents

### Constructors

- [constructor](index.NotificationsApi.md#constructor)

### Properties

- [axios](index.NotificationsApi.md#axios)
- [basePath](index.NotificationsApi.md#basepath)
- [configuration](index.NotificationsApi.md#configuration)

### Methods

- [v2MentionAndReplyNotificationsGet](index.NotificationsApi.md#v2mentionandreplynotificationsget)

## Constructors

### constructor

• **new NotificationsApi**(`configuration?`, `basePath?`, `axios?`)

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

### v2MentionAndReplyNotificationsGet

▸ **v2MentionAndReplyNotificationsGet**(`limit`, `authorization`, `cursor?`, `options?`): `Promise`<`AxiosResponse`<[`InlineResponse20014`](../interfaces/index.InlineResponse20014.md), `any`\>\>

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

`Promise`<`AxiosResponse`<[`InlineResponse20014`](../interfaces/index.InlineResponse20014.md), `any`\>\>

#### Defined in

[src/merkleAPI/swagger/apis/notifications-api.ts:217](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/apis/notifications-api.ts#L217)
