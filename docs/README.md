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
// TODO
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Fetch User Activity

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/fetchUserActivity.ts) -->
<!-- The below code snippet is automatically added from ./examples/fetchUserActivity.ts -->
```ts
// TODO
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Reply to a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/replyToCast.ts) -->
<!-- The below code snippet is automatically added from ./examples/replyToCast.ts -->
```ts
// TODO
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Lookup a User

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/lookupUser.ts) -->
<!-- The below code snippet is automatically added from ./examples/lookupUser.ts -->
```ts
import { MerkleAPIClient } from "@standard-crypto/farcaster-js/merkleAPI";
import { Wallet } from "ethers";

// TODO: by username
// await userRegistry.lookupByUsername("dwr");

const wallet = Wallet.fromMnemonic("twelve words here");

const client = new MerkleAPIClient(wallet);

// by farcaster ID ('fid')
await client.lookupUserByFid(69);
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Register a New Username

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/registerUsername.ts) -->
<!-- The below code snippet is automatically added from ./examples/registerUsername.ts -->
```ts
// TODO
```
<!-- AUTO-GENERATED-CONTENT:END -->
