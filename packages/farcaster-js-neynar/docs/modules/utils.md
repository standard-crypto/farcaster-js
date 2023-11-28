[@standard-crypto/farcaster-js-neynar](../README.md) / [Modules](../modules.md) / utils

# Module: utils

## Table of contents

### Functions

- [generateSignature](utils.md#generatesignature)
- [mnemonicToAddress](utils.md#mnemonictoaddress)
- [waitForNeynarSignerApproval](utils.md#waitforneynarsignerapproval)

## Functions

### generateSignature

▸ **generateSignature**(`publicKey`, `appFid`, `accountMnemonic`, `deadline`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `string` |
| `appFid` | `number` |
| `accountMnemonic` | `string` |
| `deadline` | `number` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/farcaster-js-neynar/src/utils.ts:7](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-neynar/src/utils.ts#L7)

___

### mnemonicToAddress

▸ **mnemonicToAddress**(`mnemonic`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |

#### Returns

`string`

#### Defined in

[packages/farcaster-js-neynar/src/utils.ts:48](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-neynar/src/utils.ts#L48)

___

### waitForNeynarSignerApproval

▸ **waitForNeynarSignerApproval**(`client`, `signerUuid`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`NeynarAPIClient`](../classes/NeynarAPIClient.NeynarAPIClient.md) |
| `signerUuid` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/farcaster-js-neynar/src/utils.ts:53](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-neynar/src/utils.ts#L53)
