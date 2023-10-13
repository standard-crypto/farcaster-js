[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / LinksApiGetLinkByIdRequest

# Interface: LinksApiGetLinkByIdRequest

[openapi](../modules/openapi.md).LinksApiGetLinkByIdRequest

Request parameters for getLinkById operation in LinksApi.

**`Export`**

LinksApiGetLinkByIdRequest

## Table of contents

### Properties

- [fid](openapi.LinksApiGetLinkByIdRequest.md#fid)
- [linkType](openapi.LinksApiGetLinkByIdRequest.md#linktype)
- [targetFid](openapi.LinksApiGetLinkByIdRequest.md#targetfid)

## Properties

### fid

• `Readonly` **fid**: `number`

The FID of the link\&#39;s originator

**`Memberof`**

LinksApiGetLinkById

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:310](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L310)

___

### linkType

• `Readonly` **linkType**: [`Follow`](../enums/openapi.LinkType.md#follow)

The type of link, as a string value

**`Memberof`**

LinksApiGetLinkById

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:324](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L324)

___

### targetFid

• `Readonly` **targetFid**: `number`

The FID of the target of the link

**`Memberof`**

LinksApiGetLinkById

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts:317](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/links-api.ts#L317)
