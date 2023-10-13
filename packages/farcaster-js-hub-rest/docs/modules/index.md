[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / index

# Module: index

## Table of contents

### Classes

- [HubRestAPIClient](../classes/index.HubRestAPIClient.md)

### Interfaces

- [HubRestAPIClientConfig](../interfaces/index.HubRestAPIClientConfig.md)
- [PaginationOptions](../interfaces/index.PaginationOptions.md)

### Type Aliases

- [OnChainEventsReturnType](index.md#onchaineventsreturntype)

### Variables

- [DEFAULT\_SERVER](index.md#default_server)

## Type Aliases

### OnChainEventsReturnType

Ƭ **OnChainEventsReturnType**<`T`\>: `T` extends [`Signer`](../enums/openapi.OnChainEventType.md#signer) ? [`OnChainEventSigner`](openapi.md#onchaineventsigner) : `T` extends [`SignerMigrated`](../enums/openapi.OnChainEventType.md#signermigrated) ? [`OnChainEventSignerMigrated`](openapi.md#onchaineventsignermigrated) : `T` extends [`IdRegister`](../enums/openapi.OnChainEventType.md#idregister) ? [`OnChainEventIdRegister`](openapi.md#onchaineventidregister) : `T` extends [`StorageRent`](../enums/openapi.OnChainEventType.md#storagerent) ? [`OnChainEventStorageRent`](openapi.md#onchaineventstoragerent) : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/farcaster-js-hub-rest/src/hubRestApiClient.ts:40](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/hubRestApiClient.ts#L40)

## Variables

### DEFAULT\_SERVER

• `Const` **DEFAULT\_SERVER**: ``"http://hub.farcaster.standardcrypto.vc:2281"``

#### Defined in

[packages/farcaster-js-hub-rest/src/hubRestApiClient.ts:50](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/hubRestApiClient.ts#L50)
