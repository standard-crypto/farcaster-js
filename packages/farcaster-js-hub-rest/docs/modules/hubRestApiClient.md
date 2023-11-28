[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / hubRestApiClient

# Module: hubRestApiClient

## Table of contents

### Classes

- [HubRestAPIClient](../classes/hubRestApiClient.HubRestAPIClient.md)

### Interfaces

- [HubRestAPIClientConfig](../interfaces/hubRestApiClient.HubRestAPIClientConfig.md)
- [PaginationOptions](../interfaces/hubRestApiClient.PaginationOptions.md)

### Type Aliases

- [HubInfo](hubRestApiClient.md#hubinfo)
- [OnChainEventsReturnType](hubRestApiClient.md#onchaineventsreturntype)

### Variables

- [DEFAULT\_HUB\_URL](hubRestApiClient.md#default_hub_url)

## Type Aliases

### HubInfo

Ƭ **HubInfo**<`T`\>: `T` extends ``true`` ? `SetRequired`<[`HubInfoResponse`](../interfaces/openapi.HubInfoResponse.md), ``"dbStats"``\> : [`HubInfoResponse`](../interfaces/openapi.HubInfoResponse.md)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/farcaster-js-hub-rest/src/hubRestApiClient.ts:69](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/hubRestApiClient.ts#L69)

___

### OnChainEventsReturnType

Ƭ **OnChainEventsReturnType**<`T`\>: `T` extends [`Signer`](../enums/openapi.OnChainEventType.md#signer) ? [`OnChainEventSigner`](openapi.md#onchaineventsigner) : `T` extends [`SignerMigrated`](../enums/openapi.OnChainEventType.md#signermigrated) ? [`OnChainEventSignerMigrated`](openapi.md#onchaineventsignermigrated) : `T` extends [`IdRegister`](../enums/openapi.OnChainEventType.md#idregister) ? [`OnChainEventIdRegister`](openapi.md#onchaineventidregister) : `T` extends [`StorageRent`](../enums/openapi.OnChainEventType.md#storagerent) ? [`OnChainEventStorageRent`](openapi.md#onchaineventstoragerent) : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/farcaster-js-hub-rest/src/hubRestApiClient.ts:59](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/hubRestApiClient.ts#L59)

## Variables

### DEFAULT\_HUB\_URL

• `Const` **DEFAULT\_HUB\_URL**: ``"https://nemes.farcaster.xyz:2281"``

#### Defined in

[packages/farcaster-js-hub-rest/src/hubRestApiClient.ts:73](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/hubRestApiClient.ts#L73)
