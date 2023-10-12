[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / LinksApiListLinksByFidRequest

# Interface: LinksApiListLinksByFidRequest

[openapi](../modules/openapi.md).LinksApiListLinksByFidRequest

Request parameters for listLinksByFid operation in LinksApi.

**`Export`**

LinksApiListLinksByFidRequest

## Table of contents

### Properties

- [fid](openapi.LinksApiListLinksByFidRequest.md#fid)
- [linkType](openapi.LinksApiListLinksByFidRequest.md#linktype)
- [pageSize](openapi.LinksApiListLinksByFidRequest.md#pagesize)
- [pageToken](openapi.LinksApiListLinksByFidRequest.md#pagetoken)
- [reverse](openapi.LinksApiListLinksByFidRequest.md#reverse)

## Properties

### fid

• `Readonly` **fid**: `number`

The FID of the link\&#39;s originator

**`Memberof`**

LinksApiListLinksByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:338](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L338)

___

### linkType

• `Optional` `Readonly` **linkType**: [`Follow`](../enums/openapi.LinkType.md#follow)

The type of link, as a string value

**`Memberof`**

LinksApiListLinksByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:345](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L345)

___

### pageSize

• `Optional` `Readonly` **pageSize**: `number`

Maximum number of messages to return in a single response

**`Memberof`**

LinksApiListLinksByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:352](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L352)

___

### pageToken

• `Optional` `Readonly` **pageToken**: `string`

The page token returned by the previous query, to fetch the next page. If this parameter is empty, fetch the first page

**`Memberof`**

LinksApiListLinksByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:366](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L366)

___

### reverse

• `Optional` `Readonly` **reverse**: `boolean`

Reverse the sort order, returning latest messages first

**`Memberof`**

LinksApiListLinksByFid

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:359](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L359)
