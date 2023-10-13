[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / farcasterEpochTimestamp

# Module: farcasterEpochTimestamp

Utilities for interacting with serialized timestamps in the
Farcaster protocol. See [Farcaster docs](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#timestamps)
for more information.

## Table of contents

### Variables

- [START](farcasterEpochTimestamp.md#start)

### Functions

- [parse](farcasterEpochTimestamp.md#parse)
- [serialize](farcasterEpochTimestamp.md#serialize)

## Variables

### START

• `Const` **START**: `Date`

#### Defined in

[packages/farcaster-js-hub-rest/src/farcasterEpochTimestamp.ts:8](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/farcasterEpochTimestamp.ts#L8)

## Functions

### parse

▸ **parse**(`timestamp`): `Date`

Parses a Farcaster timestamp

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `number` | seconds since Jan 1, 2021 00:00:00UTC |

#### Returns

`Date`

#### Defined in

[packages/farcaster-js-hub-rest/src/farcasterEpochTimestamp.ts:15](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/farcasterEpochTimestamp.ts#L15)

___

### serialize

▸ **serialize**(`d`): `number`

Serialized a timestamp to seconds since the Farcaster epoch

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `d` | `Date` | timestamp as a Date instance |

#### Returns

`number`

#### Defined in

[packages/farcaster-js-hub-rest/src/farcasterEpochTimestamp.ts:24](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/farcasterEpochTimestamp.ts#L24)
