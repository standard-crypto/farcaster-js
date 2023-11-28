[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / SubmitMessageApiSubmitMessageRequest

# Interface: SubmitMessageApiSubmitMessageRequest

[openapi](../modules/openapi.md).SubmitMessageApiSubmitMessageRequest

Request parameters for submitMessage operation in SubmitMessageApi.

**`Export`**

SubmitMessageApiSubmitMessageRequest

## Table of contents

### Properties

- [body](openapi.SubmitMessageApiSubmitMessageRequest.md#body)

## Properties

### body

• `Readonly` **body**: `Buffer`

*  A Message is a delta operation on the Farcaster network. The message protobuf is an envelope  that wraps a MessageData object and contains a hash and signature which can verify its authenticity.

**`Memberof`**

SubmitMessageApiSubmitMessage

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/apis/submit-message-api.ts:129](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/apis/submit-message-api.ts#L129)
