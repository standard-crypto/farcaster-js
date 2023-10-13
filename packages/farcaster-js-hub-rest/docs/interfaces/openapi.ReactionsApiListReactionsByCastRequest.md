[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / ReactionsApiListReactionsByCastRequest

# Interface: ReactionsApiListReactionsByCastRequest

[openapi](../modules/openapi.md).ReactionsApiListReactionsByCastRequest

Request parameters for listReactionsByCast operation in ReactionsApi.

**`Export`**

ReactionsApiListReactionsByCastRequest

## Table of contents

### Properties

- [pageSize](openapi.ReactionsApiListReactionsByCastRequest.md#pagesize)
- [pageToken](openapi.ReactionsApiListReactionsByCastRequest.md#pagetoken)
- [reactionType](openapi.ReactionsApiListReactionsByCastRequest.md#reactiontype)
- [reverse](openapi.ReactionsApiListReactionsByCastRequest.md#reverse)
- [targetFid](openapi.ReactionsApiListReactionsByCastRequest.md#targetfid)
- [targetHash](openapi.ReactionsApiListReactionsByCastRequest.md#targethash)

## Properties

### pageSize

• `Optional` `Readonly` **pageSize**: `number`

Maximum number of messages to return in a single response

**`Memberof`**

ReactionsApiListReactionsByCast

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:467](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L467)

___

### pageToken

• `Optional` `Readonly` **pageToken**: `string`

The page token returned by the previous query, to fetch the next page. If this parameter is empty, fetch the first page

**`Memberof`**

ReactionsApiListReactionsByCast

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:481](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L481)

___

### reactionType

• `Readonly` **reactionType**: [`ReactionType`](../enums/openapi.ReactionType.md)

The type of reaction, either as a numerical enum value or string representation

**`Memberof`**

ReactionsApiListReactionsByCast

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:460](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L460)

___

### reverse

• `Optional` `Readonly` **reverse**: `boolean`

Reverse the sort order, returning latest messages first

**`Memberof`**

ReactionsApiListReactionsByCast

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:474](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L474)

___

### targetFid

• `Readonly` **targetFid**: `number`

The FID of the cast\&#39;s creator

**`Memberof`**

ReactionsApiListReactionsByCast

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:446](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L446)

___

### targetHash

• `Readonly` **targetHash**: `string`

The hash of the cast

**`Memberof`**

ReactionsApiListReactionsByCast

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:453](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L453)
