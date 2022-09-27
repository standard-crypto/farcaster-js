[@standard-crypto/farcaster-js](../README.md) / [Exports](../modules.md) / FarcasterContentHost

# Class: FarcasterContentHost

The default Web2 endpoint where all users casts and metadata are recorded.
To publish new activity, the host enforces JWT auth signed by the user's
Ethereum private key.

## Table of contents

### Constructors

- [constructor](FarcasterContentHost.md#constructor)

### Properties

- [axiosInstance](FarcasterContentHost.md#axiosinstance)
- [jwtSigner](FarcasterContentHost.md#jwtsigner)
- [HOST](FarcasterContentHost.md#host)

### Methods

- [\_authHeader](FarcasterContentHost.md#_authheader)
- [getAllActivityForUser](FarcasterContentHost.md#getallactivityforuser)
- [getLatestActivityForUser](FarcasterContentHost.md#getlatestactivityforuser)
- [publishCast](FarcasterContentHost.md#publishcast)

## Constructors

### constructor

• **new FarcasterContentHost**(`axiosInstance?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `axiosInstance?` | `AxiosInstance` | Override for custom caching, rate limiting, etcetera |

#### Defined in

[contentHost/farcasterHost.ts:23](https://github.com/standard-crypto/farcaster-js/blob/main/src/contentHost/farcasterHost.ts#L23)

## Properties

### axiosInstance

• `Private` `Readonly` **axiosInstance**: `AxiosInstance`

#### Defined in

[contentHost/farcasterHost.ts:16](https://github.com/standard-crypto/farcaster-js/blob/main/src/contentHost/farcasterHost.ts#L16)

___

### jwtSigner

• `Optional` `Readonly` **jwtSigner**: `Signer`

#### Defined in

[contentHost/farcasterHost.ts:14](https://github.com/standard-crypto/farcaster-js/blob/main/src/contentHost/farcasterHost.ts#L14)

___

### HOST

▪ `Static` `Readonly` **HOST**: ``"api.farcaster.xyz"``

#### Defined in

[contentHost/farcasterHost.ts:18](https://github.com/standard-crypto/farcaster-js/blob/main/src/contentHost/farcasterHost.ts#L18)

## Methods

### \_authHeader

▸ `Private` **_authHeader**(`wallet`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `wallet` | `Wallet` |

#### Returns

`Promise`<`string`\>

#### Defined in

[contentHost/farcasterHost.ts:90](https://github.com/standard-crypto/farcaster-js/blob/main/src/contentHost/farcasterHost.ts#L90)

___

### getAllActivityForUser

▸ **getAllActivityForUser**(`userOrAddress`, `__namedParameters?`): `AsyncGenerator`<[`Message`](../interfaces/Message.md), `void`, `undefined`\>

Yields all [Messages](../interfaces/Message.md) from the given username, in order from most to least recent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userOrAddress` | `string` \| [`User`](../interfaces/User.md) |  |
| `__namedParameters` | `Object` | - |
| `__namedParameters.includeRecasts?` | `boolean` | True if recasts should be returned, which will be presented as casts from other users |

#### Returns

`AsyncGenerator`<[`Message`](../interfaces/Message.md), `void`, `undefined`\>

#### Defined in

[contentHost/farcasterHost.ts:56](https://github.com/standard-crypto/farcaster-js/blob/main/src/contentHost/farcasterHost.ts#L56)

___

### getLatestActivityForUser

▸ **getLatestActivityForUser**(`userOrAddress`): `Promise`<`undefined` \| [`Message`](../interfaces/Message.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userOrAddress` | `string` \| [`User`](../interfaces/User.md) | A full [User](../interfaces/User.md) object or an address hex string |

#### Returns

`Promise`<`undefined` \| [`Message`](../interfaces/Message.md)\>

The most recent [Message](../interfaces/Message.md) posted by this user, if any

#### Defined in

[contentHost/farcasterHost.ts:37](https://github.com/standard-crypto/farcaster-js/blob/main/src/contentHost/farcasterHost.ts#L37)

___

### publishCast

▸ **publishCast**(`cast`, `wallet`): `Promise`<`void`\>

**`See`**

[signCast](Farcaster.md#signcast) for building this parameter

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cast` | [`SignedCast`](../modules.md#signedcast) | A signed cast. |
| `wallet` | `Wallet` | The same wallet used to sign the cast |

#### Returns

`Promise`<`void`\>

#### Defined in

[contentHost/farcasterHost.ts:82](https://github.com/standard-crypto/farcaster-js/blob/main/src/contentHost/farcasterHost.ts#L82)
