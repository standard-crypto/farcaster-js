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
- [fetchCast](index.MerkleAPIClient.md#fetchcast)
- [fetchCastsForUser](index.MerkleAPIClient.md#fetchcastsforuser)
- [fetchCastsInThread](index.MerkleAPIClient.md#fetchcastsinthread)
- [fetchCurrentUser](index.MerkleAPIClient.md#fetchcurrentuser)
- [fetchCustodyAddressForUser](index.MerkleAPIClient.md#fetchcustodyaddressforuser)
- [fetchLatestCastForUser](index.MerkleAPIClient.md#fetchlatestcastforuser)
- [fetchMentionAndReplyNotifications](index.MerkleAPIClient.md#fetchmentionandreplynotifications)
- [fetchRecentCasts](index.MerkleAPIClient.md#fetchrecentcasts)
- [fetchRecentUsers](index.MerkleAPIClient.md#fetchrecentusers)
- [fetchUserAssetCollections](index.MerkleAPIClient.md#fetchuserassetcollections)
- [fetchUserAssetsInCollection](index.MerkleAPIClient.md#fetchuserassetsincollection)
- [fetchUserCastLikes](index.MerkleAPIClient.md#fetchusercastlikes)
- [fetchUserFollowers](index.MerkleAPIClient.md#fetchuserfollowers)
- [fetchUserFollowing](index.MerkleAPIClient.md#fetchuserfollowing)
- [fetchUserVerifications](index.MerkleAPIClient.md#fetchuserverifications)
- [followUser](index.MerkleAPIClient.md#followuser)
- [getOrCreateValidAuthToken](index.MerkleAPIClient.md#getorcreatevalidauthtoken)
- [lookupUserByFid](index.MerkleAPIClient.md#lookupuserbyfid)
- [lookupUserByUsername](index.MerkleAPIClient.md#lookupuserbyusername)
- [lookupUserByVerification](index.MerkleAPIClient.md#lookupuserbyverification)
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

• **new MerkleAPIClient**(`wallet`, `«destructured»?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `wallet` | `Wallet` |
| `«destructured»` | `Object` |
| › `axiosInstance?` | `AxiosInstance` |
| › `logger?` | [`Logger`](../interfaces/index.Logger.md) |

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:59](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L59)

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
| `verifications` | [`VerificationsApi`](merkleAPI_swagger.VerificationsApi.md) |
| `watches` | [`WatchesApi`](merkleAPI_swagger.WatchesApi.md) |

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:47](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L47)

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

[src/merkleAPI/MerkleAPIClient.ts:99](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L99)

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

[src/merkleAPI/MerkleAPIClient.ts:142](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L142)

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

[src/merkleAPI/MerkleAPIClient.ts:156](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L156)

___

### fetchCast

▸ **fetchCast**(`castOrCastHash`): `Promise`<`undefined` \| [`Cast`](../interfaces/merkleAPI_swagger.Cast.md)\>

Gets information about an individual cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `castOrCastHash` | `string` \| [`Cast`](../interfaces/merkleAPI_swagger.Cast.md) |

#### Returns

`Promise`<`undefined` \| [`Cast`](../interfaces/merkleAPI_swagger.Cast.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:170](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L170)

___

### fetchCastsForUser

▸ **fetchCastsForUser**(`user`, `«destructured»?`): `AsyncGenerator`<[`Cast`](../interfaces/merkleAPI_swagger.Cast.md), `void`, `undefined`\>

Gets all casts (including replies and recasts) created by the specified user.

@Note: Deleted cast filtering is applied server-side while recast filtering is applied
client-side.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `«destructured»` | `Object` |
| › `includeDeletedCasts` | `undefined` \| `boolean` |
| › `includeRecasts` | `undefined` \| `boolean` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`Cast`](../interfaces/merkleAPI_swagger.Cast.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:230](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L230)

___

### fetchCastsInThread

▸ **fetchCastsInThread**(`threadParent`, `«destructured»?`): `AsyncGenerator`<[`Cast`](../interfaces/merkleAPI_swagger.Cast.md), `void`, `undefined`\>

Fetches casts in a given thread.
Note that the parent provided by the caller is included in the response.

#### Parameters

| Name | Type |
| :------ | :------ |
| `threadParent` | [`Cast`](../interfaces/merkleAPI_swagger.Cast.md) \| { `hash`: `string`  } |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`Cast`](../interfaces/merkleAPI_swagger.Cast.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:197](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L197)

___

### fetchCurrentUser

▸ **fetchCurrentUser**(): `Promise`<[`User`](../interfaces/merkleAPI_swagger.User.md)\>

Gets the currently authenticated user

#### Returns

`Promise`<[`User`](../interfaces/merkleAPI_swagger.User.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:266](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L266)

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

[src/merkleAPI/MerkleAPIClient.ts:272](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L272)

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

[src/merkleAPI/MerkleAPIClient.ts:291](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L291)

___

### fetchMentionAndReplyNotifications

▸ **fetchMentionAndReplyNotifications**(`«destructured»?`): `AsyncGenerator`<[`Notification`](../modules/merkleAPI_swagger.md#notification), `void`, `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`Notification`](../modules/merkleAPI_swagger.md#notification), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:305](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L305)

___

### fetchRecentCasts

▸ **fetchRecentCasts**(`«destructured»?`): `AsyncGenerator`<[`Cast`](../interfaces/merkleAPI_swagger.Cast.md), `void`, `undefined`\>

A list of the latest casts across all users in reverse chronological order based on timestamp

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`Cast`](../interfaces/merkleAPI_swagger.Cast.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:334](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L334)

___

### fetchRecentUsers

▸ **fetchRecentUsers**(`«destructured»?`): `AsyncGenerator`<[`User`](../interfaces/merkleAPI_swagger.User.md), `void`, `undefined`\>

A list of users in reverse chronological order based on sign up.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`User`](../interfaces/merkleAPI_swagger.User.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:365](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L365)

___

### fetchUserAssetCollections

▸ **fetchUserAssetCollections**(`user`, `«destructured»?`): `AsyncGenerator`<[`AssetCollection`](../interfaces/merkleAPI_swagger.AssetCollection.md), `void`, `undefined`\>

Fetch all asset collections owned by the specified user.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`AssetCollection`](../interfaces/merkleAPI_swagger.AssetCollection.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:395](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L395)

___

### fetchUserAssetsInCollection

▸ **fetchUserAssetsInCollection**(`user`, `collectionId`, `«destructured»?`): `AsyncGenerator`<[`Asset`](../interfaces/merkleAPI_swagger.Asset.md), `void`, `undefined`\>

Fetch all asset collections owned by the specified user.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `collectionId` | `string` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`Asset`](../interfaces/merkleAPI_swagger.Asset.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:426](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L426)

___

### fetchUserCastLikes

▸ **fetchUserCastLikes**(`user`, `«destructured»?`): `AsyncGenerator`<[`CastReaction`](../interfaces/merkleAPI_swagger.CastReaction.md), `void`, `undefined`\>

Fetch the latest cast for the user, if there is one

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`CastReaction`](../interfaces/merkleAPI_swagger.CastReaction.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:459](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L459)

___

### fetchUserFollowers

▸ **fetchUserFollowers**(`user`, `«destructured»?`): `AsyncGenerator`<[`User`](../interfaces/merkleAPI_swagger.User.md), `void`, `undefined`\>

Get all users that follow the specified user

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`User`](../interfaces/merkleAPI_swagger.User.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:489](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L489)

___

### fetchUserFollowing

▸ **fetchUserFollowing**(`user`, `«destructured»?`): `AsyncGenerator`<[`User`](../interfaces/merkleAPI_swagger.User.md), `void`, `undefined`\>

Get all users the specified user is following.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`User`](../interfaces/merkleAPI_swagger.User.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:520](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L520)

___

### fetchUserVerifications

▸ **fetchUserVerifications**(`user`, `«destructured»?`): `AsyncGenerator`<[`Verification`](../interfaces/merkleAPI_swagger.Verification.md), `void`, `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`Verification`](../interfaces/merkleAPI_swagger.Verification.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:548](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L548)

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

[src/merkleAPI/MerkleAPIClient.ts:577](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L577)

___

### getOrCreateValidAuthToken

▸ **getOrCreateValidAuthToken**(): `Promise`<[`AuthToken`](../interfaces/merkleAPI_swagger.AuthToken.md)\>

Returns an existing valid auth token if one exists, otherwise provisions
a new one from the signing key of the given Wallet.

Note that provisioning a new auth token requires an API round trip.

#### Returns

`Promise`<[`AuthToken`](../interfaces/merkleAPI_swagger.AuthToken.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:124](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L124)

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

[src/merkleAPI/MerkleAPIClient.ts:587](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L587)

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

[src/merkleAPI/MerkleAPIClient.ts:601](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L601)

___

### lookupUserByVerification

▸ **lookupUserByVerification**(`address`): `Promise`<`undefined` \| [`User`](../interfaces/merkleAPI_swagger.User.md)\>

Checks if a given Ethereum address has a Farcaster user associated with it.
Note: if an address is associated with multiple users, the API will return
the user who most recently published a verification with the address
(based on when Merkle received the proof, not a self-reported timestamp).

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`undefined` \| [`User`](../interfaces/merkleAPI_swagger.User.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:624](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L624)

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

[src/merkleAPI/MerkleAPIClient.ts:644](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L644)

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

[src/merkleAPI/MerkleAPIClient.ts:671](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L671)

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

[src/merkleAPI/MerkleAPIClient.ts:696](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L696)

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

[src/merkleAPI/MerkleAPIClient.ts:712](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L712)

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

[src/merkleAPI/MerkleAPIClient.ts:730](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L730)

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

[src/merkleAPI/MerkleAPIClient.ts:754](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L754)

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

[src/merkleAPI/MerkleAPIClient.ts:764](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L764)

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

[src/merkleAPI/MerkleAPIClient.ts:787](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L787)
