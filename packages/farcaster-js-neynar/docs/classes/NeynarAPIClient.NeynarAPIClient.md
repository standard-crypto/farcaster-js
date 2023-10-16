[@standard-crypto/farcaster-js-neynar](../README.md) / [Modules](../modules.md) / [NeynarAPIClient](../modules/NeynarAPIClient.md) / NeynarAPIClient

# Class: NeynarAPIClient

[NeynarAPIClient](../modules/NeynarAPIClient.md).NeynarAPIClient

## Table of contents

### Constructors

- [constructor](NeynarAPIClient.NeynarAPIClient.md#constructor)

### Properties

- [clients](NeynarAPIClient.NeynarAPIClient.md#clients)

## Constructors

### constructor

• **new NeynarAPIClient**(`apiKey`, `«destructured»?`)

Instantiates a NeynarAPIClient

Creates NeynarV1APIClient and NeynarV2APIClients

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiKey` | `string` |
| `«destructured»` | `Object` |
| › `axiosInstance?` | `AxiosInstance` |
| › `logger?` | [`Logger`](../interfaces/logger.Logger.md) |

#### Defined in

packages/farcaster-js-neynar/src/NeynarAPIClient.ts:19

## Properties

### clients

• `Readonly` **clients**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `v1` | [`NeynarV1APIClient`](v1.NeynarV1APIClient.md) |
| `v2` | [`NeynarV2APIClient`](v2.NeynarV2APIClient.md) |

#### Defined in

packages/farcaster-js-neynar/src/NeynarAPIClient.ts:9
