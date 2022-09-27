[@standard-crypto/farcaster-js](README.md) / Exports

# @standard-crypto/farcaster-js

## Table of contents

### Enumerations

- [MessageBodyType](enums/MessageBodyType.md)
- [ReactionType](enums/ReactionType.md)

### Classes

- [Farcaster](classes/Farcaster.md)
- [FarcasterContentHost](classes/FarcasterContentHost.md)
- [UserRegistry](classes/UserRegistry.md)

### Interfaces

- [APIResult](interfaces/APIResult.md)
- [CastRequest](interfaces/CastRequest.md)
- [Message](interfaces/Message.md)
- [MessageBody](interfaces/MessageBody.md)
- [Meta](interfaces/Meta.md)
- [Reactions](interfaces/Reactions.md)
- [ReplyParentUsername](interfaces/ReplyParentUsername.md)
- [TokenCommunity](interfaces/TokenCommunity.md)
- [User](interfaces/User.md)

### Type Aliases

- [SignedCast](modules.md#signedcast)

### Variables

- [CAST\_CHARACTER\_LIMIT](modules.md#cast_character_limit)

### Functions

- [publishCast](modules.md#publishcast)
- [serializeMessageBody](modules.md#serializemessagebody)

## Type Aliases

### SignedCast

Ƭ **SignedCast**: `Omit`<[`Message`](interfaces/Message.md), ``"meta"``\>

#### Defined in

[contentHost/index.ts:3](https://github.com/standard-crypto/farcaster-js/blob/main/src/contentHost/index.ts#L3)

## Variables

### CAST\_CHARACTER\_LIMIT

• `Const` **CAST\_CHARACTER\_LIMIT**: ``280``

#### Defined in

[farcaster.ts:10](https://github.com/standard-crypto/farcaster-js/blob/main/src/farcaster.ts#L10)

## Functions

### publishCast

▸ **publishCast**(`wallet`, `text`, `replyTo?`): `Promise`<[`SignedCast`](modules.md#signedcast)\>

Signs and publishes a simple text string.
The cast will be attributed to the username currently registered
to the given private key's address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `wallet` | `Wallet` | A Wallet derived from a private key or mnemonic phrase |
| `text` | `string` | The text to be cast |
| `replyTo?` | `string` \| [`Message`](interfaces/Message.md) | A complete [Message](interfaces/Message.md), or the [merkleRoot](interfaces/Message.md#merkleroot) of a message, that this cast will reply to. Omit if not replying to any casts. |

#### Returns

`Promise`<[`SignedCast`](modules.md#signedcast)\>

#### Defined in

[index.ts:16](https://github.com/standard-crypto/farcaster-js/blob/main/src/index.ts#L16)

___

### serializeMessageBody

▸ **serializeMessageBody**(`body`): `string`

Returns the canonical serialization of a [MessageBody](interfaces/MessageBody.md).
Required for producing and verifying signatures.

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | [`MessageBody`](interfaces/MessageBody.md) |

#### Returns

`string`

#### Defined in

[serialization.ts:7](https://github.com/standard-crypto/farcaster-js/blob/main/src/serialization.ts#L7)
