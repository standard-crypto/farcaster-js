[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [merkleAPI/swagger](../modules/merkleAPI_swagger.md) / BaseAPI

# Class: BaseAPI

[merkleAPI/swagger](../modules/merkleAPI_swagger.md).BaseAPI

**`Export`**

## Hierarchy

- **`BaseAPI`**

  ↳ [`AssetsApi`](merkleAPI_swagger.AssetsApi.md)

  ↳ [`AuthApi`](merkleAPI_swagger.AuthApi.md)

  ↳ [`CastsApi`](merkleAPI_swagger.CastsApi.md)

  ↳ [`FollowsApi`](merkleAPI_swagger.FollowsApi.md)

  ↳ [`MiscellaneousApi`](merkleAPI_swagger.MiscellaneousApi.md)

  ↳ [`NotificationsApi`](merkleAPI_swagger.NotificationsApi.md)

  ↳ [`UserApi`](merkleAPI_swagger.UserApi.md)

  ↳ [`UsersApi`](merkleAPI_swagger.UsersApi.md)

  ↳ [`VerificationsApi`](merkleAPI_swagger.VerificationsApi.md)

  ↳ [`WatchesApi`](merkleAPI_swagger.WatchesApi.md)

## Table of contents

### Constructors

- [constructor](merkleAPI_swagger.BaseAPI.md#constructor)

### Properties

- [axios](merkleAPI_swagger.BaseAPI.md#axios)
- [basePath](merkleAPI_swagger.BaseAPI.md#basepath)
- [configuration](merkleAPI_swagger.BaseAPI.md#configuration)

## Constructors

### constructor

• **new BaseAPI**(`configuration?`, `basePath?`, `axios?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `configuration?` | [`Configuration`](merkleAPI_swagger.Configuration.md) | `undefined` |
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

• `Protected` **configuration**: `undefined` \| [`Configuration`](merkleAPI_swagger.Configuration.md)

#### Defined in

[src/merkleAPI/swagger/base.ts:48](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L48)
