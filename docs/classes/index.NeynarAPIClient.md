[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / NeynarAPIClient

# Class: NeynarAPIClient

[index](../modules/index.md).NeynarAPIClient

## Table of contents

### Constructors

- [constructor](index.NeynarAPIClient.md#constructor)

### Properties

- [clients](index.NeynarAPIClient.md#clients)

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
| › `logger?` | [`Logger`](../interfaces/index.Logger.md) |

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:19](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L19)

## Properties

### clients

• `Readonly` **clients**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `v1` | `NeynarV1APIClient` |
| `v2` | `NeynarV2APIClient` |

#### Defined in

[src/neynarAPI/NeynarAPIClient.ts:9](https://github.com/standard-crypto/farcaster-js/blob/main/src/neynarAPI/NeynarAPIClient.ts#L9)
