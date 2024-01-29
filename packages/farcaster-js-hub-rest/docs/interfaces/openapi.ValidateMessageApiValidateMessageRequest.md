[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / ValidateMessageApiValidateMessageRequest

# Interface: ValidateMessageApiValidateMessageRequest

[openapi](../modules/openapi.md).ValidateMessageApiValidateMessageRequest

Request parameters for validateMessage operation in ValidateMessageApi.

**`Export`**

ValidateMessageApiValidateMessageRequest

## Table of contents

### Properties

- [body](openapi.ValidateMessageApiValidateMessageRequest.md#body)

## Properties

### body

• `Readonly` **body**: `Buffer`

*  A Message is a delta operation on the Farcaster network. The message protobuf is an envelope  that wraps a MessageData object and contains a hash and signature which can verify its authenticity.

**`Memberof`**

ValidateMessageApiValidateMessage

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/validate-message-api.ts:129](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/validate-message-api.ts#L129)
