[@standard-crypto/farcaster-js](../README.md) / [Exports](../modules.md) / User

# Interface: User

Rich representation of a Farcaster user, including metadata

## Table of contents

### Properties

- [address](User.md#address)
- [avatar](User.md#avatar)
- [displayName](User.md#displayname)
- [farcasterId](User.md#farcasterid)
- [followerCount](User.md#followercount)
- [followingCount](User.md#followingcount)
- [isFollowingViewer](User.md#isfollowingviewer)
- [isViewerFollowing](User.md#isviewerfollowing)
- [profile](User.md#profile)
- [referrerUsername](User.md#referrerusername)
- [username](User.md#username)
- [viewerCanSendDirectCasts](User.md#viewercansenddirectcasts)

## Properties

### address

• **address**: `string`

The user's registered Ethereum address

#### Defined in

[api.ts:18](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L18)

___

### avatar

• **avatar**: `Object`

Details for the user's avatar

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isVerified` | `boolean` |
| `url` | `string` |

#### Defined in

[api.ts:29](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L29)

___

### displayName

• **displayName**: `string`

The user's full display name

#### Defined in

[api.ts:22](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L22)

___

### farcasterId

• **farcasterId**: `BigNumber`

The permanent ID associated with a user
(as opposed to usernames, which can be transferred and changed)

#### Defined in

[api.ts:27](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L27)

___

### followerCount

• **followerCount**: `number`

#### Defined in

[api.ts:33](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L33)

___

### followingCount

• **followingCount**: `number`

#### Defined in

[api.ts:34](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L34)

___

### isFollowingViewer

• **isFollowingViewer**: `boolean`

#### Defined in

[api.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L36)

___

### isViewerFollowing

• **isViewerFollowing**: `boolean`

#### Defined in

[api.ts:35](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L35)

___

### profile

• **profile**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bio` | { `mentions`: `string`[] ; `text`: `string`  } |
| `bio.mentions` | `string`[] |
| `bio.text` | `string` |
| `directMessageTargets?` | { `telegram?`: `string`  } |
| `directMessageTargets.telegram?` | `string` |

#### Defined in

[api.ts:37](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L37)

___

### referrerUsername

• **referrerUsername**: `string`

#### Defined in

[api.ts:46](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L46)

___

### username

• **username**: `string`

The user's currently assigned username (without the leading '@')

#### Defined in

[api.ts:20](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L20)

___

### viewerCanSendDirectCasts

• **viewerCanSendDirectCasts**: `boolean`

#### Defined in

[api.ts:47](https://github.com/standard-crypto/farcaster-js/blob/main/src/api.ts#L47)
