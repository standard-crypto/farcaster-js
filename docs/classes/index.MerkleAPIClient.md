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
- [createSignerRequest](index.MerkleAPIClient.md#createsignerrequest)
- [deleteCast](index.MerkleAPIClient.md#deletecast)
- [deleteRecast](index.MerkleAPIClient.md#deleterecast)
- [fetchCast](index.MerkleAPIClient.md#fetchcast)
- [fetchCastLikes](index.MerkleAPIClient.md#fetchcastlikes)
- [fetchCastsForUser](index.MerkleAPIClient.md#fetchcastsforuser)
- [fetchCastsInThread](index.MerkleAPIClient.md#fetchcastsinthread)
- [fetchCurrentUser](index.MerkleAPIClient.md#fetchcurrentuser)
- [fetchCustodyAddressForUser](index.MerkleAPIClient.md#fetchcustodyaddressforuser)
- [fetchLatestCastForUser](index.MerkleAPIClient.md#fetchlatestcastforuser)
- [fetchMentionAndReplyNotifications](index.MerkleAPIClient.md#fetchmentionandreplynotifications)
- [fetchRecentCasts](index.MerkleAPIClient.md#fetchrecentcasts)
- [fetchRecentUsers](index.MerkleAPIClient.md#fetchrecentusers)
- [fetchSignerRequest](index.MerkleAPIClient.md#fetchsignerrequest)
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

• **new MerkleAPIClient**(`walletOrAuthToken?`, `«destructured»?`)

Instantiates a MerkleAPIClient

Note: A Wallet must be provided if the API client is to mint new AuthTokens

#### Parameters

| Name | Type |
| :------ | :------ |
| `walletOrAuthToken?` | `Wallet` \| { `expiresAt?`: `number` ; `secret`: `string`  } |
| `«destructured»` | `Object` |
| › `axiosInstance?` | `AxiosInstance` |
| › `logger?` | [`Logger`](../interfaces/index.Logger.md) |

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:72](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L72)

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
| `signerRequests` | [`SignerRequestsApi`](index.SignerRequestsApi.md) |
| `user` | [`UserApi`](index.UserApi.md) |
| `users` | [`UsersApi`](index.UsersApi.md) |
| `verifications` | [`VerificationsApi`](index.VerificationsApi.md) |
| `watches` | [`WatchesApi`](index.WatchesApi.md) |

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:54](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L54)

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

[src/merkleAPI/MerkleAPIClient.ts:146](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L146)

___

### createSignerRequest

▸ **createSignerRequest**(`publicKey`, `name`): `Promise`<[`V2SignerRequestsPost200ResponseResult`](../interfaces/index.V2SignerRequestsPost200ResponseResult.md)\>

Creates a SignerRequest. See [Warpcast documentation](https://warpcast.notion.site/Warpcast-API-Docs-Signer-Requests-Public-e02ef71883374d2ca8d27239a8cc35d5)
for more details.

Note: Authentication credentials are not required for this API endpoint.

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `string` |
| `name` | `string` |

#### Returns

`Promise`<[`V2SignerRequestsPost200ResponseResult`](../interfaces/index.V2SignerRequestsPost200ResponseResult.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:173](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L173)

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

[src/merkleAPI/MerkleAPIClient.ts:212](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L212)

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

[src/merkleAPI/MerkleAPIClient.ts:226](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L226)

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

[src/merkleAPI/MerkleAPIClient.ts:240](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L240)

___

### fetchCastLikes

▸ **fetchCastLikes**(`castOrCastHash`, `«destructured»?`): `AsyncGenerator`<[`CastReaction`](../interfaces/index.CastReaction.md), `void`, `undefined`\>

Lists a given cast's likes

#### Parameters

| Name | Type |
| :------ | :------ |
| `castOrCastHash` | `string` \| [`Cast`](../interfaces/index.Cast.md) |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`CastReaction`](../interfaces/index.CastReaction.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:408](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L408)

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

[src/merkleAPI/MerkleAPIClient.ts:300](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L300)

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

[src/merkleAPI/MerkleAPIClient.ts:267](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L267)

___

### fetchCurrentUser

▸ **fetchCurrentUser**(): `Promise`<[`User`](../interfaces/index.User.md)\>

Gets the currently authenticated user

#### Returns

`Promise`<[`User`](../interfaces/index.User.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:336](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L336)

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

[src/merkleAPI/MerkleAPIClient.ts:342](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L342)

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

[src/merkleAPI/MerkleAPIClient.ts:361](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L361)

___

### fetchMentionAndReplyNotifications

▸ **fetchMentionAndReplyNotifications**(`«destructured»?`): `AsyncGenerator`<[`NotificationCastMention`](../interfaces/index.NotificationCastMention.md) \| [`NotificationCastReply`](../interfaces/index.NotificationCastReply.md), `void`, `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<[`NotificationCastMention`](../interfaces/index.NotificationCastMention.md) \| [`NotificationCastReply`](../interfaces/index.NotificationCastReply.md), `void`, `undefined`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:375](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L375)

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

[src/merkleAPI/MerkleAPIClient.ts:442](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L442)

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

[src/merkleAPI/MerkleAPIClient.ts:473](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L473)

___

### fetchSignerRequest

▸ **fetchSignerRequest**(`token`): `Promise`<`undefined` \| [`SignerRequest`](../interfaces/index.SignerRequest.md)\>

Fetches an existing SignerRequest. See [Warpcast documentation](https://warpcast.notion.site/Warpcast-API-Docs-Signer-Requests-Public-e02ef71883374d2ca8d27239a8cc35d5)
for more details.

Note: Authentication credentials are not required for this API endpoint.

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`Promise`<`undefined` \| [`SignerRequest`](../interfaces/index.SignerRequest.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:506](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L506)

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

[src/merkleAPI/MerkleAPIClient.ts:529](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L529)

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

[src/merkleAPI/MerkleAPIClient.ts:560](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L560)

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

[src/merkleAPI/MerkleAPIClient.ts:593](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L593)

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

[src/merkleAPI/MerkleAPIClient.ts:623](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L623)

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

[src/merkleAPI/MerkleAPIClient.ts:654](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L654)

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

[src/merkleAPI/MerkleAPIClient.ts:682](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L682)

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

[src/merkleAPI/MerkleAPIClient.ts:711](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L711)

___

### getOrCreateValidAuthToken

▸ **getOrCreateValidAuthToken**(): `Promise`<[`AuthToken`](../interfaces/index.AuthToken.md)\>

Returns an existing valid auth token if one exists, otherwise provisions
a new one from the signing key of the given Wallet.

Note that provisioning a new auth token requires an API round trip.

#### Returns

`Promise`<[`AuthToken`](../interfaces/index.AuthToken.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:190](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L190)

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

[src/merkleAPI/MerkleAPIClient.ts:721](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L721)

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

[src/merkleAPI/MerkleAPIClient.ts:743](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L743)

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

[src/merkleAPI/MerkleAPIClient.ts:766](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L766)

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

[src/merkleAPI/MerkleAPIClient.ts:786](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L786)

___

### reactToCast

▸ **reactToCast**(`reaction`, `cast`): `Promise`<[`CastReaction`](../interfaces/index.CastReaction.md)\>

React to a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `reaction` | ``"like"`` |
| `cast` | [`Cast`](../interfaces/index.Cast.md) \| { `castHash`: `string`  } |

#### Returns

`Promise`<[`CastReaction`](../interfaces/index.CastReaction.md)\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:813](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L813)

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

[src/merkleAPI/MerkleAPIClient.ts:838](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L838)

___

### removeReactionToCast

▸ **removeReactionToCast**(`reaction`, `cast`): `Promise`<`void`\>

Remove a reaction to a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `reaction` | ``"like"`` |
| `cast` | [`Cast`](../interfaces/index.Cast.md) \| { `castHash`: `string`  } |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/merkleAPI/MerkleAPIClient.ts:854](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L854)

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

[src/merkleAPI/MerkleAPIClient.ts:872](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L872)

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

[src/merkleAPI/MerkleAPIClient.ts:896](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L896)

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

[src/merkleAPI/MerkleAPIClient.ts:906](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L906)

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

[src/merkleAPI/MerkleAPIClient.ts:929](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L929)

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

[src/merkleAPI/MerkleAPIClient.ts:132](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/MerkleAPIClient.ts#L132)
