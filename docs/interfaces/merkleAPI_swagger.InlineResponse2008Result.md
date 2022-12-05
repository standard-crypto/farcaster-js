[@standard-crypto/farcaster-js](../README.md) / [Modules](../modules.md) / [merkleAPI/swagger](../modules/merkleAPI_swagger.md) / InlineResponse2008Result

# Interface: InlineResponse2008Result

[merkleAPI/swagger](../modules/merkleAPI_swagger.md).InlineResponse2008Result

**`Export`**

**`Interface`**

InlineResponse2008Result

## Table of contents

### Properties

- [like](merkleAPI_swagger.InlineResponse2008Result.md#like)
- [reaction](merkleAPI_swagger.InlineResponse2008Result.md#reaction)

## Properties

### like

• **like**: [`CastReaction`](merkleAPI_swagger.CastReaction.md)

#### Defined in

[src/merkleAPI/swagger/models/inline-response2008-result.ts:27](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/models/inline-response2008-result.ts#L27)

___

### reaction

• **reaction**: [`CastReaction`](merkleAPI_swagger.CastReaction.md)

Note that the server's response will be written to the key `like` and not
`reaction`. MerkleAPIClient will attempt to copy the value of `like`
into `reaction` for backward compatibility.

#### Defined in

[src/merkleAPI/swagger/models/inline-response2008-result.ts:26](https://github.com/standard-crypto/farcaster-js/blob/main/src/merkleAPI/swagger/models/inline-response2008-result.ts#L26)
