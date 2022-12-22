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
- [isApiErrorResponse](index.MerkleAPIClient.md#isapierrorresponse)

## Constructors

### constructor

• **new MerkleAPIClient**(`walletOrAuthToken`, `«destructured»?`)

Instantiates a MerkleAPIClient

Note: A Wallet must be provided if the API client is to mint new AuthTokens

#### Parameters

| Name | Type |
| :------ | :------ |
| `walletOrAuthToken` | [`AuthToken`](../interfaces/index.AuthToken.md) \| `Wallet` |
| `«destructured»` | `Object` |
| › `axiosInstance?` | `AxiosInstance` |
| › `logger?` | [`Logger`](../interfaces/index.Logger.md) |

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:66](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L66)

## Properties

### apis

• `Readonly` **apis**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `assets` | [`AssetsApi`](index.AssetsApi.md) |
| `auth` | [`AuthApi`](index.AuthApi.md) |
| `casts` | [`CastsApi`](index.CastsApi.md) |
| `follows` | [`FollowsApi`](index.FollowsApi.md) |
| `notifications` | [`NotificationsApi`](index.NotificationsApi.md) |
| `user` | [`UserApi`](index.UserApi.md) |
| `users` | [`UsersApi`](index.UsersApi.md) |
| `verifications` | [`VerificationsApi`](index.VerificationsApi.md) |
| `watches` | [`WatchesApi`](index.WatchesApi.md) |

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:49](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L49)

## Methods

### createAuthToken

▸ **createAuthToken**(`expiryDurationMillis?`): `Promise`<[`AuthToken`](../interfaces/index.AuthToken.md)\>

Creates a new auth token from the signing key of the Wallet
configured with this API client.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `expiryDurationMillis` | `number` | `TEN_MINUTES_IN_MILLIS` |

#### Returns

`Promise`<[`AuthToken`](../interfaces/index.AuthToken.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:129](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L129)

___

### deleteCast

▸ **deleteCast**(`castOrCastHash`): `Promise`<`void`\>

Delete a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `castOrCastHash` | `string` \| [`Cast`](../interfaces/index.Cast.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:176](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L176)

___

### deleteRecast

▸ **deleteRecast**(`castOrCastHash`): `Promise`<`void`\>

Delete a recast

#### Parameters

| Name | Type |
| :------ | :------ |
| `castOrCastHash` | `string` \| [`Cast`](../interfaces/index.Cast.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:190](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L190)

___

### fetchCast

▸ **fetchCast**(`castOrCastHash`): `Promise`<`undefined` \| [`Cast`](../interfaces/index.Cast.md)\>

Gets information about an individual cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `castOrCastHash` | `string` \| [`Cast`](../interfaces/index.Cast.md) |

#### Returns

`Promise`<`undefined` \| [`Cast`](../interfaces/index.Cast.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:204](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L204)

___

### fetchCastsForUser

▸ **fetchCastsForUser**(`user`, `«destructured»?`): `AsyncGenerator`<[`Cast`](../interfaces/index.Cast.md), `void`, `undefined`\>

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

`AsyncGenerator`<[`Cast`](../interfaces/index.Cast.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:264](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L264)

___

### fetchCastsInThread

▸ **fetchCastsInThread**(`threadParent`, `«destructured»?`): `AsyncGenerator`<[`Cast`](../interfaces/index.Cast.md), `void`, `undefined`\>

Fetches casts in a given thread.
Note that the parent provided by the caller is included in the response.

#### Parameters

| Name | Type |
| :------ | :------ |
| `threadParent` | [`Cast`](../interfaces/index.Cast.md) \| { `hash`: `string`  } |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`Cast`](../interfaces/index.Cast.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:231](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L231)

___

### fetchCurrentUser

▸ **fetchCurrentUser**(): `Promise`<[`User`](../interfaces/index.User.md)\>

Gets the currently authenticated user

#### Returns

`Promise`<[`User`](../interfaces/index.User.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:300](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L300)

___

### fetchCustodyAddressForUser

▸ **fetchCustodyAddressForUser**(`userOrUsername`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userOrUsername` | `string` \| [`User`](../interfaces/index.User.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:306](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L306)

___

### fetchLatestCastForUser

▸ **fetchLatestCastForUser**(`user`, `includeRecasts?`): `Promise`<`undefined` \| [`Cast`](../interfaces/index.Cast.md)\>

Fetch the latest cast for the user, if there is one

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `user` | `Object` | `undefined` |
| `user.fid` | `number` | `undefined` |
| `includeRecasts` | `boolean` | `false` |

#### Returns

`Promise`<`undefined` \| [`Cast`](../interfaces/index.Cast.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:325](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L325)

___

### fetchMentionAndReplyNotifications

▸ **fetchMentionAndReplyNotifications**(`«destructured»?`): `AsyncGenerator`<[`Notification`](../modules/index.md#notification), `void`, `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`Notification`](../modules/index.md#notification), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:339](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L339)

___

### fetchRecentCasts

▸ **fetchRecentCasts**(`«destructured»?`): `AsyncGenerator`<[`Cast`](../interfaces/index.Cast.md), `void`, `undefined`\>

A list of the latest casts across all users in reverse chronological order based on timestamp

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`Cast`](../interfaces/index.Cast.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:368](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L368)

___

### fetchRecentUsers

▸ **fetchRecentUsers**(`«destructured»?`): `AsyncGenerator`<[`User`](../interfaces/index.User.md), `void`, `undefined`\>

A list of users in reverse chronological order based on sign up.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`User`](../interfaces/index.User.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:399](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L399)

___

### fetchUserAssetCollections

▸ **fetchUserAssetCollections**(`user`, `«destructured»?`): `AsyncGenerator`<[`AssetCollection`](../interfaces/index.AssetCollection.md), `void`, `undefined`\>

Fetch all asset collections owned by the specified user.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`AssetCollection`](../interfaces/index.AssetCollection.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:429](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L429)

___

### fetchUserAssetsInCollection

▸ **fetchUserAssetsInCollection**(`user`, `collectionId`, `«destructured»?`): `AsyncGenerator`<[`Asset`](../interfaces/index.Asset.md), `void`, `undefined`\>

Fetch all assets owned by a given user for a specific collection.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `collectionId` | `string` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`Asset`](../interfaces/index.Asset.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:460](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L460)

___

### fetchUserCastLikes

▸ **fetchUserCastLikes**(`user`, `«destructured»?`): `AsyncGenerator`<[`CastReaction`](../interfaces/index.CastReaction.md), `void`, `undefined`\>

Fetch all likes by a given user.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`CastReaction`](../interfaces/index.CastReaction.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:493](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L493)

___

### fetchUserFollowers

▸ **fetchUserFollowers**(`user`, `«destructured»?`): `AsyncGenerator`<[`User`](../interfaces/index.User.md), `void`, `undefined`\>

Get all users that follow the specified user

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`User`](../interfaces/index.User.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:523](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L523)

___

### fetchUserFollowing

▸ **fetchUserFollowing**(`user`, `«destructured»?`): `AsyncGenerator`<[`User`](../interfaces/index.User.md), `void`, `undefined`\>

Get all users the specified user is following.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`User`](../interfaces/index.User.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:554](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L554)

___

### fetchUserVerifications

▸ **fetchUserVerifications**(`user`, `«destructured»?`): `AsyncGenerator`<[`Verification`](../interfaces/index.Verification.md), `void`, `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`Verification`](../interfaces/index.Verification.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:582](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L582)

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

[src/merkleAPI/MerkleAPIClient.ts:611](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L611)

___

### getOrCreateValidAuthToken

▸ **getOrCreateValidAuthToken**(): `Promise`<[`AuthToken`](../interfaces/index.AuthToken.md)\>

Returns an existing valid auth token if one exists, otherwise provisions
a new one from the signing key of the given Wallet.

Note that provisioning a new auth token requires an API round trip.

#### Returns

`Promise`<[`AuthToken`](../interfaces/index.AuthToken.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:154](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L154)

___

### lookupUserByFid

▸ **lookupUserByFid**(`fid`): `Promise`<`undefined` \| [`User`](../interfaces/index.User.md)\>

Gets the specified user via their FID (if found)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |

#### Returns

`Promise`<`undefined` \| [`User`](../interfaces/index.User.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:621](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L621)

___

### lookupUserByUsername

▸ **lookupUserByUsername**(`username`): `Promise`<`undefined` \| [`User`](../interfaces/index.User.md)\>

Gets the specified user via their username (if found)

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |

#### Returns

`Promise`<`undefined` \| [`User`](../interfaces/index.User.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:635](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L635)

___

### lookupUserByVerification

▸ **lookupUserByVerification**(`address`): `Promise`<`undefined` \| [`User`](../interfaces/index.User.md)\>

Checks if a given Ethereum address has a Farcaster user associated with it.
Note: if an address is associated with multiple users, the API will return
the user who most recently published a verification with the address
(based on when Merkle received the proof, not a self-reported timestamp).

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`undefined` \| [`User`](../interfaces/index.User.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:658](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L658)

___

### publishCast

▸ **publishCast**(`text`, `replyTo?`): `Promise`<[`Cast`](../interfaces/index.Cast.md)\>

Publishes a cast for the currently authenticated user

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `replyTo?` | [`Cast`](../interfaces/index.Cast.md) \| { `fid`: `number` ; `hash`: `string`  } |

#### Returns

`Promise`<[`Cast`](../interfaces/index.Cast.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:678](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L678)

___

### reactToCast

▸ **reactToCast**(`reaction`, `cast`): `Promise`<[`CastReaction`](../interfaces/index.CastReaction.md)\>

React to a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `reaction` | ``"Like"`` |
| `cast` | [`Cast`](../interfaces/index.Cast.md) \| { `castHash`: `string`  } |

#### Returns

`Promise`<[`CastReaction`](../interfaces/index.CastReaction.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:705](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L705)

___

### recast

▸ **recast**(`castOrCastHash`): `Promise`<`void`\>

Recast a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `castOrCastHash` | `string` \| [`Cast`](../interfaces/index.Cast.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:730](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L730)

___

### removeReactionToCast

▸ **removeReactionToCast**(`reaction`, `cast`): `Promise`<`void`\>

Remove a reaction to a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `reaction` | ``"Like"`` |
| `cast` | [`Cast`](../interfaces/index.Cast.md) \| { `castHash`: `string`  } |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:746](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L746)

___

### revokeAuthToken

▸ **revokeAuthToken**(`authToken`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `authToken` | [`AuthToken`](../interfaces/index.AuthToken.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:764](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L764)

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

[src/merkleAPI/MerkleAPIClient.ts:788](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L788)

___

### unwatchCast

▸ **unwatchCast**(`cast`): `Promise`<`void`\>

Unwatch a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `cast` | [`Cast`](../interfaces/index.Cast.md) \| { `castHash`: `string` ; `casterFid`: `number`  } |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:798](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L798)

___

### watchCast

▸ **watchCast**(`cast`): `Promise`<`void`\>

Watch a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `cast` | [`Cast`](../interfaces/index.Cast.md) \| { `castHash`: `string` ; `casterFid`: `number`  } |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:821](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L821)

___

### isApiErrorResponse

▸ `Static` **isApiErrorResponse**(`error`): error is WithRequired<AxiosError<ApiErrorResponse, any\>, "response"\>

Utility for parsing errors returned by the Merkle API server. Returns true
if the given error is caused by an error response from the server, and
narrows the type of `error` accordingly.

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Returns

error is WithRequired<AxiosError<ApiErrorResponse, any\>, "response"\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:115](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L115)
