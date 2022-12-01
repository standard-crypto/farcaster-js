[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [merkleAPI/swagger](../modules/merkleAPI_swagger.md) / Configuration

# Class: Configuration

[merkleAPI/swagger](../modules/merkleAPI_swagger.md).Configuration

## Table of contents

### Constructors

- [constructor](merkleAPI_swagger.Configuration.md#constructor)

### Properties

- [accessToken](merkleAPI_swagger.Configuration.md#accesstoken)
- [apiKey](merkleAPI_swagger.Configuration.md#apikey)
- [baseOptions](merkleAPI_swagger.Configuration.md#baseoptions)
- [basePath](merkleAPI_swagger.Configuration.md#basepath)
- [password](merkleAPI_swagger.Configuration.md#password)
- [username](merkleAPI_swagger.Configuration.md#username)

## Constructors

### constructor

• **new Configuration**(`param?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `param` | [`ConfigurationParameters`](../interfaces/merkleAPI_swagger.ConfigurationParameters.md) |

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
