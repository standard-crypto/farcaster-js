[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / index

# Module: index

## Table of contents

### Classes

- [MerkleAPIClient](../classes/index.MerkleAPIClient.md)

### Interfaces

- [Logger](../interfaces/index.Logger.md)

### Type Aliases

- [WithRequired](index.md#withrequired)

### Variables

- [silentLogger](index.md#silentlogger)

### Functions

- [publishCast](index.md#publishcast)

## Type Aliases

### WithRequired

Ƭ **WithRequired**<`T`, `K`\>: `T` & { [P in K]-?: T[P] }

Typescript utility type to convert specific properties of a given type from optional to required

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |

#### Defined in

[src/utils.ts:4](https://github.com/standard-crypto/farcaster-js/blob/main/src/utils.ts#L4)

## Variables

### silentLogger

• `Const` **silentLogger**: [`Logger`](../interfaces/index.Logger.md)

#### Defined in

[src/merkleAPI/logger.ts:13](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/logger.ts#L13)

## Functions

### publishCast

▸ **publishCast**(`wallet`, `text`, `replyTo?`): `Promise`<[`Cast`](../interfaces/merkleAPI_swagger.Cast.md)\>

Publishes a cast with a simple text body.

The cast will be attributed to the username currently registered
to the given wallet's address.

This function provided as a shorthand to skip initialization of a MerkleAPIClient instance.

Note that by doing so, this function circumvents any efficient reuse of auth tokens and any
caching or rate limit behaviors that may be implemented by MerkleAPIClient.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `wallet` | `Wallet` | A Wallet derived from a private key or mnemonic phrase |
| `text` | `string` | The text to be cast |
| `replyTo?` | [`Cast`](../interfaces/merkleAPI_swagger.Cast.md) \| { `fid`: `number` ; `hash`: `string`  } | A complete Cast (or its hash and author fid) that this cast will reply to. Omit if not replying. |

#### Returns

`Promise`<[`Cast`](../interfaces/merkleAPI_swagger.Cast.md)\>

#### Defined in

[src/index.ts:20](https://github.com/standard-crypto/farcaster-js/blob/main/src/index.ts#L20)
