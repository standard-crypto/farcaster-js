[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / FIDsApiListFidsRequest

# Interface: FIDsApiListFidsRequest

[openapi](../modules/openapi.md).FIDsApiListFidsRequest

Request parameters for listFids operation in FIDsApi.

**`Export`**

FIDsApiListFidsRequest

## Table of contents

### Properties

- [pageSize](openapi.FIDsApiListFidsRequest.md#pagesize)
- [pageToken](openapi.FIDsApiListFidsRequest.md#pagetoken)
- [reverse](openapi.FIDsApiListFidsRequest.md#reverse)

## Properties

### pageSize

• `Optional` `Readonly` **pageSize**: `number`

Maximum number of messages to return in a single response

**`Memberof`**

FIDsApiListFids

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/fids-api.ts:136](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/fids-api.ts#L136)

___

### pageToken

• `Optional` `Readonly` **pageToken**: `string`

The page token returned by the previous query, to fetch the next page. If this parameter is empty, fetch the first page

**`Memberof`**

FIDsApiListFids

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/fids-api.ts:150](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/fids-api.ts#L150)

___

### reverse

• `Optional` `Readonly` **reverse**: `boolean`

Reverse the sort order, returning latest messages first

**`Memberof`**

FIDsApiListFids

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/fids-api.ts:143](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/fids-api.ts#L143)
