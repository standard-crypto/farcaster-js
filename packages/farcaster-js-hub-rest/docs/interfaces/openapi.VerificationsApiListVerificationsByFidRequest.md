[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / VerificationsApiListVerificationsByFidRequest

# Interface: VerificationsApiListVerificationsByFidRequest

[openapi](../modules/openapi.md).VerificationsApiListVerificationsByFidRequest

Request parameters for listVerificationsByFid operation in VerificationsApi.

**`Export`**

VerificationsApiListVerificationsByFidRequest

## Table of contents

### Properties

- [address](openapi.VerificationsApiListVerificationsByFidRequest.md#address)
- [fid](openapi.VerificationsApiListVerificationsByFidRequest.md#fid)
- [pageSize](openapi.VerificationsApiListVerificationsByFidRequest.md#pagesize)
- [pageToken](openapi.VerificationsApiListVerificationsByFidRequest.md#pagetoken)
- [reverse](openapi.VerificationsApiListVerificationsByFidRequest.md#reverse)

## Properties

### address

• `Optional` `Readonly` **address**: `string`

The optional ETH address to filter by

**`Memberof`**

VerificationsApiListVerificationsByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts:157](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts#L157)

___

### fid

• `Readonly` **fid**: `number`

The FID being requested

**`Memberof`**

VerificationsApiListVerificationsByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts:150](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts#L150)

___

### pageSize

• `Optional` `Readonly` **pageSize**: `number`

Maximum number of messages to return in a single response

**`Memberof`**

VerificationsApiListVerificationsByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts:164](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts#L164)

___

### pageToken

• `Optional` `Readonly` **pageToken**: `string`

The page token returned by the previous query, to fetch the next page. If this parameter is empty, fetch the first page

**`Memberof`**

VerificationsApiListVerificationsByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts:178](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts#L178)

___

### reverse

• `Optional` `Readonly` **reverse**: `boolean`

Reverse the sort order, returning latest messages first

**`Memberof`**

VerificationsApiListVerificationsByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts:171](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/verifications-api.ts#L171)
