[@standard-crypto/farcaster-js](../README.md) / [Exports](../modules.md) / UserRegistry

# Class: UserRegistry

Registry of usernames and their corresponding owners, as well as the directory URL of each user.

## Table of contents

### Constructors

- [constructor](UserRegistry.md#constructor)

### Properties

- [axiosInstance](UserRegistry.md#axiosinstance)
- [idRegistry](UserRegistry.md#idregistry)
- [nameRegistry](UserRegistry.md#nameregistry)
- [provider](UserRegistry.md#provider)
- [DEFAULT\_WEB2\_HOST](UserRegistry.md#default_web2_host)
- [GOERLI\_ADDRESSES](UserRegistry.md#goerli_addresses)
- [REVEAL\_DELAY](UserRegistry.md#reveal_delay)

### Methods

- [commitToUsername](UserRegistry.md#committousername)
- [getAllUsernames](UserRegistry.md#getallusernames)
- [getAllUsers](UserRegistry.md#getallusers)
- [getFarcasterID](UserRegistry.md#getfarcasterid)
- [lookupByAddress](UserRegistry.md#lookupbyaddress)
- [lookupByUsername](UserRegistry.md#lookupbyusername)
- [registerUsername](UserRegistry.md#registerusername)
- [transferUsernameOwnership](UserRegistry.md#transferusernameownership)
- [usernameToTokenId](UserRegistry.md#usernametotokenid)
- [validateUsername](UserRegistry.md#validateusername)

## Constructors

### constructor

• **new UserRegistry**(`web3Provider`, `__namedParameters?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3Provider` | `Provider` | Provide Infura/Alchemy/etc |
| `__namedParameters` | `Object` | - |
| `__namedParameters.axiosInstance?` | `AxiosInstance` | Override for improved caching, rate-limiting, etcetera |

#### Defined in

[userRegistry.ts:40](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L40)

## Properties

### axiosInstance

• `Private` `Readonly` **axiosInstance**: `AxiosInstance`

#### Defined in

[userRegistry.ts:34](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L34)

___

### idRegistry

• `Readonly` **idRegistry**: `Promise`<`IdRegistry`\>

#### Defined in

[userRegistry.ts:31](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L31)

___

### nameRegistry

• `Readonly` **nameRegistry**: `Promise`<`NameRegistry`\>

#### Defined in

[userRegistry.ts:30](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L30)

___

### provider

• `Readonly` **provider**: `Provider`

#### Defined in

[userRegistry.ts:32](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L32)

___

### DEFAULT\_WEB2\_HOST

▪ `Static` `Readonly` **DEFAULT\_WEB2\_HOST**: ``"api.farcaster.xyz"``

#### Defined in

[userRegistry.ts:21](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L21)

___

### GOERLI\_ADDRESSES

▪ `Static` `Readonly` **GOERLI\_ADDRESSES**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `idRegistry` | `string` |
| `nameRegistry` | `string` |

#### Defined in

[userRegistry.ts:23](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L23)

___

### REVEAL\_DELAY

▪ `Static` `Readonly` **REVEAL\_DELAY**: ``60``

#### Defined in

[userRegistry.ts:28](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L28)

## Methods

### commitToUsername

▸ **commitToUsername**(`username`, `ownerAddress`, `recoveryAddress`, `signer`, `overrides?`): `Promise`<{ `nonce`: `Uint8Array` ; `tx`: `ContractTransaction`  }\>

Publishes an on-chain commitment to a username, as a prerequisite
to ultimately registering that username. Returns an on-chain
transaction and the random nonce used in registering that username.
The same random nonce must be provided when finally registering the
username

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` | The name to register |
| `ownerAddress` | `string` | The address that will own the username |
| `recoveryAddress` | `string` | The address which can recovery the fname if the custody address is lost |
| `signer` | `Signer` | The Signer that will pay the gas |
| `overrides?` | `Overrides` | ethers transaction overrides |

#### Returns

`Promise`<{ `nonce`: `Uint8Array` ; `tx`: `ContractTransaction`  }\>

#### Defined in

[userRegistry.ts:291](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L291)

___

### getAllUsernames

▸ **getAllUsernames**(): `AsyncGenerator`<`string`, `void`, `undefined`\>

Yields all registered usernames, in no particular order

#### Returns

`AsyncGenerator`<`string`, `void`, `undefined`\>

#### Defined in

[userRegistry.ts:248](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L248)

___

### getAllUsers

▸ **getAllUsers**(): `AsyncGenerator`<[`User`](../interfaces/User.md), `void`, `undefined`\>

Yields all registered users, in no particular order

#### Returns

`AsyncGenerator`<[`User`](../interfaces/User.md), `void`, `undefined`\>

#### Defined in

[userRegistry.ts:227](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L227)

___

### getFarcasterID

▸ **getFarcasterID**(`address`): `Promise`<`BigNumber`\>

Fetches the "Farcaster ID" of a user, which is the permanent, immutable ID associated with that
user (compared to usernames, which may be transferred and changed)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`BigNumber`\>

FarcasterID or 0 if user is not registered to one

#### Defined in

[userRegistry.ts:164](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L164)

___

### lookupByAddress

▸ **lookupByAddress**(`address`): `Promise`<`undefined` \| [`User`](../interfaces/User.md)\>

Fetches a full [User](../interfaces/User.md) by address, if any exists. Undefined otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`undefined` \| [`User`](../interfaces/User.md)\>

#### Defined in

[userRegistry.ts:204](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L204)

___

### lookupByUsername

▸ **lookupByUsername**(`username`): `Promise`<`undefined` \| [`User`](../interfaces/User.md)\>

Fetches a full [User](../interfaces/User.md) by username, if any exists. Undefined otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |

#### Returns

`Promise`<`undefined` \| [`User`](../interfaces/User.md)\>

#### Defined in

[userRegistry.ts:174](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L174)

___

### registerUsername

▸ **registerUsername**(`username`, `ownerAddress`, `recoveryAddress`, `nonce`, `signer`, `overrides?`): `Promise`<`ContractTransaction`\>

Registers a username after it was pre-committed via `commitToUsername`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` | The name to register |
| `ownerAddress` | `string` | The address that will own the username |
| `recoveryAddress` | `string` | The address which can recovery the fname if the custody address is lost |
| `nonce` | `Uint8Array` | Random nonce used when committing to the username |
| `signer` | `Signer` | The Signer that will pay both the gas and the registration fee |
| `overrides?` | `Omit`<`Overrides`, ``"value"``\> | ethers transaction overrides |

#### Returns

`Promise`<`ContractTransaction`\>

#### Defined in

[userRegistry.ts:345](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L345)

___

### transferUsernameOwnership

▸ **transferUsernameOwnership**(`username`, `newAddress`, `signer`, `overrides?`): `Promise`<`ContractTransaction`\>

Transfers ownership of a username to a new address. The Signer must be the current owner of the given username.

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |
| `newAddress` | `string` |
| `signer` | `Signer` |
| `overrides?` | `Overrides` |

#### Returns

`Promise`<`ContractTransaction`\>

#### Defined in

[userRegistry.ts:262](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L262)

___

### usernameToTokenId

▸ `Static` **usernameToTokenId**(`username`): `BigNumber`

**`See`**

https://goerli.etherscan.io/address/0xf73bc3fa2f6f774d4b6791414b1092a40cd83831#code#F1#L440

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |

#### Returns

`BigNumber`

UInt256 representation of the given username

#### Defined in

[userRegistry.ts:152](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L152)

___

### validateUsername

▸ `Static` **validateUsername**(`username`): `void`

Verifies that the given username is acceptable by the NameRegistry contract.

**`See`**

https://goerli.etherscan.io/address/0xf73bc3fa2f6f774d4b6791414b1092a40cd83831#code#F1#L1085

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |

#### Returns

`void`

#### Defined in

[userRegistry.ts:89](https://github.com/standard-crypto/farcaster-js/blob/main/src/userRegistry.ts#L89)
