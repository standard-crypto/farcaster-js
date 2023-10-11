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

[src/neynarAPI/NeynarAPIClient.ts:62](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L62)

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

[src/neynarAPI/NeynarAPIClient.ts:44](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L44)

## Methods

### createSigner

▸ **createSigner**(): `Promise`<`Signer`\>

Creates a Signer. See [Neynar documentation](https://docs.neynar.com/reference/create-signer)
for more details.

#### Returns

`Promise`<`Signer`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:135](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L135)

___

### deleteCast

▸ **deleteCast**(`signerUuid`, `castOrCastHash`): `Promise`<`void`\>

Delete a cast. See [Neynar documentation](https://docs.neynar.com/reference/delete-a-cast)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `castOrCastHash` | `string` \| `Cast` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:246](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L246)

___

### fetchCast

▸ **fetchCast**(`castOrCastHash`): `Promise`<``null`` \| `Cast`\>

Gets information about an individual cast. See [Neynar documentation](https://docs.neynar.com/reference/get-cast)

#### Parameters

| Name | Type |
| :------ | :------ |
| `castOrCastHash` | `string` \| `Cast` |

#### Returns

`Promise`<``null`` \| `Cast`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:199](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L199)

___

### fetchCastLikes

▸ **fetchCastLikes**(`castOrCastHash`, `«destructured»?`): `AsyncGenerator`<`Reaction`, `void`, `undefined`\>

Lists a given cast's likes. See [Neynar documentation](https://docs.neynar.com/reference/get-all-like-reactions-for-a-cast)

#### Parameters

| Name | Type |
| :------ | :------ |
| `castOrCastHash` | `string` \| `Cast` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<`Reaction`, `void`, `undefined`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:548](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L548)

___

### fetchCastsForUser

▸ **fetchCastsForUser**(`fid`, `«destructured»?`): `AsyncGenerator`<`Cast`, `void`, `undefined`\>

Gets all casts (including replies and recasts) created by the specified user. See [Neynar documentation](https://docs.neynar.com/reference/get-all-casts-from-user)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<`Cast`, `void`, `undefined`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:337](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L337)

___

### fetchCastsInThread

▸ **fetchCastsInThread**(`threadParent`): `Promise`<``null`` \| `Cast`[]\>

Fetches casts in a given thread. See [Neynar documentation](https://docs.neynar.com/reference/get-all-casts-in-thread)
Note that the parent provided by the caller is included in the response.

#### Parameters

| Name | Type |
| :------ | :------ |
| `threadParent` | `Cast` \| { `hash`: `string`  } |

#### Returns

`Promise`<``null`` \| `Cast`[]\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:313](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L313)

___

### fetchCustodyAddressForUser

▸ **fetchCustodyAddressForUser**(`fid`): `Promise`<``null`` \| `string`\>

Gets the custody address for the specified user via their username (if found). See [Neynar documentation](https://docs.neynar.com/reference/get-custody-address)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |

#### Returns

`Promise`<``null`` \| `string`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:477](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L477)

___

### fetchLatestCastForUser

▸ **fetchLatestCastForUser**(`fid`): `Promise`<``null`` \| `Cast`\>

Fetch the latest cast for the user, if there is one. See [Neynar documentation](https://docs.neynar.com/reference/get-all-casts-from-user)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |

#### Returns

`Promise`<``null`` \| `Cast`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:323](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L323)

___

### fetchMentionAndReplyNotifications

▸ **fetchMentionAndReplyNotifications**(`fid`, `«destructured»?`): `AsyncGenerator`<`Cast`, `void`, `undefined`\>

Gets a list of mentions and replies to the user’s casts in reverse chronological order. See [Neynar documentation](https://docs.neynar.com/reference/get-user-mentions-and-replies)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<`Cast`, `void`, `undefined`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:518](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L518)

___

### fetchRecentCasts

▸ **fetchRecentCasts**(`«destructured»?`): `AsyncGenerator`<`Cast`, `void`, `undefined`\>

Gets recent casts created by the specified user. See [Neynar documentation](https://docs.neynar.com/reference/get-recent-casts-from-protocol)

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

A list of users in reverse chronological order based on sign up. See [Neynar documentation](https://docs.neynar.com/reference/get-recent-users-from-protocol)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<`User`, `void`, `undefined`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:396](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L396)

___

### fetchSigner

▸ **fetchSigner**(`signerUuid`): `Promise`<``null`` \| `Signer`\>

Fetches an existing Signer. See [Neynar documentation](https://docs.neynar.com/reference/get-signer)
for more details.

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |

#### Returns

`Promise`<``null`` \| `Signer`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:145](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L145)

___

### fetchUserCastLikes

▸ **fetchUserCastLikes**(`fid`, `«destructured»?`): `AsyncGenerator`<`ReactionWithCastMeta`[], `void`, `undefined`\>

Fetch all likes by a given user. See [Neynar documentation](https://docs.neynar.com/reference/get-user-cast-likes)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |
| `«destructured»` | `Object` |
| › `pageSize` | `undefined` \| `number` |

#### Returns

`AsyncGenerator`<`ReactionWithCastMeta`[], `void`, `undefined`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:424](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L424)

___

### fetchUserFollowers

▸ **fetchUserFollowers**(`fid`): `Promise`<`User`[]\>

Get all users that follow the specified user. See [Neynar documentation](https://docs.neynar.com/reference/get-list-of-followers)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |

#### Returns

`Promise`<`User`[]\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:582](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L582)

___

### fetchUserFollowing

▸ **fetchUserFollowing**(`fid`): `Promise`<`User`[]\>

Get all users the specified user is following. See [Neynar documentation](https://docs.neynar.com/reference/get-list-of-following)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |

#### Returns

`Promise`<`User`[]\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:591](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L591)

___

### fetchUserVerifications

▸ **fetchUserVerifications**(`fid`): `Promise`<``null`` \| `VerificationResponseResult`\>

Gets all known verifications of a user. See [Neynar documentation](https://docs.neynar.com/reference/get-user-verifications)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |

#### Returns

`Promise`<``null`` \| `VerificationResponseResult`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:485](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L485)

___

### followUser

▸ **followUser**(`signerUuid`, `fid`): `Promise`<`BulkFollowResponse`\>

Follow a user. See [Neynar documentation](https://docs.neynar.com/reference/follow-a-user)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `fid` | `number` |

#### Returns

`Promise`<`BulkFollowResponse`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:600](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L600)

___

### followUsers

▸ **followUsers**(`signerUuid`, `fids`): `Promise`<`BulkFollowResponse`\>

Follow multiple users. See [Neynar documentation](https://docs.neynar.com/reference/follow-a-user)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `fids` | `number`[] |

#### Returns

`Promise`<`BulkFollowResponse`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:615](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L615)

___

### lookupUserByFid

▸ **lookupUserByFid**(`fid`): `Promise`<``null`` \| `User`\>

Gets the specified user via their FID (if found). See [Neynar documentation](https://docs.neynar.com/reference/get-user-information-by-fid)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fid` | `number` |

#### Returns

`Promise`<``null`` \| `User`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:453](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L453)

___

### lookupUserByUsername

▸ **lookupUserByUsername**(`username`): `Promise`<``null`` \| `User`\>

Gets the specified user via their username (if found). See [Neynar documentation](https://docs.neynar.com/reference/get-user-information-by-username)

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |

#### Returns

`Promise`<``null`` \| `User`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:468](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L468)

___

### lookupUserByVerification

▸ **lookupUserByVerification**(`address`): `Promise`<``null`` \| `User`\>

Checks if a given Ethereum address has a Farcaster user associated with it.
TODO: Confirm the statement below is true
Note: if an address is associated with multiple users, the API will return
the user who most recently published a verification with the address
(based on when Neynar received the proof, not a self-reported timestamp).
See [Neynar documentation](https://docs.neynar.com/reference/get-user-by-verification)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<``null`` \| `User`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:500](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L500)

___

### publishCast

▸ **publishCast**(`signerUuid`, `text`, `options?`): `Promise`<`PostCastResponseCast`\>

Publishes a cast for the currently authenticated user. See [Neynar documentation](https://docs.neynar.com/reference/post-a-cast)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `text` | `string` |
| `options` | `Object` |
| `options.embeds?` | `CastEmbeds`[] |
| `options.replyTo?` | `string` |

#### Returns

`Promise`<`PostCastResponseCast`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:228](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L228)

___

### reactToCast

▸ **reactToCast**(`signerUuid`, `reaction`, `castOrCastHash`): `Promise`<`OperationResponse`\>

React to a cast. See [Neynar documentation](https://docs.neynar.com/reference/post-a-reaction)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `reaction` | `ReactionType` |
| `castOrCastHash` | `string` \| `Cast` |

#### Returns

`Promise`<`OperationResponse`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:266](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L266)

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

[src/neynarAPI/NeynarAPIClient.ts:164](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L164)

___

### removeReactionToCast

▸ **removeReactionToCast**(`signerUuid`, `reaction`, `castOrCastHash`): `Promise`<`OperationResponse`\>

Remove a reaction to a cast. See [Neynar documentation](https://docs.neynar.com/reference/delete-a-reaction)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `reaction` | `ReactionType` |
| `castOrCastHash` | `string` \| `Cast` |

#### Returns

`Promise`<`OperationResponse`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:289](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L289)

___

### unfollowUser

▸ **unfollowUser**(`signerUuid`, `fid`): `Promise`<`BulkFollowResponse`\>

Unfollow a user. See [Neynar documentation](https://docs.neynar.com/reference/unfollow-a-user)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `fid` | `number` |

#### Returns

`Promise`<`BulkFollowResponse`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:630](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L630)

___

### unfollowUsers

▸ **unfollowUsers**(`signerUuid`, `fids`): `Promise`<`BulkFollowResponse`\>

Unfollow multiple users. See [Neynar documentation](https://docs.neynar.com/reference/unfollow-a-user)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerUuid` | `string` |
| `fids` | `number`[] |

#### Returns

`Promise`<`BulkFollowResponse`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:645](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L645)

___

### v1FetchCast

▸ **v1FetchCast**(`castOrCastHash`): `Promise`<``null`` \| `Cast`\>

Gets information about an individual cast using neynar v1 API. See [Neynar documentation](https://docs.neynar.com/reference/get-cast-information)

#### Parameters

| Name | Type |
| :------ | :------ |
| `castOrCastHash` | `string` \| `Cast` |

#### Returns

`Promise`<``null`` \| `Cast`\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:183](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L183)

___

### isApiErrorResponse

▸ `Static` **isApiErrorResponse**(`error`): error is WithRequired<AxiosError<ErrorRes, any\>, "response"\>

Utility for parsing errors returned by the Neynar API servers. Returns true
if the given error is caused by an error response from the server, and
narrows the type of `error` accordingly.

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Returns

error is WithRequired<AxiosError<ErrorRes, any\>, "response"\>

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:119](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L119)
