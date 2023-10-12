[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / LinksApiListLinksByTargetFidRequest

# Interface: LinksApiListLinksByTargetFidRequest

[openapi](../modules/openapi.md).LinksApiListLinksByTargetFidRequest

Request parameters for listLinksByTargetFid operation in LinksApi.

**`Export`**

LinksApiListLinksByTargetFidRequest

## Table of contents

### Properties

- [linkType](openapi.LinksApiListLinksByTargetFidRequest.md#linktype)
- [pageSize](openapi.LinksApiListLinksByTargetFidRequest.md#pagesize)
- [pageToken](openapi.LinksApiListLinksByTargetFidRequest.md#pagetoken)
- [reverse](openapi.LinksApiListLinksByTargetFidRequest.md#reverse)
- [targetFid](openapi.LinksApiListLinksByTargetFidRequest.md#targetfid)

## Properties

### linkType

• `Optional` `Readonly` **linkType**: [`Follow`](../enums/openapi.LinkType.md#follow)

The type of link, as a string value

**`Memberof`**

LinksApiListLinksByTargetFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:387](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L387)

___

### pageSize

• `Optional` `Readonly` **pageSize**: `number`

Maximum number of messages to return in a single response

**`Memberof`**

LinksApiListLinksByTargetFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:394](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L394)

___

### pageToken

• `Optional` `Readonly` **pageToken**: `string`

The page token returned by the previous query, to fetch the next page. If this parameter is empty, fetch the first page

**`Memberof`**

LinksApiListLinksByTargetFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:408](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L408)

___

### reverse

• `Optional` `Readonly` **reverse**: `boolean`

Reverse the sort order, returning latest messages first

**`Memberof`**

LinksApiListLinksByTargetFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:401](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L401)

___

### targetFid

• `Readonly` **targetFid**: `number`

The FID of the target of the link

**`Memberof`**

LinksApiListLinksByTargetFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:380](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L380)
