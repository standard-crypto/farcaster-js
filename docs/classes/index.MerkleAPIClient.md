[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / MerkleAPIClient

# Class: MerkleAPIClient

[index](../modules/index.md).MerkleAPIClient

## Table of contents

### Constructors

- [constructor](index.MerkleAPIClient.md#constructor)

### Properties

- [apis](index.MerkleAPIClient.md#apis)

### Methods

- [createAuthToken](index.MerkleAPIClient.md#createauthtoken)
- [deleteCast](index.MerkleAPIClient.md#deletecast)
- [deleteRecast](index.MerkleAPIClient.md#deleterecast)
- [fetchCastsForUser](index.MerkleAPIClient.md#fetchcastsforuser)
- [fetchCurrentUser](index.MerkleAPIClient.md#fetchcurrentuser)
- [fetchCustodyAddressForUser](index.MerkleAPIClient.md#fetchcustodyaddressforuser)
- [fetchLatestCastForUser](index.MerkleAPIClient.md#fetchlatestcastforuser)
- [fetchMentionAndReplyNotifications](index.MerkleAPIClient.md#fetchmentionandreplynotifications)
- [fetchUserAssetCollections](index.MerkleAPIClient.md#fetchuserassetcollections)
- [fetchUserAssetsInCollection](index.MerkleAPIClient.md#fetchuserassetsincollection)
- [fetchUserFollowers](index.MerkleAPIClient.md#fetchuserfollowers)
- [fetchUserFollowing](index.MerkleAPIClient.md#fetchuserfollowing)
- [followUser](index.MerkleAPIClient.md#followuser)
- [getOrCreateValidAuthToken](index.MerkleAPIClient.md#getorcreatevalidauthtoken)
- [lookupUserByFid](index.MerkleAPIClient.md#lookupuserbyfid)
- [lookupUserByUsername](index.MerkleAPIClient.md#lookupuserbyusername)
- [publishCast](index.MerkleAPIClient.md#publishcast)
- [reactToCast](index.MerkleAPIClient.md#reacttocast)
- [recast](index.MerkleAPIClient.md#recast)
- [removeReactionToCast](index.MerkleAPIClient.md#removereactiontocast)
- [revokeAuthToken](index.MerkleAPIClient.md#revokeauthtoken)
- [unfollowUser](index.MerkleAPIClient.md#unfollowuser)
- [unwatchCast](index.MerkleAPIClient.md#unwatchcast)
- [watchCast](index.MerkleAPIClient.md#watchcast)

## Constructors

### constructor

• **new MerkleAPIClient**(`wallet`, `__namedParameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `wallet` | `Wallet` |
| `__namedParameters` | `Object` |
| `__namedParameters.axiosInstance?` | `AxiosInstance` |
| `__namedParameters.logger?` | [`Logger`](../interfaces/index.Logger.md) |

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:56](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L56)

## Properties

### apis

• `Readonly` **apis**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `assets` | [`AssetsApi`](merkleAPI_swagger.AssetsApi.md) |
| `auth` | [`AuthApi`](merkleAPI_swagger.AuthApi.md) |
| `casts` | [`CastsApi`](merkleAPI_swagger.CastsApi.md) |
| `follows` | [`FollowsApi`](merkleAPI_swagger.FollowsApi.md) |
| `notifications` | [`NotificationsApi`](merkleAPI_swagger.NotificationsApi.md) |
| `user` | [`UserApi`](merkleAPI_swagger.UserApi.md) |
| `users` | [`UsersApi`](merkleAPI_swagger.UsersApi.md) |
| `watches` | [`WatchesApi`](merkleAPI_swagger.WatchesApi.md) |

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:45](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L45)

## Methods

### createAuthToken

▸ **createAuthToken**(`expiryDurationMillis?`): `Promise`<[`AuthToken`](../interfaces/merkleAPI_swagger.AuthToken.md)\>

Creates a new auth token from the signing key of the Wallet
configured with this API client.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `expiryDurationMillis` | `number` | `TEN_MINUTES_IN_MILLIS` |

#### Returns

`Promise`<[`AuthToken`](../interfaces/merkleAPI_swagger.AuthToken.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:95](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L95)

___

### deleteCast

▸ **deleteCast**(`castOrCastHash`): `Promise`<`void`\>

Delete a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `castOrCastHash` | `string` \| [`Cast`](../interfaces/merkleAPI_swagger.Cast.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:138](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L138)

___

### deleteRecast

▸ **deleteRecast**(`castOrCastHash`): `Promise`<`void`\>

Delete a recast

#### Parameters

| Name | Type |
| :------ | :------ |
| `castOrCastHash` | `string` \| [`Cast`](../interfaces/merkleAPI_swagger.Cast.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:152](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L152)

___

### fetchCastsForUser

▸ **fetchCastsForUser**(`user`, `__namedParameters?`): `AsyncGenerator`<[`Cast`](../interfaces/merkleAPI_swagger.Cast.md), `void`, `undefined`\>

Gets all casts (including replies and recasts) created by the specified user.

@Note: Deleted cast filtering is applied server-side while recast filtering is applied
client-side.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `__namedParameters` | `Object` |
| `__namedParameters.includeDeletedCasts` | `undefined` \| `boolean` |
| `__namedParameters.includeRecasts` | `undefined` \| `boolean` |
| `__namedParameters.pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`Cast`](../interfaces/merkleAPI_swagger.Cast.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:169](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L169)

___

### fetchCurrentUser

▸ **fetchCurrentUser**(): `Promise`<[`User`](../interfaces/merkleAPI_swagger.User.md)\>

Gets the currently authenticated user

#### Returns

`Promise`<[`User`](../interfaces/merkleAPI_swagger.User.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:205](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L205)

___

### fetchCustodyAddressForUser

▸ **fetchCustodyAddressForUser**(`userOrUsername`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userOrUsername` | `string` \| [`User`](../interfaces/merkleAPI_swagger.User.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:211](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L211)

___

### fetchLatestCastForUser

▸ **fetchLatestCastForUser**(`user`, `includeRecasts?`): `Promise`<`undefined` \| [`Cast`](../interfaces/merkleAPI_swagger.Cast.md)\>

Fetch the latest cast for the user, if there is one

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `user` | `Object` | `undefined` |
| `user.fid` | `number` | `undefined` |
| `includeRecasts` | `boolean` | `false` |

#### Returns

`Promise`<`undefined` \| [`Cast`](../interfaces/merkleAPI_swagger.Cast.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:230](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L230)

___

### fetchMentionAndReplyNotifications

▸ **fetchMentionAndReplyNotifications**(`__namedParameters?`): `AsyncGenerator`<[`Notification`](../modules/merkleAPI_swagger.md#notification), `void`, `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`Notification`](../modules/merkleAPI_swagger.md#notification), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:244](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L244)

___

### fetchUserAssetCollections

▸ **fetchUserAssetCollections**(`user`, `__namedParameters?`): `AsyncGenerator`<[`AssetCollection`](../interfaces/merkleAPI_swagger.AssetCollection.md), `void`, `undefined`\>

Fetch all asset collections owned by the specified user.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `__namedParameters` | `Object` |
| `__namedParameters.pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`AssetCollection`](../interfaces/merkleAPI_swagger.AssetCollection.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:273](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L273)

___

### fetchUserAssetsInCollection

▸ **fetchUserAssetsInCollection**(`user`, `collectionId`, `__namedParameters?`): `AsyncGenerator`<[`Asset`](../interfaces/merkleAPI_swagger.Asset.md), `void`, `undefined`\>

Fetch all asset collections owned by the specified user.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `collectionId` | `string` |
| `__namedParameters` | `Object` |
| `__namedParameters.pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`Asset`](../interfaces/merkleAPI_swagger.Asset.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:304](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L304)

___

### fetchUserFollowers

▸ **fetchUserFollowers**(`user`, `__namedParameters?`): `AsyncGenerator`<[`User`](../interfaces/merkleAPI_swagger.User.md), `void`, `undefined`\>

Get all users that follow the specified user

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `__namedParameters` | `Object` |
| `__namedParameters.pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`User`](../interfaces/merkleAPI_swagger.User.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:337](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L337)

___

### fetchUserFollowing

▸ **fetchUserFollowing**(`user`, `__namedParameters?`): `AsyncGenerator`<[`User`](../interfaces/merkleAPI_swagger.User.md), `void`, `undefined`\>

Get all users the specified user is following.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `__namedParameters` | `Object` |
| `__namedParameters.pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`User`](../interfaces/merkleAPI_swagger.User.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:368](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L368)

___

### followUser

▸ **followUser**(`user`): `Promise`<`void`\>

Follow a user

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:399](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L399)

___

### getOrCreateValidAuthToken

▸ **getOrCreateValidAuthToken**(): `Promise`<[`AuthToken`](../interfaces/merkleAPI_swagger.AuthToken.md)\>

Returns an existing valid auth token if one exists, otherwise provisions
a new one from the signing key of the given Wallet.

Note that provisioning a new auth token requires an API round trip.

#### Returns

`Promise`<[`AuthToken`](../interfaces/merkleAPI_swagger.AuthToken.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:120](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L120)

___

### lookupUserByFid

▸ **lookupUserByFid**(`fid`): `Promise`<`undefined` \| [`User`](../interfaces/merkleAPI_swagger.User.md)\>

Gets the specified user via their FID (if found)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |

#### Returns

`Promise`<`undefined` \| [`User`](../interfaces/merkleAPI_swagger.User.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:409](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L409)

___

### lookupUserByUsername

▸ **lookupUserByUsername**(`username`): `Promise`<`undefined` \| [`User`](../interfaces/merkleAPI_swagger.User.md)\>

Gets the specified user via their username (if found)

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |

#### Returns

`Promise`<`undefined` \| [`User`](../interfaces/merkleAPI_swagger.User.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:423](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L423)

___

### publishCast

▸ **publishCast**(`text`, `replyTo?`): `Promise`<[`Cast`](../interfaces/merkleAPI_swagger.Cast.md)\>

Publishes a cast for the currently authenticated user

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `replyTo?` | [`Cast`](../interfaces/merkleAPI_swagger.Cast.md) \| { `fid`: `number` ; `hash`: `string`  } |

#### Returns

`Promise`<[`Cast`](../interfaces/merkleAPI_swagger.Cast.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:443](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L443)

___

### reactToCast

▸ **reactToCast**(`reaction`, `cast`): `Promise`<[`CastReaction`](../interfaces/merkleAPI_swagger.CastReaction.md)\>

React to a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `reaction` | ``"Like"`` |
| `cast` | [`Cast`](../interfaces/merkleAPI_swagger.Cast.md) \| { `castHash`: `string`  } |

#### Returns

`Promise`<[`CastReaction`](../interfaces/merkleAPI_swagger.CastReaction.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:470](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L470)

___

### recast

▸ **recast**(`castOrCastHash`): `Promise`<`void`\>

Recast a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `castOrCastHash` | `string` \| [`Cast`](../interfaces/merkleAPI_swagger.Cast.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:495](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L495)

___

### removeReactionToCast

▸ **removeReactionToCast**(`reaction`, `cast`): `Promise`<`void`\>

Remove a reaction to a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `reaction` | ``"Like"`` |
| `cast` | [`Cast`](../interfaces/merkleAPI_swagger.Cast.md) \| { `castHash`: `string`  } |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:511](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L511)

___

### revokeAuthToken

▸ **revokeAuthToken**(`authToken`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `authToken` | [`AuthToken`](../interfaces/merkleAPI_swagger.AuthToken.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:529](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L529)

___

### unfollowUser

▸ **unfollowUser**(`user`): `Promise`<`void`\>

Unfollow a user

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:543](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L543)

___

### unwatchCast

▸ **unwatchCast**(`cast`): `Promise`<`void`\>

Unwatch a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `cast` | [`Cast`](../interfaces/merkleAPI_swagger.Cast.md) \| { `castHash`: `string` ; `casterFid`: `number`  } |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:553](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L553)

___

### watchCast

▸ **watchCast**(`cast`): `Promise`<`void`\>

Watch a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `cast` | [`Cast`](../interfaces/merkleAPI_swagger.Cast.md) \| { `castHash`: `string` ; `casterFid`: `number`  } |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:576](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L576)
