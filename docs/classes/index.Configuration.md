[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / Configuration

# Class: Configuration

[index](../modules/index.md).Configuration

## Table of contents

### Constructors

- [constructor](index.Configuration.md#constructor)

### Properties

- [accessToken](index.Configuration.md#accesstoken)
- [apiKey](index.Configuration.md#apikey)
- [baseOptions](index.Configuration.md#baseoptions)
- [basePath](index.Configuration.md#basepath)
- [password](index.Configuration.md#password)
- [username](index.Configuration.md#username)

## Constructors

### constructor

• **new Configuration**(`param?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `param` | [`ConfigurationParameters`](../interfaces/index.ConfigurationParameters.md) |

#### Defined in

[src/merkleAPI/swagger/configuration.ts:82](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L82)

## Properties

### accessToken

• `Optional` **accessToken**: `string` \| `Promise`<`string`\> \| (`name?`: `string`, `scopes?`: `string`[]) => `string` \| (`name?`: `string`, `scopes?`: `string`[]) => `Promise`<`string`\>

parameter for oauth2 security

**`Param`**

security name

**`Param`**

oauth2 scope

**`Memberof`**

Configuration

#### Defined in

[src/merkleAPI/swagger/configuration.ts:62](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L62)

___

### apiKey

• `Optional` **apiKey**: `string` \| `Promise`<`string`\> \| (`name`: `string`) => `string` \| (`name`: `string`) => `Promise`<`string`\>

parameter for apiKey security

**`Param`**

security name

**`Memberof`**

Configuration

#### Defined in

[src/merkleAPI/swagger/configuration.ts:37](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L37)

___

### baseOptions

• `Optional` **baseOptions**: `any`

base options for axios calls

**`Memberof`**

Configuration

#### Defined in

[src/merkleAPI/swagger/configuration.ts:80](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L80)

___

### basePath

• `Optional` **basePath**: `string`

override base path

**`Memberof`**

Configuration

#### Defined in

[src/merkleAPI/swagger/configuration.ts:73](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L73)

___

### password

• `Optional` **password**: `string`

parameter for basic security

**`Memberof`**

Configuration

#### Defined in

[src/merkleAPI/swagger/configuration.ts:55](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L55)

___

### username

• `Optional` **username**: `string`

parameter for basic security

**`Memberof`**

Configuration

#### Defined in

[src/merkleAPI/swagger/configuration.ts:48](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L48)
