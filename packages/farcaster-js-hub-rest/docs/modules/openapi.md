[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / openapi

# Module: openapi

## Table of contents

### Enumerations

- [FarcasterNetwork](../enums/openapi.FarcasterNetwork.md)
- [HashScheme](../enums/openapi.HashScheme.md)
- [IdRegisterEventType](../enums/openapi.IdRegisterEventType.md)
- [LinkType](../enums/openapi.LinkType.md)
- [MessageType](../enums/openapi.MessageType.md)
- [OnChainEventType](../enums/openapi.OnChainEventType.md)
- [ReactionType](../enums/openapi.ReactionType.md)
- [SignatureScheme](../enums/openapi.SignatureScheme.md)
- [SignerEventType](../enums/openapi.SignerEventType.md)
- [StoreType](../enums/openapi.StoreType.md)
- [UserDataType](../enums/openapi.UserDataType.md)
- [UserNameType](../enums/openapi.UserNameType.md)

### Classes

- [CastsApi](../classes/openapi.CastsApi.md)
- [Configuration](../classes/openapi.Configuration.md)
- [FIDsApi](../classes/openapi.FIDsApi.md)
- [HubEventsApi](../classes/openapi.HubEventsApi.md)
- [InfoApi](../classes/openapi.InfoApi.md)
- [LinksApi](../classes/openapi.LinksApi.md)
- [OnChainEventsApi](../classes/openapi.OnChainEventsApi.md)
- [ReactionsApi](../classes/openapi.ReactionsApi.md)
- [StorageApi](../classes/openapi.StorageApi.md)
- [SubmitMessageApi](../classes/openapi.SubmitMessageApi.md)
- [UserDataApi](../classes/openapi.UserDataApi.md)
- [UsernamesApi](../classes/openapi.UsernamesApi.md)
- [VerificationsApi](../classes/openapi.VerificationsApi.md)

### Interfaces

- [CastAddAllOf](../interfaces/openapi.CastAddAllOf.md)
- [CastAddBody](../interfaces/openapi.CastAddBody.md)
- [CastId](../interfaces/openapi.CastId.md)
- [CastRemoveAllOf](../interfaces/openapi.CastRemoveAllOf.md)
- [CastRemoveBody](../interfaces/openapi.CastRemoveBody.md)
- [CastsApiGetCastByIdRequest](../interfaces/openapi.CastsApiGetCastByIdRequest.md)
- [CastsApiListCastsByFidRequest](../interfaces/openapi.CastsApiListCastsByFidRequest.md)
- [CastsApiListCastsByMentionRequest](../interfaces/openapi.CastsApiListCastsByMentionRequest.md)
- [CastsApiListCastsByParentRequest](../interfaces/openapi.CastsApiListCastsByParentRequest.md)
- [ConfigurationParameters](../interfaces/openapi.ConfigurationParameters.md)
- [DbStats](../interfaces/openapi.DbStats.md)
- [Embed](../interfaces/openapi.Embed.md)
- [ErrorResponse](../interfaces/openapi.ErrorResponse.md)
- [ErrorResponseMetadata](../interfaces/openapi.ErrorResponseMetadata.md)
- [FIDsApiListFidsRequest](../interfaces/openapi.FIDsApiListFidsRequest.md)
- [FidsResponse](../interfaces/openapi.FidsResponse.md)
- [GetUserDataByFid200ResponseOneOf](../interfaces/openapi.GetUserDataByFid200ResponseOneOf.md)
- [HubEventMergeMessage](../interfaces/openapi.HubEventMergeMessage.md)
- [HubEventMergeOnChainEvent](../interfaces/openapi.HubEventMergeOnChainEvent.md)
- [HubEventMergeUsernameProof](../interfaces/openapi.HubEventMergeUsernameProof.md)
- [HubEventPruneMessage](../interfaces/openapi.HubEventPruneMessage.md)
- [HubEventRevokeMessage](../interfaces/openapi.HubEventRevokeMessage.md)
- [HubEventsApiGetEventByIdRequest](../interfaces/openapi.HubEventsApiGetEventByIdRequest.md)
- [HubEventsApiListEventsRequest](../interfaces/openapi.HubEventsApiListEventsRequest.md)
- [HubInfoResponse](../interfaces/openapi.HubInfoResponse.md)
- [IdRegisterEventBody](../interfaces/openapi.IdRegisterEventBody.md)
- [InfoApiGetInfoRequest](../interfaces/openapi.InfoApiGetInfoRequest.md)
- [LinkAddAllOf](../interfaces/openapi.LinkAddAllOf.md)
- [LinkBody](../interfaces/openapi.LinkBody.md)
- [LinksApiGetLinkByIdRequest](../interfaces/openapi.LinksApiGetLinkByIdRequest.md)
- [LinksApiListLinksByFidRequest](../interfaces/openapi.LinksApiListLinksByFidRequest.md)
- [LinksApiListLinksByTargetFidRequest](../interfaces/openapi.LinksApiListLinksByTargetFidRequest.md)
- [ListCastsByFid200Response](../interfaces/openapi.ListCastsByFid200Response.md)
- [ListEvents200Response](../interfaces/openapi.ListEvents200Response.md)
- [ListLinksByFid200Response](../interfaces/openapi.ListLinksByFid200Response.md)
- [ListOnChainEventsByFid200Response](../interfaces/openapi.ListOnChainEventsByFid200Response.md)
- [ListOnChainSignersByFid200ResponseOneOf](../interfaces/openapi.ListOnChainSignersByFid200ResponseOneOf.md)
- [ListReactionsByCast200Response](../interfaces/openapi.ListReactionsByCast200Response.md)
- [ListVerificationsByFid200Response](../interfaces/openapi.ListVerificationsByFid200Response.md)
- [MergeMessageBody](../interfaces/openapi.MergeMessageBody.md)
- [MergeOnChainEventBody](../interfaces/openapi.MergeOnChainEventBody.md)
- [MergeUserNameProofBody](../interfaces/openapi.MergeUserNameProofBody.md)
- [MessageAllOf](../interfaces/openapi.MessageAllOf.md)
- [MessageCommon](../interfaces/openapi.MessageCommon.md)
- [MessageDataCastAddAllOf](../interfaces/openapi.MessageDataCastAddAllOf.md)
- [MessageDataCastRemoveAllOf](../interfaces/openapi.MessageDataCastRemoveAllOf.md)
- [MessageDataCommon](../interfaces/openapi.MessageDataCommon.md)
- [MessageDataLinkAllOf](../interfaces/openapi.MessageDataLinkAllOf.md)
- [MessageDataReactionAllOf](../interfaces/openapi.MessageDataReactionAllOf.md)
- [MessageDataUserDataAddAllOf](../interfaces/openapi.MessageDataUserDataAddAllOf.md)
- [MessageDataUsernameProofAllOf](../interfaces/openapi.MessageDataUsernameProofAllOf.md)
- [MessageDataVerificationAddAllOf](../interfaces/openapi.MessageDataVerificationAddAllOf.md)
- [MessageDataVerificationRemoveAllOf](../interfaces/openapi.MessageDataVerificationRemoveAllOf.md)
- [OnChainEventCommon](../interfaces/openapi.OnChainEventCommon.md)
- [OnChainEventIdRegisterAllOf](../interfaces/openapi.OnChainEventIdRegisterAllOf.md)
- [OnChainEventSignerAllOf](../interfaces/openapi.OnChainEventSignerAllOf.md)
- [OnChainEventSignerMigratedAllOf](../interfaces/openapi.OnChainEventSignerMigratedAllOf.md)
- [OnChainEventStorageRentAllOf](../interfaces/openapi.OnChainEventStorageRentAllOf.md)
- [OnChainEventsApiGetOnChainIdRegistrationByAddressRequest](../interfaces/openapi.OnChainEventsApiGetOnChainIdRegistrationByAddressRequest.md)
- [OnChainEventsApiListOnChainEventsByFidRequest](../interfaces/openapi.OnChainEventsApiListOnChainEventsByFidRequest.md)
- [OnChainEventsApiListOnChainSignersByFidRequest](../interfaces/openapi.OnChainEventsApiListOnChainSignersByFidRequest.md)
- [PruneMessageBody](../interfaces/openapi.PruneMessageBody.md)
- [ReactionAllOf](../interfaces/openapi.ReactionAllOf.md)
- [ReactionBody](../interfaces/openapi.ReactionBody.md)
- [ReactionsApiGetReactionByIdRequest](../interfaces/openapi.ReactionsApiGetReactionByIdRequest.md)
- [ReactionsApiListReactionsByCastRequest](../interfaces/openapi.ReactionsApiListReactionsByCastRequest.md)
- [ReactionsApiListReactionsByFidRequest](../interfaces/openapi.ReactionsApiListReactionsByFidRequest.md)
- [ReactionsApiListReactionsByTargetRequest](../interfaces/openapi.ReactionsApiListReactionsByTargetRequest.md)
- [RevokeMessageBody](../interfaces/openapi.RevokeMessageBody.md)
- [SignerEventBody](../interfaces/openapi.SignerEventBody.md)
- [SignerMigratedEventBody](../interfaces/openapi.SignerMigratedEventBody.md)
- [StorageApiGetStorageLimitsByFidRequest](../interfaces/openapi.StorageApiGetStorageLimitsByFidRequest.md)
- [StorageLimit](../interfaces/openapi.StorageLimit.md)
- [StorageLimitsResponse](../interfaces/openapi.StorageLimitsResponse.md)
- [StorageRentEventBody](../interfaces/openapi.StorageRentEventBody.md)
- [SubmitMessageApiSubmitMessageRequest](../interfaces/openapi.SubmitMessageApiSubmitMessageRequest.md)
- [UserDataAddAllOf](../interfaces/openapi.UserDataAddAllOf.md)
- [UserDataApiGetUserDataByFidRequest](../interfaces/openapi.UserDataApiGetUserDataByFidRequest.md)
- [UserDataBody](../interfaces/openapi.UserDataBody.md)
- [UserNameProof](../interfaces/openapi.UserNameProof.md)
- [UsernameProofsResponse](../interfaces/openapi.UsernameProofsResponse.md)
- [UsernamesApiGetUsernameProofRequest](../interfaces/openapi.UsernamesApiGetUsernameProofRequest.md)
- [UsernamesApiListUsernameProofsByFidRequest](../interfaces/openapi.UsernamesApiListUsernameProofsByFidRequest.md)
- [VerificationAddEthAddressBody](../interfaces/openapi.VerificationAddEthAddressBody.md)
- [VerificationAllOf](../interfaces/openapi.VerificationAllOf.md)
- [VerificationRemoveAllOf](../interfaces/openapi.VerificationRemoveAllOf.md)
- [VerificationRemoveBody](../interfaces/openapi.VerificationRemoveBody.md)
- [VerificationsApiListVerificationsByFidRequest](../interfaces/openapi.VerificationsApiListVerificationsByFidRequest.md)

### Type Aliases

- [CastAdd](openapi.md#castadd)
- [CastRemove](openapi.md#castremove)
- [GetUserDataByFid200Response](openapi.md#getuserdatabyfid200response)
- [HubEvent](openapi.md#hubevent)
- [LinkAdd](openapi.md#linkadd)
- [LinkRemove](openapi.md#linkremove)
- [ListOnChainSignersByFid200Response](openapi.md#listonchainsignersbyfid200response)
- [Message](openapi.md#message)
- [MessageAllOfData](openapi.md#messageallofdata)
- [MessageDataCastAdd](openapi.md#messagedatacastadd)
- [MessageDataCastRemove](openapi.md#messagedatacastremove)
- [MessageDataLink](openapi.md#messagedatalink)
- [MessageDataReaction](openapi.md#messagedatareaction)
- [MessageDataUserDataAdd](openapi.md#messagedatauserdataadd)
- [MessageDataUsernameProof](openapi.md#messagedatausernameproof)
- [MessageDataVerificationAdd](openapi.md#messagedataverificationadd)
- [MessageDataVerificationRemove](openapi.md#messagedataverificationremove)
- [OnChainEvent](openapi.md#onchainevent)
- [OnChainEventIdRegister](openapi.md#onchaineventidregister)
- [OnChainEventSigner](openapi.md#onchaineventsigner)
- [OnChainEventSignerMigrated](openapi.md#onchaineventsignermigrated)
- [OnChainEventStorageRent](openapi.md#onchaineventstoragerent)
- [Reaction](openapi.md#reaction)
- [ReactionRemove](openapi.md#reactionremove)
- [UserDataAdd](openapi.md#userdataadd)
- [Verification](openapi.md#verification)
- [VerificationRemove](openapi.md#verificationremove)

### Functions

- [CastsApiAxiosParamCreator](openapi.md#castsapiaxiosparamcreator)
- [CastsApiFactory](openapi.md#castsapifactory)
- [CastsApiFp](openapi.md#castsapifp)
- [FIDsApiAxiosParamCreator](openapi.md#fidsapiaxiosparamcreator)
- [FIDsApiFactory](openapi.md#fidsapifactory)
- [FIDsApiFp](openapi.md#fidsapifp)
- [HubEventsApiAxiosParamCreator](openapi.md#hubeventsapiaxiosparamcreator)
- [HubEventsApiFactory](openapi.md#hubeventsapifactory)
- [HubEventsApiFp](openapi.md#hubeventsapifp)
- [InfoApiAxiosParamCreator](openapi.md#infoapiaxiosparamcreator)
- [InfoApiFactory](openapi.md#infoapifactory)
- [InfoApiFp](openapi.md#infoapifp)
- [LinksApiAxiosParamCreator](openapi.md#linksapiaxiosparamcreator)
- [LinksApiFactory](openapi.md#linksapifactory)
- [LinksApiFp](openapi.md#linksapifp)
- [OnChainEventsApiAxiosParamCreator](openapi.md#onchaineventsapiaxiosparamcreator)
- [OnChainEventsApiFactory](openapi.md#onchaineventsapifactory)
- [OnChainEventsApiFp](openapi.md#onchaineventsapifp)
- [ReactionsApiAxiosParamCreator](openapi.md#reactionsapiaxiosparamcreator)
- [ReactionsApiFactory](openapi.md#reactionsapifactory)
- [ReactionsApiFp](openapi.md#reactionsapifp)
- [StorageApiAxiosParamCreator](openapi.md#storageapiaxiosparamcreator)
- [StorageApiFactory](openapi.md#storageapifactory)
- [StorageApiFp](openapi.md#storageapifp)
- [SubmitMessageApiAxiosParamCreator](openapi.md#submitmessageapiaxiosparamcreator)
- [SubmitMessageApiFactory](openapi.md#submitmessageapifactory)
- [SubmitMessageApiFp](openapi.md#submitmessageapifp)
- [UserDataApiAxiosParamCreator](openapi.md#userdataapiaxiosparamcreator)
- [UserDataApiFactory](openapi.md#userdataapifactory)
- [UserDataApiFp](openapi.md#userdataapifp)
- [UsernamesApiAxiosParamCreator](openapi.md#usernamesapiaxiosparamcreator)
- [UsernamesApiFactory](openapi.md#usernamesapifactory)
- [UsernamesApiFp](openapi.md#usernamesapifp)
- [VerificationsApiAxiosParamCreator](openapi.md#verificationsapiaxiosparamcreator)
- [VerificationsApiFactory](openapi.md#verificationsapifactory)
- [VerificationsApiFp](openapi.md#verificationsapifp)

## Type Aliases

### CastAdd

Ƭ **CastAdd**: [`CastAddAllOf`](../interfaces/openapi.CastAddAllOf.md) & [`MessageCommon`](../interfaces/openapi.MessageCommon.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/cast-add.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/cast-add.ts#L36)

___

### CastRemove

Ƭ **CastRemove**: [`CastRemoveAllOf`](../interfaces/openapi.CastRemoveAllOf.md) & [`MessageCommon`](../interfaces/openapi.MessageCommon.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/cast-remove.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/cast-remove.ts#L36)

___

### GetUserDataByFid200Response

Ƭ **GetUserDataByFid200Response**: [`GetUserDataByFid200ResponseOneOf`](../interfaces/openapi.GetUserDataByFid200ResponseOneOf.md) \| [`UserDataAdd`](openapi.md#userdataadd)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/get-user-data-by-fid200-response.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/get-user-data-by-fid200-response.ts#L36)

___

### HubEvent

Ƭ **HubEvent**: \{ `type`: ``"HUB_EVENT_TYPE_MERGE_MESSAGE"``  } & [`HubEventMergeMessage`](../interfaces/openapi.HubEventMergeMessage.md) \| \{ `type`: ``"HUB_EVENT_TYPE_MERGE_ON_CHAIN_EVENT"``  } & [`HubEventMergeOnChainEvent`](../interfaces/openapi.HubEventMergeOnChainEvent.md) \| \{ `type`: ``"HUB_EVENT_TYPE_MERGE_USERNAME_PROOF"``  } & [`HubEventMergeUsernameProof`](../interfaces/openapi.HubEventMergeUsernameProof.md) \| \{ `type`: ``"HUB_EVENT_TYPE_PRUNE_MESSAGE"``  } & [`HubEventPruneMessage`](../interfaces/openapi.HubEventPruneMessage.md) \| \{ `type`: ``"HUB_EVENT_TYPE_REVOKE_MESSAGE"``  } & [`HubEventRevokeMessage`](../interfaces/openapi.HubEventRevokeMessage.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/hub-event.ts:51](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/hub-event.ts#L51)

___

### LinkAdd

Ƭ **LinkAdd**: [`LinkAddAllOf`](../interfaces/openapi.LinkAddAllOf.md) & [`MessageCommon`](../interfaces/openapi.MessageCommon.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/link-add.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/link-add.ts#L36)

___

### LinkRemove

Ƭ **LinkRemove**: [`LinkAddAllOf`](../interfaces/openapi.LinkAddAllOf.md) & [`MessageCommon`](../interfaces/openapi.MessageCommon.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/link-remove.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/link-remove.ts#L36)

___

### ListOnChainSignersByFid200Response

Ƭ **ListOnChainSignersByFid200Response**: [`ListOnChainSignersByFid200ResponseOneOf`](../interfaces/openapi.ListOnChainSignersByFid200ResponseOneOf.md) \| [`OnChainEventSigner`](openapi.md#onchaineventsigner)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/list-on-chain-signers-by-fid200-response.ts:30](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/list-on-chain-signers-by-fid200-response.ts#L30)

___

### Message

Ƭ **Message**: [`MessageAllOf`](../interfaces/openapi.MessageAllOf.md) & [`MessageCommon`](../interfaces/openapi.MessageCommon.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message.ts:37](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message.ts#L37)

___

### MessageAllOfData

Ƭ **MessageAllOfData**: \{ `type`: ``"MESSAGE_TYPE_CAST_ADD"``  } & [`MessageDataCastAdd`](openapi.md#messagedatacastadd) \| \{ `type`: ``"MESSAGE_TYPE_CAST_REMOVE"``  } & [`MessageDataCastRemove`](openapi.md#messagedatacastremove) \| \{ `type`: ``"MESSAGE_TYPE_LINK_ADD"``  } & [`MessageDataLink`](openapi.md#messagedatalink) \| \{ `type`: ``"MESSAGE_TYPE_LINK_REMOVE"``  } & [`MessageDataLink`](openapi.md#messagedatalink) \| \{ `type`: ``"MESSAGE_TYPE_REACTION_ADD"``  } & [`MessageDataReaction`](openapi.md#messagedatareaction) \| \{ `type`: ``"MESSAGE_TYPE_REACTION_REMOVE"``  } & [`MessageDataReaction`](openapi.md#messagedatareaction) \| \{ `type`: ``"MESSAGE_TYPE_USERNAME_PROOF"``  } & [`MessageDataUsernameProof`](openapi.md#messagedatausernameproof) \| \{ `type`: ``"MESSAGE_TYPE_USER_DATA_ADD"``  } & [`MessageDataUserDataAdd`](openapi.md#messagedatauserdataadd) \| \{ `type`: ``"MESSAGE_TYPE_VERIFICATION_ADD_ETH_ADDRESS"``  } & [`MessageDataVerificationAdd`](openapi.md#messagedataverificationadd) \| \{ `type`: ``"MESSAGE_TYPE_VERIFICATION_REMOVE"``  } & [`MessageDataVerificationRemove`](openapi.md#messagedataverificationremove)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-all-of-data.ts:75](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-all-of-data.ts#L75)

___

### MessageDataCastAdd

Ƭ **MessageDataCastAdd**: [`MessageDataCastAddAllOf`](../interfaces/openapi.MessageDataCastAddAllOf.md) & [`MessageDataCommon`](../interfaces/openapi.MessageDataCommon.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-cast-add.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-cast-add.ts#L36)

___

### MessageDataCastRemove

Ƭ **MessageDataCastRemove**: [`MessageDataCastRemoveAllOf`](../interfaces/openapi.MessageDataCastRemoveAllOf.md) & [`MessageDataCommon`](../interfaces/openapi.MessageDataCommon.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-cast-remove.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-cast-remove.ts#L36)

___

### MessageDataLink

Ƭ **MessageDataLink**: [`MessageDataCommon`](../interfaces/openapi.MessageDataCommon.md) & [`MessageDataLinkAllOf`](../interfaces/openapi.MessageDataLinkAllOf.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-link.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-link.ts#L36)

___

### MessageDataReaction

Ƭ **MessageDataReaction**: [`MessageDataCommon`](../interfaces/openapi.MessageDataCommon.md) & [`MessageDataReactionAllOf`](../interfaces/openapi.MessageDataReactionAllOf.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-reaction.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-reaction.ts#L36)

___

### MessageDataUserDataAdd

Ƭ **MessageDataUserDataAdd**: [`MessageDataCommon`](../interfaces/openapi.MessageDataCommon.md) & [`MessageDataUserDataAddAllOf`](../interfaces/openapi.MessageDataUserDataAddAllOf.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-user-data-add.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-user-data-add.ts#L36)

___

### MessageDataUsernameProof

Ƭ **MessageDataUsernameProof**: [`MessageDataCommon`](../interfaces/openapi.MessageDataCommon.md) & [`MessageDataUsernameProofAllOf`](../interfaces/openapi.MessageDataUsernameProofAllOf.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-username-proof.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-username-proof.ts#L36)

___

### MessageDataVerificationAdd

Ƭ **MessageDataVerificationAdd**: [`MessageDataCommon`](../interfaces/openapi.MessageDataCommon.md) & [`MessageDataVerificationAddAllOf`](../interfaces/openapi.MessageDataVerificationAddAllOf.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-verification-add.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-verification-add.ts#L36)

___

### MessageDataVerificationRemove

Ƭ **MessageDataVerificationRemove**: [`MessageDataCommon`](../interfaces/openapi.MessageDataCommon.md) & [`MessageDataVerificationRemoveAllOf`](../interfaces/openapi.MessageDataVerificationRemoveAllOf.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-verification-remove.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-data-verification-remove.ts#L36)

___

### OnChainEvent

Ƭ **OnChainEvent**: \{ `type`: ``"EVENT_TYPE_ID_REGISTER"``  } & [`OnChainEventIdRegister`](openapi.md#onchaineventidregister) \| \{ `type`: ``"EVENT_TYPE_SIGNER"``  } & [`OnChainEventSigner`](openapi.md#onchaineventsigner) \| \{ `type`: ``"EVENT_TYPE_SIGNER_MIGRATED"``  } & [`OnChainEventSignerMigrated`](openapi.md#onchaineventsignermigrated) \| \{ `type`: ``"EVENT_TYPE_STORAGE_RENT"``  } & [`OnChainEventStorageRent`](openapi.md#onchaineventstoragerent)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/on-chain-event.ts:45](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/on-chain-event.ts#L45)

___

### OnChainEventIdRegister

Ƭ **OnChainEventIdRegister**: [`OnChainEventCommon`](../interfaces/openapi.OnChainEventCommon.md) & [`OnChainEventIdRegisterAllOf`](../interfaces/openapi.OnChainEventIdRegisterAllOf.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/on-chain-event-id-register.ts:30](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/on-chain-event-id-register.ts#L30)

___

### OnChainEventSigner

Ƭ **OnChainEventSigner**: [`OnChainEventCommon`](../interfaces/openapi.OnChainEventCommon.md) & [`OnChainEventSignerAllOf`](../interfaces/openapi.OnChainEventSignerAllOf.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/on-chain-event-signer.ts:30](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/on-chain-event-signer.ts#L30)

___

### OnChainEventSignerMigrated

Ƭ **OnChainEventSignerMigrated**: [`OnChainEventCommon`](../interfaces/openapi.OnChainEventCommon.md) & [`OnChainEventSignerMigratedAllOf`](../interfaces/openapi.OnChainEventSignerMigratedAllOf.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/on-chain-event-signer-migrated.ts:30](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/on-chain-event-signer-migrated.ts#L30)

___

### OnChainEventStorageRent

Ƭ **OnChainEventStorageRent**: [`OnChainEventCommon`](../interfaces/openapi.OnChainEventCommon.md) & [`OnChainEventStorageRentAllOf`](../interfaces/openapi.OnChainEventStorageRentAllOf.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/on-chain-event-storage-rent.ts:30](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/on-chain-event-storage-rent.ts#L30)

___

### Reaction

Ƭ **Reaction**: [`MessageCommon`](../interfaces/openapi.MessageCommon.md) & [`ReactionAllOf`](../interfaces/openapi.ReactionAllOf.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/reaction.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/reaction.ts#L36)

___

### ReactionRemove

Ƭ **ReactionRemove**: [`MessageCommon`](../interfaces/openapi.MessageCommon.md) & [`ReactionAllOf`](../interfaces/openapi.ReactionAllOf.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/reaction-remove.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/reaction-remove.ts#L36)

___

### UserDataAdd

Ƭ **UserDataAdd**: [`MessageCommon`](../interfaces/openapi.MessageCommon.md) & [`UserDataAddAllOf`](../interfaces/openapi.UserDataAddAllOf.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/user-data-add.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/user-data-add.ts#L36)

___

### Verification

Ƭ **Verification**: [`MessageCommon`](../interfaces/openapi.MessageCommon.md) & [`VerificationAllOf`](../interfaces/openapi.VerificationAllOf.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/verification.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/verification.ts#L36)

___

### VerificationRemove

Ƭ **VerificationRemove**: [`MessageCommon`](../interfaces/openapi.MessageCommon.md) & [`VerificationRemoveAllOf`](../interfaces/openapi.VerificationRemoveAllOf.md)

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/verification-remove.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/verification-remove.ts#L36)

## Functions

### CastsApiAxiosParamCreator

▸ **CastsApiAxiosParamCreator**(`configuration?`): `Object`

CastsApi - axios parameter creator

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getCastById` | (`fid`: `number`, `hash`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |
| `listCastsByFid` | (`fid`: `number`, `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |
| `listCastsByMention` | (`fid`: `number`, `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |
| `listCastsByParent` | (`fid?`: `number`, `hash?`: `string`, `url?`: `string`, `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts:34](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts#L34)

___

### CastsApiFactory

▸ **CastsApiFactory**(`configuration?`, `basePath?`, `axios?`): `Object`

CastsApi - factory interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |
| `basePath?` | `string` |
| `axios?` | `AxiosInstance` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getCastById` | (`requestParameters`: [`CastsApiGetCastByIdRequest`](../interfaces/openapi.CastsApiGetCastByIdRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`CastAdd`](openapi.md#castadd)\> |
| `listCastsByFid` | (`requestParameters`: [`CastsApiListCastsByFidRequest`](../interfaces/openapi.CastsApiListCastsByFidRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`ListCastsByFid200Response`](../interfaces/openapi.ListCastsByFid200Response.md)\> |
| `listCastsByMention` | (`requestParameters`: [`CastsApiListCastsByMentionRequest`](../interfaces/openapi.CastsApiListCastsByMentionRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`ListCastsByFid200Response`](../interfaces/openapi.ListCastsByFid200Response.md)\> |
| `listCastsByParent` | (`requestParameters`: [`CastsApiListCastsByParentRequest`](../interfaces/openapi.CastsApiListCastsByParentRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`ListCastsByFid200Response`](../interfaces/openapi.ListCastsByFid200Response.md)\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts:317](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts#L317)

___

### CastsApiFp

▸ **CastsApiFp**(`configuration?`): `Object`

CastsApi - functional programming interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getCastById` | (`fid`: `number`, `hash`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`CastAdd`](openapi.md#castadd)\>\> |
| `listCastsByFid` | (`fid`: `number`, `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`ListCastsByFid200Response`](../interfaces/openapi.ListCastsByFid200Response.md)\>\> |
| `listCastsByMention` | (`fid`: `number`, `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`ListCastsByFid200Response`](../interfaces/openapi.ListCastsByFid200Response.md)\>\> |
| `listCastsByParent` | (`fid?`: `number`, `hash?`: `string`, `url?`: `string`, `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`ListCastsByFid200Response`](../interfaces/openapi.ListCastsByFid200Response.md)\>\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts:251](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/casts-api.ts#L251)

___

### FIDsApiAxiosParamCreator

▸ **FIDsApiAxiosParamCreator**(`configuration?`): `Object`

FIDsApi - axios parameter creator

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `listFids` | (`pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/fids-api.ts:32](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/fids-api.ts#L32)

___

### FIDsApiFactory

▸ **FIDsApiFactory**(`configuration?`, `basePath?`, `axios?`): `Object`

FIDsApi - factory interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |
| `basePath?` | `string` |
| `axios?` | `AxiosInstance` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `listFids` | (`requestParameters`: [`FIDsApiListFidsRequest`](../interfaces/openapi.FIDsApiListFidsRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`FidsResponse`](../interfaces/openapi.FidsResponse.md)\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/fids-api.ts:109](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/fids-api.ts#L109)

___

### FIDsApiFp

▸ **FIDsApiFp**(`configuration?`): `Object`

FIDsApi - functional programming interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `listFids` | (`pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`FidsResponse`](../interfaces/openapi.FidsResponse.md)\>\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/fids-api.ts:86](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/fids-api.ts#L86)

___

### HubEventsApiAxiosParamCreator

▸ **HubEventsApiAxiosParamCreator**(`configuration?`): `Object`

HubEventsApi - axios parameter creator

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getEventById` | (`eventId`: `number`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |
| `listEvents` | (`fromEventId?`: `number`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/hub-events-api.ts:34](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/hub-events-api.ts#L34)

___

### HubEventsApiFactory

▸ **HubEventsApiFactory**(`configuration?`, `basePath?`, `axios?`): `Object`

HubEventsApi - factory interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |
| `basePath?` | `string` |
| `axios?` | `AxiosInstance` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getEventById` | (`requestParameters`: [`HubEventsApiGetEventByIdRequest`](../interfaces/openapi.HubEventsApiGetEventByIdRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`HubEvent`](openapi.md#hubevent)\> |
| `listEvents` | (`requestParameters`: [`HubEventsApiListEventsRequest`](../interfaces/openapi.HubEventsApiListEventsRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`ListEvents200Response`](../interfaces/openapi.ListEvents200Response.md)\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/hub-events-api.ts:147](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/hub-events-api.ts#L147)

___

### HubEventsApiFp

▸ **HubEventsApiFp**(`configuration?`): `Object`

HubEventsApi - functional programming interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getEventById` | (`eventId`: `number`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`HubEvent`](openapi.md#hubevent)\>\> |
| `listEvents` | (`fromEventId?`: `number`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`ListEvents200Response`](../interfaces/openapi.ListEvents200Response.md)\>\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/hub-events-api.ts:115](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/hub-events-api.ts#L115)

___

### InfoApiAxiosParamCreator

▸ **InfoApiAxiosParamCreator**(`configuration?`): `Object`

InfoApi - axios parameter creator

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getInfo` | (`dbstats`: `boolean`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/info-api.ts:32](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/info-api.ts#L32)

___

### InfoApiFactory

▸ **InfoApiFactory**(`configuration?`, `basePath?`, `axios?`): `Object`

InfoApi - factory interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |
| `basePath?` | `string` |
| `axios?` | `AxiosInstance` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getInfo` | (`requestParameters`: [`InfoApiGetInfoRequest`](../interfaces/openapi.InfoApiGetInfoRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`HubInfoResponse`](../interfaces/openapi.HubInfoResponse.md)\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/info-api.ts:99](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/info-api.ts#L99)

___

### InfoApiFp

▸ **InfoApiFp**(`configuration?`): `Object`

InfoApi - functional programming interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getInfo` | (`dbstats`: `boolean`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`HubInfoResponse`](../interfaces/openapi.HubInfoResponse.md)\>\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/info-api.ts:78](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/info-api.ts#L78)

___

### LinksApiAxiosParamCreator

▸ **LinksApiAxiosParamCreator**(`configuration?`): `Object`

LinksApi - axios parameter creator

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getLinkById` | (`fid`: `number`, `targetFid`: `number`, `linkType`: [`Follow`](../enums/openapi.LinkType.md#follow), `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |
| `listLinksByFid` | (`fid`: `number`, `linkType?`: [`Follow`](../enums/openapi.LinkType.md#follow), `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |
| `listLinksByTargetFid` | (`targetFid`: `number`, `linkType?`: [`Follow`](../enums/openapi.LinkType.md#follow), `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L36)

___

### LinksApiFactory

▸ **LinksApiFactory**(`configuration?`, `basePath?`, `axios?`): `Object`

LinksApi - factory interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |
| `basePath?` | `string` |
| `axios?` | `AxiosInstance` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getLinkById` | (`requestParameters`: [`LinksApiGetLinkByIdRequest`](../interfaces/openapi.LinksApiGetLinkByIdRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`LinkAdd`](openapi.md#linkadd)\> |
| `listLinksByFid` | (`requestParameters`: [`LinksApiListLinksByFidRequest`](../interfaces/openapi.LinksApiListLinksByFidRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`ListLinksByFid200Response`](../interfaces/openapi.ListLinksByFid200Response.md)\> |
| `listLinksByTargetFid` | (`requestParameters`: [`LinksApiListLinksByTargetFidRequest`](../interfaces/openapi.LinksApiListLinksByTargetFidRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`ListLinksByFid200Response`](../interfaces/openapi.ListLinksByFid200Response.md)\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:263](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L263)

___

### LinksApiFp

▸ **LinksApiFp**(`configuration?`): `Object`

LinksApi - functional programming interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getLinkById` | (`fid`: `number`, `targetFid`: `number`, `linkType`: [`Follow`](../enums/openapi.LinkType.md#follow), `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`LinkAdd`](openapi.md#linkadd)\>\> |
| `listLinksByFid` | (`fid`: `number`, `linkType?`: [`Follow`](../enums/openapi.LinkType.md#follow), `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`ListLinksByFid200Response`](../interfaces/openapi.ListLinksByFid200Response.md)\>\> |
| `listLinksByTargetFid` | (`targetFid`: `number`, `linkType?`: [`Follow`](../enums/openapi.LinkType.md#follow), `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`ListLinksByFid200Response`](../interfaces/openapi.ListLinksByFid200Response.md)\>\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:210](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L210)

___

### OnChainEventsApiAxiosParamCreator

▸ **OnChainEventsApiAxiosParamCreator**(`configuration?`): `Object`

OnChainEventsApi - axios parameter creator

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getOnChainIdRegistrationByAddress` | (`address`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |
| `listOnChainEventsByFid` | (`fid`: `number`, `eventType`: [`OnChainEventType`](../enums/openapi.OnChainEventType.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |
| `listOnChainSignersByFid` | (`fid`: `number`, `signer?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/on-chain-events-api.ts:38](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/on-chain-events-api.ts#L38)

___

### OnChainEventsApiFactory

▸ **OnChainEventsApiFactory**(`configuration?`, `basePath?`, `axios?`): `Object`

OnChainEventsApi - factory interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |
| `basePath?` | `string` |
| `axios?` | `AxiosInstance` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getOnChainIdRegistrationByAddress` | (`requestParameters`: [`OnChainEventsApiGetOnChainIdRegistrationByAddressRequest`](../interfaces/openapi.OnChainEventsApiGetOnChainIdRegistrationByAddressRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`OnChainEventIdRegister`](openapi.md#onchaineventidregister)\> |
| `listOnChainEventsByFid` | (`requestParameters`: [`OnChainEventsApiListOnChainEventsByFidRequest`](../interfaces/openapi.OnChainEventsApiListOnChainEventsByFidRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`ListOnChainEventsByFid200Response`](../interfaces/openapi.ListOnChainEventsByFid200Response.md)\> |
| `listOnChainSignersByFid` | (`requestParameters`: [`OnChainEventsApiListOnChainSignersByFidRequest`](../interfaces/openapi.OnChainEventsApiListOnChainSignersByFidRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`ListOnChainSignersByFid200Response`](openapi.md#listonchainsignersbyfid200response)\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/on-chain-events-api.ts:215](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/on-chain-events-api.ts#L215)

___

### OnChainEventsApiFp

▸ **OnChainEventsApiFp**(`configuration?`): `Object`

OnChainEventsApi - functional programming interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getOnChainIdRegistrationByAddress` | (`address`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`OnChainEventIdRegister`](openapi.md#onchaineventidregister)\>\> |
| `listOnChainEventsByFid` | (`fid`: `number`, `eventType`: [`OnChainEventType`](../enums/openapi.OnChainEventType.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`ListOnChainEventsByFid200Response`](../interfaces/openapi.ListOnChainEventsByFid200Response.md)\>\> |
| `listOnChainSignersByFid` | (`fid`: `number`, `signer?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`ListOnChainSignersByFid200Response`](openapi.md#listonchainsignersbyfid200response)\>\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/on-chain-events-api.ts:170](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/on-chain-events-api.ts#L170)

___

### ReactionsApiAxiosParamCreator

▸ **ReactionsApiAxiosParamCreator**(`configuration?`): `Object`

ReactionsApi - axios parameter creator

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getReactionById` | (`fid`: `number`, `targetFid`: `number`, `targetHash`: `string`, `reactionType`: [`ReactionType`](../enums/openapi.ReactionType.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |
| `listReactionsByCast` | (`targetFid`: `number`, `targetHash`: `string`, `reactionType`: [`ReactionType`](../enums/openapi.ReactionType.md), `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |
| `listReactionsByFid` | (`fid`: `number`, `reactionType`: [`ReactionType`](../enums/openapi.ReactionType.md), `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |
| `listReactionsByTarget` | (`url`: `string`, `reactionType`: [`ReactionType`](../enums/openapi.ReactionType.md), `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L36)

___

### ReactionsApiFactory

▸ **ReactionsApiFactory**(`configuration?`, `basePath?`, `axios?`): `Object`

ReactionsApi - factory interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |
| `basePath?` | `string` |
| `axios?` | `AxiosInstance` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getReactionById` | (`requestParameters`: [`ReactionsApiGetReactionByIdRequest`](../interfaces/openapi.ReactionsApiGetReactionByIdRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`Reaction`](openapi.md#reaction)\> |
| `listReactionsByCast` | (`requestParameters`: [`ReactionsApiListReactionsByCastRequest`](../interfaces/openapi.ReactionsApiListReactionsByCastRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`ListReactionsByCast200Response`](../interfaces/openapi.ListReactionsByCast200Response.md)\> |
| `listReactionsByFid` | (`requestParameters`: [`ReactionsApiListReactionsByFidRequest`](../interfaces/openapi.ReactionsApiListReactionsByFidRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`ListReactionsByCast200Response`](../interfaces/openapi.ListReactionsByCast200Response.md)\> |
| `listReactionsByTarget` | (`requestParameters`: [`ReactionsApiListReactionsByTargetRequest`](../interfaces/openapi.ReactionsApiListReactionsByTargetRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`ListReactionsByCast200Response`](../interfaces/openapi.ListReactionsByCast200Response.md)\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:357](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L357)

___

### ReactionsApiFp

▸ **ReactionsApiFp**(`configuration?`): `Object`

ReactionsApi - functional programming interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getReactionById` | (`fid`: `number`, `targetFid`: `number`, `targetHash`: `string`, `reactionType`: [`ReactionType`](../enums/openapi.ReactionType.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`Reaction`](openapi.md#reaction)\>\> |
| `listReactionsByCast` | (`targetFid`: `number`, `targetHash`: `string`, `reactionType`: [`ReactionType`](../enums/openapi.ReactionType.md), `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`ListReactionsByCast200Response`](../interfaces/openapi.ListReactionsByCast200Response.md)\>\> |
| `listReactionsByFid` | (`fid`: `number`, `reactionType`: [`ReactionType`](../enums/openapi.ReactionType.md), `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`ListReactionsByCast200Response`](../interfaces/openapi.ListReactionsByCast200Response.md)\>\> |
| `listReactionsByTarget` | (`url`: `string`, `reactionType`: [`ReactionType`](../enums/openapi.ReactionType.md), `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`ListReactionsByCast200Response`](../interfaces/openapi.ListReactionsByCast200Response.md)\>\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts:287](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/reactions-api.ts#L287)

___

### StorageApiAxiosParamCreator

▸ **StorageApiAxiosParamCreator**(`configuration?`): `Object`

StorageApi - axios parameter creator

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getStorageLimitsByFid` | (`fid`: `number`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/storage-api.ts:32](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/storage-api.ts#L32)

___

### StorageApiFactory

▸ **StorageApiFactory**(`configuration?`, `basePath?`, `axios?`): `Object`

StorageApi - factory interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |
| `basePath?` | `string` |
| `axios?` | `AxiosInstance` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getStorageLimitsByFid` | (`requestParameters`: [`StorageApiGetStorageLimitsByFidRequest`](../interfaces/openapi.StorageApiGetStorageLimitsByFidRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`StorageLimitsResponse`](../interfaces/openapi.StorageLimitsResponse.md)\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/storage-api.ts:99](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/storage-api.ts#L99)

___

### StorageApiFp

▸ **StorageApiFp**(`configuration?`): `Object`

StorageApi - functional programming interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getStorageLimitsByFid` | (`fid`: `number`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`StorageLimitsResponse`](../interfaces/openapi.StorageLimitsResponse.md)\>\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/storage-api.ts:78](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/storage-api.ts#L78)

___

### SubmitMessageApiAxiosParamCreator

▸ **SubmitMessageApiAxiosParamCreator**(`configuration?`): `Object`

SubmitMessageApi - axios parameter creator

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `submitMessage` | (`body`: [`Message`](openapi.md#message), `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/submit-message-api.ts:32](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/submit-message-api.ts#L32)

___

### SubmitMessageApiFactory

▸ **SubmitMessageApiFactory**(`configuration?`, `basePath?`, `axios?`): `Object`

SubmitMessageApi - factory interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |
| `basePath?` | `string` |
| `axios?` | `AxiosInstance` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `submitMessage` | (`requestParameters`: [`SubmitMessageApiSubmitMessageRequest`](../interfaces/openapi.SubmitMessageApiSubmitMessageRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`Message`](openapi.md#message)\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/submit-message-api.ts:102](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/submit-message-api.ts#L102)

___

### SubmitMessageApiFp

▸ **SubmitMessageApiFp**(`configuration?`): `Object`

SubmitMessageApi - functional programming interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `submitMessage` | (`body`: [`Message`](openapi.md#message), `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`Message`](openapi.md#message)\>\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/submit-message-api.ts:81](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/submit-message-api.ts#L81)

___

### UserDataApiAxiosParamCreator

▸ **UserDataApiAxiosParamCreator**(`configuration?`): `Object`

UserDataApi - axios parameter creator

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getUserDataByFid` | (`fid`: `number`, `userDataType?`: [`UserDataType`](../enums/openapi.UserDataType.md), `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts:34](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts#L34)

___

### UserDataApiFactory

▸ **UserDataApiFactory**(`configuration?`, `basePath?`, `axios?`): `Object`

UserDataApi - factory interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |
| `basePath?` | `string` |
| `axios?` | `AxiosInstance` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getUserDataByFid` | (`requestParameters`: [`UserDataApiGetUserDataByFidRequest`](../interfaces/openapi.UserDataApiGetUserDataByFidRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`GetUserDataByFid200Response`](openapi.md#getuserdatabyfid200response)\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts:125](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts#L125)

___

### UserDataApiFp

▸ **UserDataApiFp**(`configuration?`): `Object`

UserDataApi - functional programming interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getUserDataByFid` | (`fid`: `number`, `userDataType?`: [`UserDataType`](../enums/openapi.UserDataType.md), `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`GetUserDataByFid200Response`](openapi.md#getuserdatabyfid200response)\>\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts:100](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/user-data-api.ts#L100)

___

### UsernamesApiAxiosParamCreator

▸ **UsernamesApiAxiosParamCreator**(`configuration?`): `Object`

UsernamesApi - axios parameter creator

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getUsernameProof` | (`name`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |
| `listUsernameProofsByFid` | (`fid`: `number`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/usernames-api.ts:34](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/usernames-api.ts#L34)

___

### UsernamesApiFactory

▸ **UsernamesApiFactory**(`configuration?`, `basePath?`, `axios?`): `Object`

UsernamesApi - factory interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |
| `basePath?` | `string` |
| `axios?` | `AxiosInstance` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getUsernameProof` | (`requestParameters`: [`UsernamesApiGetUsernameProofRequest`](../interfaces/openapi.UsernamesApiGetUsernameProofRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`UserNameProof`](../interfaces/openapi.UserNameProof.md)\> |
| `listUsernameProofsByFid` | (`requestParameters`: [`UsernamesApiListUsernameProofsByFidRequest`](../interfaces/openapi.UsernamesApiListUsernameProofsByFidRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`UsernameProofsResponse`](../interfaces/openapi.UsernameProofsResponse.md)\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/usernames-api.ts:149](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/usernames-api.ts#L149)

___

### UsernamesApiFp

▸ **UsernamesApiFp**(`configuration?`): `Object`

UsernamesApi - functional programming interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getUsernameProof` | (`name`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`UserNameProof`](../interfaces/openapi.UserNameProof.md)\>\> |
| `listUsernameProofsByFid` | (`fid`: `number`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`UsernameProofsResponse`](../interfaces/openapi.UsernameProofsResponse.md)\>\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/usernames-api.ts:117](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/usernames-api.ts#L117)

___

### VerificationsApiAxiosParamCreator

▸ **VerificationsApiAxiosParamCreator**(`configuration?`): `Object`

VerificationsApi - axios parameter creator

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `listVerificationsByFid` | (`fid`: `number`, `address?`: `string`, `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<`RequestArgs`\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts:32](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts#L32)

___

### VerificationsApiFactory

▸ **VerificationsApiFactory**(`configuration?`, `basePath?`, `axios?`): `Object`

VerificationsApi - factory interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |
| `basePath?` | `string` |
| `axios?` | `AxiosInstance` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `listVerificationsByFid` | (`requestParameters`: [`VerificationsApiListVerificationsByFidRequest`](../interfaces/openapi.VerificationsApiListVerificationsByFidRequest.md), `options?`: `AxiosRequestConfig`\<`any`\>) => `AxiosPromise`\<[`ListVerificationsByFid200Response`](../interfaces/openapi.ListVerificationsByFid200Response.md)\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts:123](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts#L123)

___

### VerificationsApiFp

▸ **VerificationsApiFp**(`configuration?`): `Object`

VerificationsApi - functional programming interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](../classes/openapi.Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `listVerificationsByFid` | (`fid`: `number`, `address?`: `string`, `pageSize?`: `number`, `reverse?`: `boolean`, `pageToken?`: `string`, `options?`: `AxiosRequestConfig`\<`any`\>) => `Promise`\<(`axios?`: `AxiosInstance`, `basePath?`: `string`) => `AxiosPromise`\<[`ListVerificationsByFid200Response`](../interfaces/openapi.ListVerificationsByFid200Response.md)\>\> |

**`Export`**

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts:98](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts#L98)
