@standard-crypto/farcaster-js / [Exports](modules.md)

# Farcaster.js

![NPM](https://img.shields.io/npm/l/@standard-crypto/farcaster-js?no-cache)
![NPM](https://img.shields.io/npm/v/@standard-crypto/farcaster-js?no-cache)
![GitHub Workflow Status](https://github.com/standard-crypto/farcaster-js/actions/workflows/farcaster-js.yml/badge.svg?branch=main)

A tool for interacting with the Farcaster social network. Facilitates reading and writing content, creating accounts and managing the self-hosting of your own content.

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Setup](#setup)
- [Examples](#examples)
  - [Publish a Cast](#publish-a-cast)
  - [Fetch User Activity](#fetch-user-activity)
  - [Reply to a Cast](#reply-to-a-cast)
  - [Lookup a User](#lookup-a-user)
  - [Register a New Username](#register-a-new-username)
<!-- AUTO-GENERATED-CONTENT:END -->

## Setup

```bash
npm install @standard-crypto/farcaster-js
```

## Examples

### Publish a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/publishCast.ts) -->
<!-- The below code snippet is automatically added from ./examples/publishCast.ts -->
```ts
import { publishCast } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

const wallet = Wallet.fromMnemonic("twelve words here");
await publishCast(wallet, "Hello, Farcaster!");
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Fetch User Activity

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/fetchUserActivity.ts) -->
<!-- The below code snippet is automatically added from ./examples/fetchUserActivity.ts -->
```ts
import { Farcaster } from "@standard-crypto/farcaster-js";

const farcaster = new Farcaster();
for await (const activity of farcaster.getAllActivityForUser("dwr", {
  includeRecasts: false,
})) {
  console.log(activity.body.data.text);
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Reply to a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/replyToCast.ts) -->
<!-- The below code snippet is automatically added from ./examples/replyToCast.ts -->
```ts
import { Farcaster, publishCast } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

const farcaster = new Farcaster();
const latestCast = await farcaster.getLatestActivityForUser("dwr");
const wallet = Wallet.fromMnemonic("twelve words here");
await publishCast(wallet, "Replying to your cast!", latestCast);
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Lookup a User

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/lookupUser.ts) -->
<!-- The below code snippet is automatically added from ./examples/lookupUser.ts -->
```ts
import { UserRegistry } from "@standard-crypto/farcaster-js";

const userRegistry = new UserRegistry();

// by username
await userRegistry.lookupByUsername("dwr");

// by address
await userRegistry.lookupByAddress(
  "0xEfCbF0a3C475780A4eD25158E35F528d929C9A23"
);
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Register a New Username

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/registerUsername.ts) -->
<!-- The below code snippet is automatically added from ./examples/registerUsername.ts -->
```ts
import { Wallet } from "@ethersproject/wallet";
import { UserRegistry } from "@standard-crypto/farcaster-js";

const ownerWallet = Wallet.fromMnemonic("twelve words here");
const recoveryWalletAddress = "0x...";
const userRegistry = new UserRegistry();
const usernameToRegister = "new-username";

// Send transaction to pre-commit to this username
const { tx, nonce } = await userRegistry.commitToUsername(
  usernameToRegister,
  ownerWallet.address,
  recoveryWalletAddress,
  ownerWallet
);
await tx.wait;

// Transaction mined. Waiting at least 60s for eligibility to register
await new Promise((resolve) => setTimeout(resolve, 75000));

// Attempt to claim reserved username
await userRegistry.registerUsername(
  usernameToRegister,
  ownerWallet.address,
  recoveryWalletAddress,
  nonce,
  ownerWallet
);
```
<!-- AUTO-GENERATED-CONTENT:END -->
