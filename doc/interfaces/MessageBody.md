[@standard-crypto/farcaster-js](../README.md) / [Exports](../modules.md) / MessageBody

# Interface: MessageBody

A message published by a user, such as a short text cast.

## Table of contents

### Properties

- [address](MessageBody.md#address)
- [data](MessageBody.md#data)
- [prevMerkleRoot](MessageBody.md#prevmerkleroot)
- [publishedAt](MessageBody.md#publishedat)
- [sequence](MessageBody.md#sequence)
- [tokenCommunities](MessageBody.md#tokencommunities)
- [type](MessageBody.md#type)
- [username](MessageBody.md#username)

## Properties

### address

• **address**: `string`

The address owning the user at the time this was published

#### Defined in

[api.ts:73](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L73)

___

### data

• **data**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `replyParentMerkleRoot?` | `string` |
| `text` | `string` |

#### Defined in

[api.ts:74](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L74)

___

### prevMerkleRoot

• **prevMerkleRoot**: `string`

The `merkleRoot` value of the previous action by this user

#### Defined in

[api.ts:79](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L79)

___

### publishedAt

• **publishedAt**: `number`

Timestamp in epoch milliseconds

#### Defined in

[api.ts:68](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L68)

___

### sequence

• **sequence**: `number`

The index of this action in the sequence of all messages by this user. Zero-indexed.

#### Defined in

[api.ts:70](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L70)

___

### tokenCommunities

• `Optional` **tokenCommunities**: [`TokenCommunity`](TokenCommunity.md)[]

#### Defined in

[api.ts:80](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L80)

___

### type

• **type**: [`TextShort`](../enums/MessageBodyType.md#textshort)

The type of message this represents

#### Defined in

[api.ts:66](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L66)

___

### username

• **username**: `string`

#### Defined in

[api.ts:71](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L71)
