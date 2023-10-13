[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / ReactionsApiGetReactionByIdRequest

# Interface: ReactionsApiGetReactionByIdRequest

[openapi](../modules/openapi.md).ReactionsApiGetReactionByIdRequest

Request parameters for getReactionById operation in ReactionsApi.

**`Export`**

ReactionsApiGetReactionByIdRequest

## Table of contents

### Properties

- [fid](openapi.ReactionsApiGetReactionByIdRequest.md#fid)
- [reactionType](openapi.ReactionsApiGetReactionByIdRequest.md#reactiontype)
- [targetFid](openapi.ReactionsApiGetReactionByIdRequest.md#targetfid)
- [targetHash](openapi.ReactionsApiGetReactionByIdRequest.md#targethash)

## Properties

### fid

• `Readonly` **fid**: `number`

The FID of the reaction\&#39;s creator

**`Memberof`**

ReactionsApiGetReactionById

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:414](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L414)

___

### reactionType

• `Readonly` **reactionType**: [`ReactionType`](../enums/openapi.ReactionType.md)

The type of reaction, either as a numerical enum value or string representation

**`Memberof`**

ReactionsApiGetReactionById

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:435](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L435)

___

### targetFid

• `Readonly` **targetFid**: `number`

The FID of the cast\&#39;s creator

**`Memberof`**

ReactionsApiGetReactionById

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:421](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L421)

___

### targetHash

• `Readonly` **targetHash**: `string`

The cast\&#39;s hash

**`Memberof`**

ReactionsApiGetReactionById

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:428](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L428)
