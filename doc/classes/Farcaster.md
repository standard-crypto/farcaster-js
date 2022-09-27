[@standard-crypto/farcaster-js](../README.md) / [Exports](../modules.md) / Farcaster

# Class: Farcaster

High-level functionality for interacting with Farcaster

## Table of contents

### Constructors

- [constructor](Farcaster.md#constructor)

### Properties

- [contentHost](Farcaster.md#contenthost)
- [userRegistry](Farcaster.md#userregistry)

### Methods

- [getAllActivityForUser](Farcaster.md#getallactivityforuser)
- [getLatestActivityForUser](Farcaster.md#getlatestactivityforuser)
- [prepareCast](Farcaster.md#preparecast)
- [isValidMessageSignature](Farcaster.md#isvalidmessagesignature)
- [signCast](Farcaster.md#signcast)

## Constructors

### constructor

• **new Farcaster**()

#### Defined in

[farcaster.ts:28](https://github.com/standard-crypto/farcaster-js/blob/main/src/farcaster.ts#L28)

## Properties

### contentHost

• `Readonly` **contentHost**: [`FarcasterContentHost`](FarcasterContentHost.md)

#### Defined in

[farcaster.ts:26](https://github.com/standard-crypto/farcaster-js/blob/main/src/farcaster.ts#L26)

___

### userRegistry

• `Readonly` **userRegistry**: [`UserRegistry`](UserRegistry.md)

#### Defined in

[farcaster.ts:25](https://github.com/standard-crypto/farcaster-js/blob/main/src/farcaster.ts#L25)

## Methods

### getAllActivityForUser

▸ **getAllActivityForUser**(`username`, `options?`): `AsyncGenerator`<[`Message`](../interfaces/Message.md), `void`, `undefined`\>

Yields all [Messages](../interfaces/Message.md) from the given username, in order from most to least recent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` | Username to query, excluding any leading @ |
| `options?` | `Object` | - |
| `options.includeRecasts?` | `boolean` | True if recasts should be returned, which will be presented as casts from other users |

#### Returns

`AsyncGenerator`<[`Message`](../interfaces/Message.md), `void`, `undefined`\>

#### Defined in

[farcaster.ts:145](https://github.com/standard-crypto/farcaster-js/blob/main/src/farcaster.ts#L145)

___

### getLatestActivityForUser

▸ **getLatestActivityForUser**(`username`): `Promise`<`undefined` \| [`Message`](../interfaces/Message.md)\>

Returns the most recent [Message](../interfaces/Message.md) published by the given username, if any

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` | Username to query, excluding any leading @ |

#### Returns

`Promise`<`undefined` \| [`Message`](../interfaces/Message.md)\>

#### Defined in

[farcaster.ts:130](https://github.com/standard-crypto/farcaster-js/blob/main/src/farcaster.ts#L130)

___

### prepareCast

▸ **prepareCast**(`request`): `Promise`<[`MessageBody`](../interfaces/MessageBody.md)\>

Validates a [CastRequest](../interfaces/CastRequest.md) and marshals it to an unsigned [MessageBody](../interfaces/MessageBody.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`CastRequest`](../interfaces/CastRequest.md) |

#### Returns

`Promise`<[`MessageBody`](../interfaces/MessageBody.md)\>

#### Defined in

[farcaster.ts:36](https://github.com/standard-crypto/farcaster-js/blob/main/src/farcaster.ts#L36)

___

### isValidMessageSignature

▸ `Static` **isValidMessageSignature**(`address`, `message`): `Promise`<`boolean`\>

Validates [signature](../interfaces/Message.md#signature) and [merkleRoot](../interfaces/Message.md#merkleroot)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `message` | [`Message`](../interfaces/Message.md) \| [`SignedCast`](../modules.md#signedcast) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[farcaster.ts:114](https://github.com/standard-crypto/farcaster-js/blob/main/src/farcaster.ts#L114)

___

### signCast

▸ `Static` **signCast**(`cast`, `signer`): `Promise`<[`SignedCast`](../modules.md#signedcast)\>

Signs a cast.

**`See`**

[publishCast](FarcasterContentHost.md#publishcast) for publishing signed casts

#### Parameters

| Name | Type |
| :------ | :------ |
| `cast` | [`MessageBody`](../interfaces/MessageBody.md) |
| `signer` | `Signer` |

#### Returns

`Promise`<[`SignedCast`](../modules.md#signedcast)\>

#### Defined in

[farcaster.ts:92](https://github.com/standard-crypto/farcaster-js/blob/main/src/farcaster.ts#L92)
