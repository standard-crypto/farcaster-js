[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / ReactionsApiListReactionsByFidRequest

# Interface: ReactionsApiListReactionsByFidRequest

[openapi](../modules/openapi.md).ReactionsApiListReactionsByFidRequest

Request parameters for listReactionsByFid operation in ReactionsApi.

**`Export`**

ReactionsApiListReactionsByFidRequest

## Table of contents

### Properties

- [fid](openapi.ReactionsApiListReactionsByFidRequest.md#fid)
- [pageSize](openapi.ReactionsApiListReactionsByFidRequest.md#pagesize)
- [pageToken](openapi.ReactionsApiListReactionsByFidRequest.md#pagetoken)
- [reactionType](openapi.ReactionsApiListReactionsByFidRequest.md#reactiontype)
- [reverse](openapi.ReactionsApiListReactionsByFidRequest.md#reverse)

## Properties

### fid

• `Readonly` **fid**: `number`

The FID of the reaction\&#39;s creator

**`Memberof`**

ReactionsApiListReactionsByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:495](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L495)

___

### pageSize

• `Optional` `Readonly` **pageSize**: `number`

Maximum number of messages to return in a single response

**`Memberof`**

ReactionsApiListReactionsByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:509](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L509)

___

### pageToken

• `Optional` `Readonly` **pageToken**: `string`

The page token returned by the previous query, to fetch the next page. If this parameter is empty, fetch the first page

**`Memberof`**

ReactionsApiListReactionsByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:523](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L523)

___

### reactionType

• `Readonly` **reactionType**: [`ReactionType`](../enums/openapi.ReactionType.md)

The type of reaction, either as a numerical enum value or string representation

**`Memberof`**

ReactionsApiListReactionsByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:502](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L502)

___

### reverse

• `Optional` `Readonly` **reverse**: `boolean`

Reverse the sort order, returning latest messages first

**`Memberof`**

ReactionsApiListReactionsByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:516](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L516)
