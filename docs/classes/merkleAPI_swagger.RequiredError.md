[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [merkleAPI/swagger](../modules/merkleAPI_swagger.md) / RequiredError

# Class: RequiredError

[merkleAPI/swagger](../modules/merkleAPI_swagger.md).RequiredError

**`Export`**

## Hierarchy

- `Error`

  ↳ **`RequiredError`**

## Table of contents

### Constructors

- [constructor](merkleAPI_swagger.RequiredError.md#constructor)

### Properties

- [field](merkleAPI_swagger.RequiredError.md#field)
- [message](merkleAPI_swagger.RequiredError.md#message)
- [name](merkleAPI_swagger.RequiredError.md#name)
- [stack](merkleAPI_swagger.RequiredError.md#stack)
- [prepareStackTrace](merkleAPI_swagger.RequiredError.md#preparestacktrace)
- [stackTraceLimit](merkleAPI_swagger.RequiredError.md#stacktracelimit)

### Methods

- [captureStackTrace](merkleAPI_swagger.RequiredError.md#capturestacktrace)

## Constructors

### constructor

• **new RequiredError**(`field`, `msg?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `string` |
| `msg?` | `string` |

#### Overrides

Error.constructor

#### Defined in

[src/merkleAPI/swagger/base.ts:70](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L70)

## Properties

### field

• **field**: `string`

#### Defined in

[src/merkleAPI/swagger/base.ts:70](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L70)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1054

___

### name

• **name**: ``"RequiredError"``

#### Overrides

Error.name

#### Defined in

[src/merkleAPI/swagger/base.ts:69](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/base.ts#L69)

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1055

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
