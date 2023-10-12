[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / UserDataApiGetUserDataByFidRequest

# Interface: UserDataApiGetUserDataByFidRequest

[openapi](../modules/openapi.md).UserDataApiGetUserDataByFidRequest

Request parameters for getUserDataByFid operation in UserDataApi.

**`Export`**

UserDataApiGetUserDataByFidRequest

## Table of contents

### Properties

- [fid](openapi.UserDataApiGetUserDataByFidRequest.md#fid)
- [pageSize](openapi.UserDataApiGetUserDataByFidRequest.md#pagesize)
- [pageToken](openapi.UserDataApiGetUserDataByFidRequest.md#pagetoken)
- [reverse](openapi.UserDataApiGetUserDataByFidRequest.md#reverse)
- [userDataType](openapi.UserDataApiGetUserDataByFidRequest.md#userdatatype)

## Properties

### fid

• `Readonly` **fid**: `number`

The FID that\&#39;s being requested

**`Memberof`**

UserDataApiGetUserDataByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts:152](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts#L152)

___

### pageSize

• `Optional` `Readonly` **pageSize**: `number`

Maximum number of messages to return in a single response

**`Memberof`**

UserDataApiGetUserDataByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts:166](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts#L166)

___

### pageToken

• `Optional` `Readonly` **pageToken**: `string`

The page token returned by the previous query, to fetch the next page. If this parameter is empty, fetch the first page

**`Memberof`**

UserDataApiGetUserDataByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts:180](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts#L180)

___

### reverse

• `Optional` `Readonly` **reverse**: `boolean`

Reverse the sort order, returning latest messages first

**`Memberof`**

UserDataApiGetUserDataByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts:173](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts#L173)

___

### userDataType

• `Optional` `Readonly` **userDataType**: [`UserDataType`](../enums/openapi.UserDataType.md)

The type of user data, either as a numerical value or type string. If this is omitted, all user data for the FID is returned

**`Memberof`**

UserDataApiGetUserDataByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts:159](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts#L159)
