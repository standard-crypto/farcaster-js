[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / NeynarAPIClient

# Class: NeynarAPIClient

[index](../modules/index.md).NeynarAPIClient

## Table of contents

### Constructors

- [constructor](index.NeynarAPIClient.md#constructor)

### Properties

- [apis](index.NeynarAPIClient.md#apis)

### Methods

- [createSigner](index.NeynarAPIClient.md#createsigner)
- [deleteCast](index.NeynarAPIClient.md#deletecast)
- [fetchCast](index.NeynarAPIClient.md#fetchcast)
- [fetchCastLikes](index.NeynarAPIClient.md#fetchcastlikes)
- [fetchCastsForUser](index.NeynarAPIClient.md#fetchcastsforuser)
- [fetchCastsInThread](index.NeynarAPIClient.md#fetchcastsinthread)
- [fetchCustodyAddressForUser](index.NeynarAPIClient.md#fetchcustodyaddressforuser)
- [fetchLatestCastForUser](index.NeynarAPIClient.md#fetchlatestcastforuser)
- [fetchMentionAndReplyNotifications](index.NeynarAPIClient.md#fetchmentionandreplynotifications)
- [fetchRecentCasts](index.NeynarAPIClient.md#fetchrecentcasts)
- [fetchRecentUsers](index.NeynarAPIClient.md#fetchrecentusers)
- [fetchSigner](index.NeynarAPIClient.md#fetchsigner)
- [fetchUserCastLikes](index.NeynarAPIClient.md#fetchusercastlikes)
- [fetchUserFollowers](index.NeynarAPIClient.md#fetchuserfollowers)
- [fetchUserFollowing](index.NeynarAPIClient.md#fetchuserfollowing)
- [fetchUserVerifications](index.NeynarAPIClient.md#fetchuserverifications)
- [followUser](index.NeynarAPIClient.md#followuser)
- [followUsers](index.NeynarAPIClient.md#followusers)
- [lookupUserByFid](index.NeynarAPIClient.md#lookupuserbyfid)
- [lookupUserByUsername](index.NeynarAPIClient.md#lookupuserbyusername)
- [lookupUserByVerification](index.NeynarAPIClient.md#lookupuserbyverification)
- [publishCast](index.NeynarAPIClient.md#publishcast)
- [reactToCast](index.NeynarAPIClient.md#reacttocast)
- [registerSigner](index.NeynarAPIClient.md#registersigner)
- [removeReactionToCast](index.NeynarAPIClient.md#removereactiontocast)
- [unfollowUser](index.NeynarAPIClient.md#unfollowuser)
- [unfollowUsers](index.NeynarAPIClient.md#unfollowusers)
- [v1FetchCast](index.NeynarAPIClient.md#v1fetchcast)
- [isApiErrorResponse](index.NeynarAPIClient.md#isapierrorresponse)

## Constructors

### constructor

• **new NeynarAPIClient**(`apiKey`, `«destructured»?`)

Instantiates a NeynarV1APIClient

Note: A Wallet must be provided if the API client is to mint new AuthTokens

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiKey` | `string` |
| `«destructured»` | `Object` |
| › `axiosInstance?` | `AxiosInstance` |
| › `logger?` | [`Logger`](../interfaces/index.Logger.md) |

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:61](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L61)

## Properties

### apis

• `Readonly` **apis**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `notifications` | `NotificationsApi` |
| `reaction` | `ReactionApi` |
| `reactions` | `ReactionsApi` |
| `signer` | `SignerApi` |
| `user` | `UserApi` |
| `v1Cast` | `CastApi` |
| `v1Follows` | `FollowsApi` |
| `v2Cast` | `CastApi` |
| `v2Follow` | `FollowApi` |
| `verification` | `VerificationApi` |

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:43](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L43)

## Methods

### createSigner

▸ **createSigner**(): `Promise`<`Signer`\>

Creates a Signer. See [Neynar documentation](https://docs.neynar.com/reference/create-signer)
for more details.

#### Returns

`Promise`<`Signer`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:130](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L130)

___

### deleteCast

▸ **deleteCast**(`signerUuid`, `castOrCastHash`): `Promise`<`void`\>

Delete a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `castOrCastHash` | `string` \| `Cast` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:243](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L243)

___

### fetchCast

▸ **fetchCast**(`castOrCastHash`): `Promise`<`undefined` \| `Cast`\>

Gets information about an individual cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `castOrCastHash` | `string` \| `Cast` |

#### Returns

`Promise`<`undefined` \| `Cast`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:195](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L195)

___

### fetchCastLikes

▸ **fetchCastLikes**(`castOrCastHash`, `«destructured»?`): `AsyncGenerator`<`Reaction`, `void`, `undefined`\>

Lists a given cast's likes

#### Parameters

| Name | Type |
| :------ | :------ |
| `castOrCastHash` | `string` \| `Cast` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<`Reaction`, `void`, `undefined`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:566](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L566)

___

### fetchCastsForUser

▸ **fetchCastsForUser**(`user`, `«destructured»?`): `AsyncGenerator`<`Cast`, `void`, `undefined`\>

Gets all casts (including replies and recasts) created by the specified user.

@Note: Deleted cast filtering is applied server-side while recast filtering is applied
client-side.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<`Cast`, `void`, `undefined`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:338](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L338)

___

### fetchCastsInThread

▸ **fetchCastsInThread**(`threadParent`): `Promise`<`undefined` \| `Cast`[]\>

Fetches casts in a given thread.
Note that the parent provided by the caller is included in the response.

#### Parameters

| Name | Type |
| :------ | :------ |
| `threadParent` | `Cast` \| { `hash`: `string`  } |

#### Returns

`Promise`<`undefined` \| `Cast`[]\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:310](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L310)

___

### fetchCustodyAddressForUser

▸ **fetchCustodyAddressForUser**(`fid`): `Promise`<`undefined` \| `string`\>

Gets the custody address for the specified user via their username (if found)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:500](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L500)

___

### fetchLatestCastForUser

▸ **fetchLatestCastForUser**(`user`): `Promise`<`undefined` \| `Cast`\>

Fetch the latest cast for the user, if there is one

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |

#### Returns

`Promise`<`undefined` \| `Cast`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:320](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L320)

___

### fetchMentionAndReplyNotifications

▸ **fetchMentionAndReplyNotifications**(`fid`, `«destructured»?`): `AsyncGenerator`<`Cast`, `void`, `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<`Cast`, `void`, `undefined`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:536](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L536)

___

### fetchRecentCasts

▸ **fetchRecentCasts**(`«destructured»?`): `AsyncGenerator`<`Cast`, `void`, `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<`Cast`, `void`, `undefined`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:367](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L367)

___

### fetchRecentUsers

▸ **fetchRecentUsers**(`«destructured»?`): `AsyncGenerator`<`User`, `void`, `undefined`\>

A list of users in reverse chronological order based on sign up.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<`User`, `void`, `undefined`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:397](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L397)

___

### fetchSigner

▸ **fetchSigner**(`signerUuid`): `Promise`<`undefined` \| `Signer`\>

Fetches an existing Signer. See [Neynar documentation](https://docs.neynar.com/reference/get-signer)
for more details.

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |

#### Returns

`Promise`<`undefined` \| `Signer`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:140](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L140)

___

### fetchUserCastLikes

▸ **fetchUserCastLikes**(`user`, `«destructured»?`): `AsyncGenerator`<`ReactionWithCastMeta`, `void`, `undefined`\>

Fetch all likes by a given user.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<`ReactionWithCastMeta`, `void`, `undefined`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:433](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L433)

___

### fetchUserFollowers

▸ **fetchUserFollowers**(`user`): `Promise`<`undefined` \| `User`[]\>

Get all users that follow the specified user

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |

#### Returns

`Promise`<`undefined` \| `User`[]\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:600](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L600)

___

### fetchUserFollowing

▸ **fetchUserFollowing**(`user`): `Promise`<`undefined` \| `User`[]\>

Get all users the specified user is following.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |

#### Returns

`Promise`<`undefined` \| `User`[]\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:611](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L611)

___

### fetchUserVerifications

▸ **fetchUserVerifications**(`user`): `Promise`<`undefined` \| `VerificationResponseResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Object` |
| `user.fid` | `number` |

#### Returns

`Promise`<`undefined` \| `VerificationResponseResult`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:507](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L507)

___

### followUser

▸ **followUser**(`signerUuid`, `user`): `Promise`<`BulkFollowResponse`\>

Follow a user

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `user` | `Object` |
| `user.fid` | `number` |

#### Returns

`Promise`<`BulkFollowResponse`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:622](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L622)

___

### followUsers

▸ **followUsers**(`signerUuid`, `fids`): `Promise`<`BulkFollowResponse`\>

Follow multiple users

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `fids` | `number`[] |

#### Returns

`Promise`<`BulkFollowResponse`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:637](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L637)

___

### lookupUserByFid

▸ **lookupUserByFid**(`fid`): `Promise`<`undefined` \| `User`\>

Gets the specified user via their FID (if found)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |

#### Returns

`Promise`<`undefined` \| `User`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:469](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L469)

___

### lookupUserByUsername

▸ **lookupUserByUsername**(`username`): `Promise`<`undefined` \| `User`\>

Gets the specified user via their username (if found)

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |

#### Returns

`Promise`<`undefined` \| `User`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:484](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L484)

___

### lookupUserByVerification

▸ **lookupUserByVerification**(`address`): `Promise`<`undefined` \| `User`\>

Checks if a given Ethereum address has a Farcaster user associated with it.
Note: if an address is associated with multiple users, the API will return
the user who most recently published a verification with the address
(based on when Merkle received the proof, not a self-reported timestamp).

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`undefined` \| `User`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:520](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L520)

___

### publishCast

▸ **publishCast**(`signerUuid`, `text`, `replyTo?`, `embeds?`): `Promise`<`PostCastResponseCast`\>

Publishes a cast for the currently authenticated user

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `text` | `string` |
| `replyTo?` | `Cast` \| { `hash`: `string`  } |
| `embeds?` | `string`[] |

#### Returns

`Promise`<`PostCastResponseCast`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:224](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L224)

___

### reactToCast

▸ **reactToCast**(`signerUuid`, `reaction`, `castOrCastHash`): `Promise`<`OperationResponse`\>

React to a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `reaction` | `ReactionType` |
| `castOrCastHash` | `string` \| `Cast` |

#### Returns

`Promise`<`OperationResponse`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:263](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L263)

___

### registerSigner

▸ **registerSigner**(`signerUuid`, `fid`, `deadline`, `signature`): `Promise`<`Signer`\>

Registers a Signer with an fid. See [Neynar documentation](https://docs.neynar.com/reference/register-app-fid)
for more details.

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `fid` | `number` |
| `deadline` | `number` |
| `signature` | `string` |

#### Returns

`Promise`<`Signer`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:159](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L159)

___

### removeReactionToCast

▸ **removeReactionToCast**(`signerUuid`, `reaction`, `castOrCastHash`): `Promise`<`OperationResponse`\>

Remove a reaction to a cast

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `reaction` | `ReactionType` |
| `castOrCastHash` | `string` \| `Cast` |

#### Returns

`Promise`<`OperationResponse`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:286](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L286)

___

### unfollowUser

▸ **unfollowUser**(`signerUuid`, `user`): `Promise`<`BulkFollowResponse`\>

Unfollow a user

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `user` | `Object` |
| `user.fid` | `number` |

#### Returns

`Promise`<`BulkFollowResponse`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:652](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L652)

___

### unfollowUsers

▸ **unfollowUsers**(`signerUuid`, `fids`): `Promise`<`BulkFollowResponse`\>

Unfollow multiple users

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `fids` | `number`[] |

#### Returns

`Promise`<`BulkFollowResponse`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:667](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L667)

___

### v1FetchCast

▸ **v1FetchCast**(`castOrCastHash`): `Promise`<`undefined` \| `Cast`\>

Gets information about an individual cast using neynar v1 API

#### Parameters

| Name | Type |
| :------ | :------ |
| `castOrCastHash` | `string` \| `Cast` |

#### Returns

`Promise`<`undefined` \| `Cast`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:178](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L178)

___

### isApiErrorResponse

▸ `Static` **isApiErrorResponse**(`error`): error is WithRequired<AxiosError<ErrorRes, any\>, "response"\>

Utility for parsing errors returned by the Merkle API server. Returns true
if the given error is caused by an error response from the server, and
narrows the type of `error` accordingly.

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Returns

error is WithRequired<AxiosError<ErrorRes, any\>, "response"\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:118](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L118)
