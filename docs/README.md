@standard-crypto/farcaster-js / [Modules](modules.md)

# Farcaster.js

![NPM](https://img.shields.io/npm/l/@standard-crypto/farcaster-js?no-cache)
![NPM](https://img.shields.io/npm/v/@standard-crypto/farcaster-js?no-cache)
![GitHub Workflow Status](https://github.com/standard-crypto/farcaster-js/actions/workflows/farcaster-js.yml/badge.svg?branch=main)

A tool for interacting with the Farcaster social network.

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Setup](#setup)
- [Examples](#examples)
  - [Publish a Cast](#publish-a-cast)
  - [Lookup a User](#lookup-a-user)
  - [Fetch User Activity](#fetch-user-activity)
  - [Reply to a Cast](#reply-to-a-cast)
- [Documentation](#documentation)
  - [Merkle API Client](#merkle-api-client)
  - [Hubs](#hubs)
<!-- AUTO-GENERATED-CONTENT:END -->

## Setup

Install the library:

```bash
npm install @standard-crypto/farcaster-js
```

Then grab a copy of the private key or mnemonic registered to your Farcaster user for use in authenticating to the platform. In the app, this can be found within settings -> Recovery Phrase

## Examples

### Publish a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/publishCast.ts) -->
<!-- The below code snippet is automatically added from ./examples/publishCast.ts -->
```ts
import { publishCast } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

const wallet = Wallet.fromMnemonic("twelve words here");

const cast = await publishCast(wallet, "Hello, Farcaster!");

console.log(`New cast hash: ${cast.hash}`);
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Lookup a User

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/lookupUser.ts) -->
<!-- The below code snippet is automatically added from ./examples/lookupUser.ts -->
```ts
import { MerkleAPIClient } from "@standard-crypto/farcaster-js/merkleAPI";
import { Wallet } from "ethers";

const wallet = Wallet.fromMnemonic("twelve words here");
const client = new MerkleAPIClient(wallet);

// by farcaster ID ('fid')
await client.lookupUserByFid(3);

// by username
await client.lookupUserByUsername("dwr");
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Fetch User Activity

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/fetchUserActivity.ts) -->
<!-- The below code snippet is automatically added from ./examples/fetchUserActivity.ts -->
```ts
import { MerkleAPIClient } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

// init
const wallet = Wallet.fromMnemonic("twelve words here");
const apiClient = new MerkleAPIClient(wallet);

// fetch handle to a user
const user = await apiClient.lookupUserByUsername("dwr");
if (user === undefined) throw new Error("no such user");

// fetch user's casts
for await (const cast of apiClient.fetchCastsForUser(user)) {
  console.log(cast.text);
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Reply to a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/replyToCast.ts) -->
<!-- The below code snippet is automatically added from ./examples/replyToCast.ts -->
```ts
import { MerkleAPIClient } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

// init
const wallet = Wallet.fromMnemonic("twelve words here");
const apiClient = new MerkleAPIClient(wallet);

// fetch cast to reply to
const user = await apiClient.lookupUserByUsername("dwr");
if (user === undefined) throw new Error("no such user");
const replyTo = await apiClient.fetchLatestCastForUser(user);
if (replyTo === undefined) throw new Error("no such user");

// post a reply
await apiClient.publishCast("Replying to your cast!", replyTo);
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Documentation

### Merkle API Client

The Merkle API is a collection of publicly exposed API endpoints provided by Merkle Manufactory, Inc
for Farcaster V2. `farcaster-js` provides a set of typescript bindings for those endpoints, as well
as exposing the raw swagger bindings directly if needed.

See [here](/docs/classes/index.MerkleAPIClient.md) for full list of the methods supported.

### Hubs

Support for direct interaction with Farcaster hubs coming soon.
