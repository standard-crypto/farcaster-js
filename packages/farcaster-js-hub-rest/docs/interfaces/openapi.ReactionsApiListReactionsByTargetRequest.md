[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / ReactionsApiListReactionsByTargetRequest

# Interface: ReactionsApiListReactionsByTargetRequest

[openapi](../modules/openapi.md).ReactionsApiListReactionsByTargetRequest

Request parameters for listReactionsByTarget operation in ReactionsApi.

**`Export`**

ReactionsApiListReactionsByTargetRequest

## Table of contents

### Properties

- [pageSize](openapi.ReactionsApiListReactionsByTargetRequest.md#pagesize)
- [pageToken](openapi.ReactionsApiListReactionsByTargetRequest.md#pagetoken)
- [reactionType](openapi.ReactionsApiListReactionsByTargetRequest.md#reactiontype)
- [reverse](openapi.ReactionsApiListReactionsByTargetRequest.md#reverse)
- [url](openapi.ReactionsApiListReactionsByTargetRequest.md#url)

## Properties

### pageSize

• `Optional` `Readonly` **pageSize**: `number`

Maximum number of messages to return in a single response

**`Memberof`**

ReactionsApiListReactionsByTarget

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:554](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L554)

___

### pageToken

• `Optional` `Readonly` **pageToken**: `string`

The page token returned by the previous query, to fetch the next page. If this parameter is empty, fetch the first page

**`Memberof`**

ReactionsApiListReactionsByTarget

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:568](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L568)

___

### reactionType

• `Readonly` **reactionType**: [`ReactionType`](../enums/openapi.ReactionType.md)

The type of reaction, either as a numerical enum value or string representation

**`Memberof`**

ReactionsApiListReactionsByTarget

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:547](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L547)

___

### reverse

• `Optional` `Readonly` **reverse**: `boolean`

Reverse the sort order, returning latest messages first

**`Memberof`**

ReactionsApiListReactionsByTarget

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:561](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L561)

___

### url

• `Readonly` **url**: `string`

The URL of the parent cast

**`Memberof`**

ReactionsApiListReactionsByTarget

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:540](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L540)
