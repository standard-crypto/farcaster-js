[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / HubRestAPIClient

# Class: HubRestAPIClient

[index](../modules/index.md).HubRestAPIClient

## Table of contents

### Constructors

- [constructor](index.HubRestAPIClient.md#constructor)

### Properties

- [apis](index.HubRestAPIClient.md#apis)

### Methods

- [getCastById](index.HubRestAPIClient.md#getcastbyid)
- [getHubEventById](index.HubRestAPIClient.md#gethubeventbyid)
- [getHubInfo](index.HubRestAPIClient.md#gethubinfo)
- [getLinkById](index.HubRestAPIClient.md#getlinkbyid)
- [getOnChainIdRegistryEventByAddress](index.HubRestAPIClient.md#getonchainidregistryeventbyaddress)
- [getOnChainSignerEventBySigner](index.HubRestAPIClient.md#getonchainsignereventbysigner)
- [getReactionById](index.HubRestAPIClient.md#getreactionbyid)
- [getSpecificUserDataByFid](index.HubRestAPIClient.md#getspecificuserdatabyfid)
- [getStorageLimitsByFid](index.HubRestAPIClient.md#getstoragelimitsbyfid)
- [getUsernameProof](index.HubRestAPIClient.md#getusernameproof)
- [listAllUserDataByFid](index.HubRestAPIClient.md#listalluserdatabyfid)
- [listCastsByFid](index.HubRestAPIClient.md#listcastsbyfid)
- [listCastsByMention](index.HubRestAPIClient.md#listcastsbymention)
- [listCastsByParent](index.HubRestAPIClient.md#listcastsbyparent)
- [listFids](index.HubRestAPIClient.md#listfids)
- [listHubEvents](index.HubRestAPIClient.md#listhubevents)
- [listLinksByFid](index.HubRestAPIClient.md#listlinksbyfid)
- [listLinksByTargetFid](index.HubRestAPIClient.md#listlinksbytargetfid)
- [listOnChainEventsByFid](index.HubRestAPIClient.md#listonchaineventsbyfid)
- [listReactionsByCast](index.HubRestAPIClient.md#listreactionsbycast)
- [listReactionsByFid](index.HubRestAPIClient.md#listreactionsbyfid)
- [listReactionsByTarget](index.HubRestAPIClient.md#listreactionsbytarget)
- [listUsernameProofsForFid](index.HubRestAPIClient.md#listusernameproofsforfid)
- [listVerificationsByFid](index.HubRestAPIClient.md#listverificationsbyfid)
- [isApiErrorResponse](index.HubRestAPIClient.md#isapierrorresponse)

## Constructors

### constructor

• **new HubRestAPIClient**(`«destructured»?`)

Instantiates a HubRestAPIClient

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`HubRestAPIClientConfig`](../interfaces/index.HubRestAPIClientConfig.md) |

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:83](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L83)

## Properties

### apis

• `Readonly` **apis**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `casts` | `CastsApi` |
| `fids` | `FIDsApi` |
| `hubEvents` | `HubEventsApi` |
| `info` | `InfoApi` |
| `links` | `LinksApi` |
| `onChainEvents` | `OnChainEventsApi` |
| `reactions` | `ReactionsApi` |
| `storage` | `StorageApi` |
| `userData` | `UserDataApi` |
| `usernames` | `UsernamesApi` |
| `verifications` | `VerificationsApi` |

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:66](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L66)

## Methods

### getCastById

▸ **getCastById**(`«destructured»`): `Promise`<``null`` \| `CastAdd`\>

Get a cast by its FID and Hash.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/casts.html#castbyid)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `CastId` |

#### Returns

`Promise`<``null`` \| `CastAdd`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:136](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L136)

___

### getHubEventById

▸ **getHubEventById**(`eventId`): `Promise`<``null`` \| `HubEvent`\>

Get a hub event by its Id.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/events.html#eventbyid)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventId` | `number` | The Hub Id of the event |

#### Returns

`Promise`<``null`` \| `HubEvent`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:706](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L706)

___

### getHubInfo

▸ **getHubInfo**(`«destructured»?`): `Promise`<`HubInfoResponse`\>

Get the Hub's info.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/info.html#info)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `includeDbStats` | `undefined` \| `boolean` |

#### Returns

`Promise`<`HubInfoResponse`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:125](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L125)

___

### getLinkById

▸ **getLinkById**(`sourceFid`, `targetFid`): `Promise`<``null`` \| `LinkAdd`\>

Get a link by its FID and target FID.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/links.html#linkbyid)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceFid` | `number` |
| `targetFid` | `number` |

#### Returns

`Promise`<``null`` \| `LinkAdd`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:376](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L376)

___

### getOnChainIdRegistryEventByAddress

▸ **getOnChainIdRegistryEventByAddress**(`address`): `Promise`<``null`` \| `OnChainEventIdRegister`\>

Get a specific on-chain ID registration event by address.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/onchain.html#onchainidregistryeventbyaddress)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | The ETH address being requested |

#### Returns

`Promise`<``null`` \| `OnChainEventIdRegister`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:680](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L680)

___

### getOnChainSignerEventBySigner

▸ **getOnChainSignerEventBySigner**(`fid`, `signer`): `Promise`<``null`` \| `OnChainEventSigner`\>

Get a specific on-chain signer event by FID and signer.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/onchain.html#onchainsignersbyfid)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | The FID being requested |
| `signer` | `string` | The key of signer |

#### Returns

`Promise`<``null`` \| `OnChainEventSigner`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:653](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L653)

___

### getReactionById

▸ **getReactionById**(`id`): `Promise`<``null`` \| `Reaction`\>

Get a reaction by its created FID and target Cast.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/reactions.html#reactionbyid)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ReactionsApiGetReactionByIdRequest` | The source and target of the reaction, and the reaction type |

#### Returns

`Promise`<``null`` \| `Reaction`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:250](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L250)

___

### getSpecificUserDataByFid

▸ **getSpecificUserDataByFid**(`fid`, `userDataType`): `Promise`<``null`` \| `UserDataAdd`\>

Get a specific type of UserData for a FID.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/userdata.html#userdatabyfid)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | The FID that's being requested |
| `userDataType` | `UserDataType` | The type of UserData requested |

#### Returns

`Promise`<``null`` \| `UserDataAdd`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:469](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L469)

___

### getStorageLimitsByFid

▸ **getStorageLimitsByFid**(`fid`): `Promise`<`StorageLimit`[]\>

Get an FID's storage limits.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/storagelimits.html#storagelimitsbyfid)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | The FID that's being requested |

#### Returns

`Promise`<`StorageLimit`[]\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:556](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L556)

___

### getUsernameProof

▸ **getUsernameProof**(`username`): `Promise`<``null`` \| `UserNameProof`\>

Get an proof for a username by the Farcaster username.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/usernameproof.html#usernameproofbyname)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` | The Farcaster username or ENS address |

#### Returns

`Promise`<``null`` \| `UserNameProof`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:567](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L567)

___

### listAllUserDataByFid

▸ **listAllUserDataByFid**(`fid`, `options?`): `AsyncGenerator`<`UserDataAdd`, `void`, `undefined`\>

Get all UserData for a FID. Returns an empty iterator if FID has no user data or does not exist.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/userdata.html#userdatabyfid)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | The FID that's being requested |
| `options?` | [`PaginationOptions`](../interfaces/index.PaginationOptions.md) | - |

#### Returns

`AsyncGenerator`<`UserDataAdd`, `void`, `undefined`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:496](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L496)

___

### listCastsByFid

▸ **listCastsByFid**(`fid`, `options?`): `AsyncGenerator`<`CastAdd`, `void`, `undefined`\>

Fetch all casts for authored by an FID.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/casts.html#castsbyfid)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | The FID of the cast's creator |
| `options?` | [`PaginationOptions`](../interfaces/index.PaginationOptions.md) |  |

#### Returns

`AsyncGenerator`<`CastAdd`, `void`, `undefined`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:157](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L157)

___

### listCastsByMention

▸ **listCastsByMention**(`fid`, `options?`): `AsyncGenerator`<`CastAdd`, `void`, `undefined`\>

Fetch all casts that mention an FID.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/casts.html#castsbymention)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | The FID that is mentioned in a cast |
| `options?` | [`PaginationOptions`](../interfaces/index.PaginationOptions.md) |  |

#### Returns

`AsyncGenerator`<`CastAdd`, `void`, `undefined`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:188](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L188)

___

### listCastsByParent

▸ **listCastsByParent**(`parent`, `options?`): `AsyncGenerator`<`CastAdd`, `void`, `undefined`\>

Fetch all casts by parent cast's FID and Hash OR by the parent's URL.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/casts.html#castsbyparent)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | `CastId` \| { `url`: `string`  } |
| `options?` | [`PaginationOptions`](../interfaces/index.PaginationOptions.md) |

#### Returns

`AsyncGenerator`<`CastAdd`, `void`, `undefined`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:219](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L219)

___

### listFids

▸ **listFids**(`options?`): `AsyncGenerator`<`number`, `void`, `undefined`\>

Get a list of all the FIDs.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/fids.html#fids)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`PaginationOptions`](../interfaces/index.PaginationOptions.md) |

#### Returns

`AsyncGenerator`<`number`, `void`, `undefined`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:527](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L527)

___

### listHubEvents

▸ **listHubEvents**(`fromEventId?`): `AsyncGenerator`<`HubEvent`, `void`, `undefined`\>

Get a page of Hub events.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/events.html#events)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fromEventId?` | `number` | An optional Hub Id to start getting events from. |

#### Returns

`AsyncGenerator`<`HubEvent`, `void`, `undefined`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:728](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L728)

___

### listLinksByFid

▸ **listLinksByFid**(`fid`, `options?`): `AsyncGenerator`<`LinkAdd`, `void`, `undefined`\>

Get all links from a source FID.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/links.html#linksbyfid)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | The FID of the link's originator |
| `options?` | [`PaginationOptions`](../interfaces/index.PaginationOptions.md) |  |

#### Returns

`AsyncGenerator`<`LinkAdd`, `void`, `undefined`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:404](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L404)

___

### listLinksByTargetFid

▸ **listLinksByTargetFid**(`targetFid`, `options?`): `AsyncGenerator`<`LinkAdd`, `void`, `undefined`\>

Get all links to a target FID.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/links.html#linksbytargetfid)

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetFid` | `number` |
| `options?` | [`PaginationOptions`](../interfaces/index.PaginationOptions.md) |

#### Returns

`AsyncGenerator`<`LinkAdd`, `void`, `undefined`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:436](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L436)

___

### listOnChainEventsByFid

▸ **listOnChainEventsByFid**<`T`\>(`fid`, `eventType`): `Promise`<`OnChainEventsReturnType`<`T`\>[]\>

Get a list of on-chain events by an FID.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/onchain.html#onchaineventsbyfid)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `OnChainEventType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | The FID being requested |
| `eventType` | `T` | The event type being requested |

#### Returns

`Promise`<`OnChainEventsReturnType`<`T`\>[]\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:635](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L635)

___

### listReactionsByCast

▸ **listReactionsByCast**(`targetFid`, `targetHash`, `reactionType`, `options?`): `AsyncGenerator`<`Reaction`, `void`, `undefined`\>

Get all reactions to a cast.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/reactions.html#reactionsbycast)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `targetFid` | `number` | The FID of the cast's creator |
| `targetHash` | `string` | The hash of the cast |
| `reactionType` | `ReactionType` | The type of reaction |
| `options?` | [`PaginationOptions`](../interfaces/index.PaginationOptions.md) |  |

#### Returns

`AsyncGenerator`<`Reaction`, `void`, `undefined`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:309](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L309)

___

### listReactionsByFid

▸ **listReactionsByFid**(`fid`, `reactionType`, `options?`): `AsyncGenerator`<`Reaction`, `void`, `undefined`\>

Get all reactions by an FID.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/reactions.html#reactionsbyfid)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | The FID of the reaction's creator |
| `reactionType` | `ReactionType` | The type of reaction |
| `options?` | [`PaginationOptions`](../interfaces/index.PaginationOptions.md) |  |

#### Returns

`AsyncGenerator`<`Reaction`, `void`, `undefined`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:274](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L274)

___

### listReactionsByTarget

▸ **listReactionsByTarget**(`url`, `reactionType`, `options?`): `AsyncGenerator`<`Reaction`, `void`, `undefined`\>

Get all reactions to cast's target URL.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/reactions.html#reactionsbytarget)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the parent cast |
| `reactionType` | `ReactionType` | The type of reaction |
| `options?` | [`PaginationOptions`](../interfaces/index.PaginationOptions.md) |  |

#### Returns

`AsyncGenerator`<`Reaction`, `void`, `undefined`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:345](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L345)

___

### listUsernameProofsForFid

▸ **listUsernameProofsForFid**(`fid`): `Promise`<`UserNameProof`[]\>

Get a list of proofs provided by an FID.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/usernameproof.html#usernameproofsbyfid)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | The FID being requested |

#### Returns

`Promise`<`UserNameProof`[]\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:592](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L592)

___

### listVerificationsByFid

▸ **listVerificationsByFid**(`fid`, `options?`): `AsyncGenerator`<`Verification`, `void`, `undefined`\>

Get a list of verifications provided by an FID.
See [farcaster documentation](https://www.thehubble.xyz/docs/httpapi/verification.html)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fid` | `number` | The FID being requested |
| `options?` | [`PaginationOptions`](../interfaces/index.PaginationOptions.md) & { `address?`: `string`  } | The optional ETH address to filter by |

#### Returns

`AsyncGenerator`<`Verification`, `void`, `undefined`\>

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:603](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L603)

___

### isApiErrorResponse

▸ `Static` **isApiErrorResponse**(`error`): error is Object

Utility for parsing errors returned by the Merkle API server. Returns true
if the given error is caused by an error response from the server, and
narrows the type of `error` accordingly.

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Returns

error is Object

#### Defined in

[src/hub-rest-client/HubRestAPIClient.ts:753](https://github.com/standard-crypto/farcaster-js/blob/main/src/hub-rest-client/HubRestAPIClient.ts#L753)
