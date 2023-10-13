[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / CastsApiListCastsByMentionRequest

# Interface: CastsApiListCastsByMentionRequest

[openapi](../modules/openapi.md).CastsApiListCastsByMentionRequest

Request parameters for listCastsByMention operation in CastsApi.

**`Export`**

CastsApiListCastsByMentionRequest

## Table of contents

### Properties

- [fid](openapi.CastsApiListCastsByMentionRequest.md#fid)
- [pageSize](openapi.CastsApiListCastsByMentionRequest.md#pagesize)
- [pageToken](openapi.CastsApiListCastsByMentionRequest.md#pagetoken)
- [reverse](openapi.CastsApiListCastsByMentionRequest.md#reverse)

## Properties

### fid

• `Readonly` **fid**: `number`

The FID that is mentioned in a cast

**`Memberof`**

CastsApiListCastsByMention

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts:430](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts#L430)

___

### pageSize

• `Optional` `Readonly` **pageSize**: `number`

Maximum number of messages to return in a single response

**`Memberof`**

CastsApiListCastsByMention

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts:437](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts#L437)

___

### pageToken

• `Optional` `Readonly` **pageToken**: `string`

The page token returned by the previous query, to fetch the next page. If this parameter is empty, fetch the first page

**`Memberof`**

CastsApiListCastsByMention

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts:451](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts#L451)

___

### reverse

• `Optional` `Readonly` **reverse**: `boolean`

Reverse the sort order, returning latest messages first

**`Memberof`**

CastsApiListCastsByMention

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts:444](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts#L444)
