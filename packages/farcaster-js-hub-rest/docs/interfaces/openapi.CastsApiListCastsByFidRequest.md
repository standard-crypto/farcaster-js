[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / CastsApiListCastsByFidRequest

# Interface: CastsApiListCastsByFidRequest

[openapi](../modules/openapi.md).CastsApiListCastsByFidRequest

Request parameters for listCastsByFid operation in CastsApi.

**`Export`**

CastsApiListCastsByFidRequest

## Table of contents

### Properties

- [fid](openapi.CastsApiListCastsByFidRequest.md#fid)
- [pageSize](openapi.CastsApiListCastsByFidRequest.md#pagesize)
- [pageToken](openapi.CastsApiListCastsByFidRequest.md#pagetoken)
- [reverse](openapi.CastsApiListCastsByFidRequest.md#reverse)

## Properties

### fid

• `Readonly` **fid**: `number`

The FID of the casts\&#39; creator

**`Memberof`**

CastsApiListCastsByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts:395](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts#L395)

___

### pageSize

• `Optional` `Readonly` **pageSize**: `number`

Maximum number of messages to return in a single response

**`Memberof`**

CastsApiListCastsByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts:402](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts#L402)

___

### pageToken

• `Optional` `Readonly` **pageToken**: `string`

The page token returned by the previous query, to fetch the next page. If this parameter is empty, fetch the first page

**`Memberof`**

CastsApiListCastsByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts:416](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts#L416)

___

### reverse

• `Optional` `Readonly` **reverse**: `boolean`

Reverse the sort order, returning latest messages first

**`Memberof`**

CastsApiListCastsByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts:409](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts#L409)
