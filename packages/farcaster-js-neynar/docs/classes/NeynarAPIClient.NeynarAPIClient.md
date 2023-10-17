[@standard-crypto/farcaster-js-neynar](../README.md) / [Modules](../modules.md) / [NeynarAPIClient](../modules/NeynarAPIClient.md) / NeynarAPIClient

# Class: NeynarAPIClient

[NeynarAPIClient](../modules/NeynarAPIClient.md).NeynarAPIClient

## Table of contents

### Constructors

- [constructor](NeynarAPIClient.NeynarAPIClient.md#constructor)

### Properties

- [v1](NeynarAPIClient.NeynarAPIClient.md#v1)
- [v2](NeynarAPIClient.NeynarAPIClient.md#v2)

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

[packages/farcaster-js-neynar/src/NeynarAPIClient.ts:17](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-neynar/src/NeynarAPIClient.ts#L17)

## Properties

### v1

• `Readonly` **v1**: [`NeynarV1APIClient`](v1.NeynarV1APIClient.md)

#### Defined in

[packages/farcaster-js-neynar/src/NeynarAPIClient.ts:9](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-neynar/src/NeynarAPIClient.ts#L9)

___

### v2

• `Readonly` **v2**: [`NeynarV2APIClient`](v2.NeynarV2APIClient.md)

#### Defined in

[packages/farcaster-js-neynar/src/NeynarAPIClient.ts:10](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-neynar/src/NeynarAPIClient.ts#L10)
