[@standard-crypto/farcaster-js](README.md) / Exports

# @standard-crypto/farcaster-js

## Table of contents

### Enumerations

- [MessageBodyType](enums/MessageBodyType.md)
- [ReactionType](enums/ReactionType.md)

### Interfaces

- [APIResult](interfaces/APIResult.md)
- [Message](interfaces/Message.md)
- [MessageBody](interfaces/MessageBody.md)
- [Meta](interfaces/Meta.md)
- [Reactions](interfaces/Reactions.md)
- [ReplyParentUsername](interfaces/ReplyParentUsername.md)
- [TokenCommunity](interfaces/TokenCommunity.md)
- [User](interfaces/User.md)

### Functions

- [serializeMessageBody](modules.md#serializemessagebody)

## Functions

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
