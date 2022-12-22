[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / BaseAPI

# Class: BaseAPI

[index](../modules/index.md).BaseAPI

**`Export`**

## Hierarchy

- **`BaseAPI`**

  ↳ [`AssetsApi`](index.AssetsApi.md)

  ↳ [`AuthApi`](index.AuthApi.md)

  ↳ [`CastsApi`](index.CastsApi.md)

  ↳ [`FollowsApi`](index.FollowsApi.md)

  ↳ [`MiscellaneousApi`](index.MiscellaneousApi.md)

  ↳ [`NotificationsApi`](index.NotificationsApi.md)

  ↳ [`UserApi`](index.UserApi.md)

  ↳ [`UsersApi`](index.UsersApi.md)

  ↳ [`VerificationsApi`](index.VerificationsApi.md)

  ↳ [`WatchesApi`](index.WatchesApi.md)

## Table of contents

### Constructors

- [constructor](index.BaseAPI.md#constructor)

### Properties

- [axios](index.BaseAPI.md#axios)
- [basePath](index.BaseAPI.md#basepath)
- [configuration](index.BaseAPI.md#configuration)

## Constructors

### constructor

• **new BaseAPI**(`configuration?`, `basePath?`, `axios?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `configuration?` | [`Configuration`](index.Configuration.md) | `undefined` |
| `basePath` | `string` | `BASE_PATH` |
| `axios` | `AxiosInstance` | `globalAxios` |

#### Defined in

[src/merkleAPI/swagger/base.ts:50](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L50)

## Properties

### axios

• `Protected` **axios**: `AxiosInstance` = `globalAxios`

#### Defined in

[src/merkleAPI/swagger/base.ts:53](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L53)

___

### basePath

• `Protected` **basePath**: `string` = `BASE_PATH`

#### Defined in

[src/merkleAPI/swagger/base.ts:52](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L52)

___

### configuration

• `Protected` **configuration**: `undefined` \| [`Configuration`](index.Configuration.md)

#### Defined in

[src/merkleAPI/swagger/base.ts:48](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L48)
