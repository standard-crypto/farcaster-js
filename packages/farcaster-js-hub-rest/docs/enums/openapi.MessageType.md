[@standard-crypto/farcaster-js-hub-rest](../README.md) / [Modules](../modules.md) / [openapi](../modules/openapi.md) / MessageType

# Enumeration: MessageType

[openapi](../modules/openapi.md).MessageType

Type of the MessageBody. - MESSAGE_TYPE_CAST_ADD: Add a new Cast  - MESSAGE_TYPE_CAST_REMOVE: Remove an existing Cast  - MESSAGE_TYPE_REACTION_ADD: Add a Reaction to a Cast  - MESSAGE_TYPE_REACTION_REMOVE: Remove a Reaction from a Cast  - MESSAGE_TYPE_LINK_ADD: Add a new Link  - MESSAGE_TYPE_LINK_REMOVE: Remove an existing Link  - MESSAGE_TYPE_VERIFICATION_ADD_ETH_ADDRESS: Add a Verification of an Ethereum Address  - MESSAGE_TYPE_VERIFICATION_REMOVE: Remove a Verification  - MESSAGE_TYPE_USER_DATA_ADD: Deprecated  MESSAGE_TYPE_SIGNER_ADD = 9; // Add a new Ed25519 key pair that signs messages for a user  MESSAGE_TYPE_SIGNER_REMOVE = 10; // Remove an Ed25519 key pair that signs messages for a user  Add metadata about a user  - MESSAGE_TYPE_USERNAME_PROOF: Add or replace a username proof

**`Export`**

## Table of contents

### Enumeration Members

- [CastAdd](openapi.MessageType.md#castadd)
- [CastRemove](openapi.MessageType.md#castremove)
- [LinkAdd](openapi.MessageType.md#linkadd)
- [LinkRemove](openapi.MessageType.md#linkremove)
- [ReactionAdd](openapi.MessageType.md#reactionadd)
- [ReactionRemove](openapi.MessageType.md#reactionremove)
- [UserDataAdd](openapi.MessageType.md#userdataadd)
- [UsernameProof](openapi.MessageType.md#usernameproof)
- [VerificationAddEthAddress](openapi.MessageType.md#verificationaddethaddress)
- [VerificationRemove](openapi.MessageType.md#verificationremove)

## Enumeration Members

### CastAdd

• **CastAdd** = ``"MESSAGE_TYPE_CAST_ADD"``

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts:24](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts#L24)

___

### CastRemove

• **CastRemove** = ``"MESSAGE_TYPE_CAST_REMOVE"``

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts:25](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts#L25)

___

### LinkAdd

• **LinkAdd** = ``"MESSAGE_TYPE_LINK_ADD"``

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts:28](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts#L28)

___

### LinkRemove

• **LinkRemove** = ``"MESSAGE_TYPE_LINK_REMOVE"``

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts:29](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts#L29)

___

### ReactionAdd

• **ReactionAdd** = ``"MESSAGE_TYPE_REACTION_ADD"``

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts:26](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts#L26)

___

### ReactionRemove

• **ReactionRemove** = ``"MESSAGE_TYPE_REACTION_REMOVE"``

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts:27](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts#L27)

___

### UserDataAdd

• **UserDataAdd** = ``"MESSAGE_TYPE_USER_DATA_ADD"``

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts:32](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts#L32)

___

### UsernameProof

• **UsernameProof** = ``"MESSAGE_TYPE_USERNAME_PROOF"``

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts:33](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts#L33)

___

### VerificationAddEthAddress

• **VerificationAddEthAddress** = ``"MESSAGE_TYPE_VERIFICATION_ADD_ETH_ADDRESS"``

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts:30](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts#L30)

___

### VerificationRemove

• **VerificationRemove** = ``"MESSAGE_TYPE_VERIFICATION_REMOVE"``

#### Defined in

[packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts:31](https://github.com/standard-crypto/farcaster-js/blob/main/packages/farcaster-js-hub-rest/src/openapi/generated/models/message-type.ts#L31)
