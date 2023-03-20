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
- [formDataCtor](index.Configuration.md#formdatactor)
- [password](index.Configuration.md#password)
- [username](index.Configuration.md#username)

### Methods

- [isJsonMime](index.Configuration.md#isjsonmime)

## Constructors

### constructor

• **new Configuration**(`param?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `param` | [`ConfigurationParameters`](../interfaces/index.ConfigurationParameters.md) |

#### Defined in

[src/merkleAPI/swagger/configuration.ts:92](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L92)

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

[src/merkleAPI/swagger/configuration.ts:64](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L64)

___

### apiKey

• `Optional` **apiKey**: `string` \| `Promise`<`string`\> \| (`name`: `string`) => `string` \| (`name`: `string`) => `Promise`<`string`\>

parameter for apiKey security

**`Param`**

security name

**`Memberof`**

Configuration

#### Defined in

[src/merkleAPI/swagger/configuration.ts:39](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L39)

___

### baseOptions

• `Optional` **baseOptions**: `any`

base options for axios calls

**`Memberof`**

Configuration

#### Defined in

[src/merkleAPI/swagger/configuration.ts:82](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L82)

___

### basePath

• `Optional` **basePath**: `string`

override base path

**`Memberof`**

Configuration

#### Defined in

[src/merkleAPI/swagger/configuration.ts:75](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L75)

___

### formDataCtor

• `Optional` **formDataCtor**: () => `any`

#### Type declaration

• **new formDataCtor**()

The FormData constructor that will be used to create multipart form data
requests. You can inject this here so that execution environments that
do not support the FormData class can still run the generated client.

#### Defined in

[src/merkleAPI/swagger/configuration.ts:90](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L90)

___

### password

• `Optional` **password**: `string`

parameter for basic security

**`Memberof`**

Configuration

#### Defined in

[src/merkleAPI/swagger/configuration.ts:57](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L57)

___

### username

• `Optional` **username**: `string`

parameter for basic security

**`Memberof`**

Configuration

#### Defined in

[src/merkleAPI/swagger/configuration.ts:50](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L50)

## Methods

### isJsonMime

▸ **isJsonMime**(`mime`): `boolean`

Check if the given MIME is a JSON MIME.
JSON MIME examples:
  application/json
  application/json; charset=UTF8
  APPLICATION/JSON
  application/vnd.company+json

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mime` | `string` | MIME (Multipurpose Internet Mail Extensions) |

#### Returns

`boolean`

True if the given MIME is JSON, false otherwise.

#### Defined in

[src/merkleAPI/swagger/configuration.ts:112](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/configuration.ts#L112)
