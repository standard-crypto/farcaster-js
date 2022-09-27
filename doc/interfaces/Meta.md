[@standard-crypto/farcaster-js](../README.md) / [Exports](../modules.md) / Meta

# Interface: Meta

## Table of contents

### Properties

- [avatar](Meta.md#avatar)
- [displayName](Meta.md#displayname)
- [isVerifiedAvatar](Meta.md#isverifiedavatar)
- [mentions](Meta.md#mentions)
- [numReplyChildren](Meta.md#numreplychildren)
- [reactions](Meta.md#reactions)
- [recast](Meta.md#recast)
- [recasters](Meta.md#recasters)
- [recasts](Meta.md#recasts)
- [replyParentUsername](Meta.md#replyparentusername)
- [watches](Meta.md#watches)

## Properties

### avatar

• **avatar**: `string`

#### Defined in

[api.ts:89](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L89)

___

### displayName

• **displayName**: `string`

#### Defined in

[api.ts:88](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L88)

___

### isVerifiedAvatar

• **isVerifiedAvatar**: `boolean`

#### Defined in

[api.ts:90](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L90)

___

### mentions

• `Optional` **mentions**: [`ReplyParentUsername`](ReplyParentUsername.md)[]

#### Defined in

[api.ts:93](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L93)

___

### numReplyChildren

• **numReplyChildren**: `number`

#### Defined in

[api.ts:91](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L91)

___

### reactions

• **reactions**: [`Reactions`](Reactions.md)

#### Defined in

[api.ts:92](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L92)

___

### recast

• `Optional` **recast**: `boolean`

#### Defined in

[api.ts:104](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L104)

___

### recasters

• `Optional` **recasters**: `Omit`<[`User`](User.md), ``"farcasterId"``\>

#### Defined in

[api.ts:95](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L95)

___

### recasts

• `Optional` **recasts**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `count` | `number` |
| `self` | `boolean` |

#### Defined in

[api.ts:96](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L96)

___

### replyParentUsername

• `Optional` **replyParentUsername**: [`ReplyParentUsername`](ReplyParentUsername.md)

#### Defined in

[api.ts:94](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L94)

___

### watches

• `Optional` **watches**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `count` | `number` |
| `self` | `boolean` |

#### Defined in

[api.ts:100](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L100)
