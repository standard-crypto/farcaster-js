# Farcaster.js

A tool for interacting with the Farcaster social network.

![NPM](https://img.shields.io/npm/l/@standard-crypto/farcaster-js?no-cache)
![NPM](https://img.shields.io/npm/v/@standard-crypto/farcaster-js?no-cache)
![GitHub Workflow Status](https://github.com/standard-crypto/farcaster-js/actions/workflows/farcaster-js.yml/badge.svg?branch=main)

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Setup](#setup)
- [Examples](#examples)
  - [Neynar API](#neynar-api)
    - [Publish a Cast](#publish-a-cast)
    - [Lookup a User](#lookup-a-user)
    - [Fetch User Activity](#fetch-user-activity)
    - [Reply to a Cast](#reply-to-a-cast)
    - [Follow a User](#follow-a-user)
    - [Parse an API Error Response](#parse-an-api-error-response)
    - [Create and Register a Signer](#create-and-register-a-signer)
    - [Fetch a Signer](#fetch-a-signer)
  - [Merkle API](#merkle-api)
    - [Publish a Cast](#publish-a-cast-1)
    - [Lookup a User](#lookup-a-user-1)
    - [Fetch User Activity](#fetch-user-activity-1)
    - [Reply to a Cast](#reply-to-a-cast-1)
    - [Follow a User](#follow-a-user-1)
    - [Parse an API Error Response](#parse-an-api-error-response-1)
    - [Use a User-Supplied Auth Token](#use-a-user-supplied-auth-token)
- [Documentation](#documentation)
  - [Warpcast API Client](#warpcast-api-client)
  - [Hubs](#hubs)
  - [User Registry](#user-registry)
<!-- AUTO-GENERATED-CONTENT:END -->

## Setup

Install the library:

```bash
npm install @standard-crypto/farcaster-js
```

Then grab a copy of the private key or mnemonic registered to your Farcaster user for use in authenticating to the platform. In the app, this can be found within settings -> Recovery Phrase

## Examples

### Neynar API

#### Publish a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/neynar/publishCast.ts) -->
<!-- The below code snippet is automatically added from ./examples/neynar/publishCast.ts -->
```ts
import { NeynarAPIClient } from "@standard-crypto/farcaster-js";

// init
const apiKey = "NeynarAPIKey";
const signerUuid = "signerUUID";
const apiClient = new NeynarAPIClient(apiKey);

const cast = await apiClient.publishCast(signerUuid, "Hellow, Farcaster!");

console.log(`New cast hash: ${cast.hash}`);
```
<!-- AUTO-GENERATED-CONTENT:END -->

#### Lookup a User

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/neynar/lookupUser.ts) -->
<!-- The below code snippet is automatically added from ./examples/neynar/lookupUser.ts -->
```ts
import { NeynarAPIClient } from "@standard-crypto/farcaster-js";

const apiKey = "NeynarAPIKey";
const client = new NeynarAPIClient(apiKey);

// by farcaster ID ('fid')
await client.lookupUserByFid(3);

// by username
await client.lookupUserByUsername("dwr");
```
<!-- AUTO-GENERATED-CONTENT:END -->

#### Fetch User Activity

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/neynar/fetchUserActivity.ts) -->
<!-- The below code snippet is automatically added from ./examples/neynar/fetchUserActivity.ts -->
```ts
import { NeynarAPIClient } from "@standard-crypto/farcaster-js";

// init
const apiKey = "NeynarAPIKey";
const apiClient = new NeynarAPIClient(apiKey);

// fetch handle to a user
const user = await apiClient.lookupUserByUsername("dwr");
if (user === undefined) throw new Error("no such user");

// fetch user's casts
for await (const cast of apiClient.fetchCastsForUser(user)) {
  console.log(cast.text);
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

#### Reply to a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/neynar/replyToCast.ts) -->
<!-- The below code snippet is automatically added from ./examples/neynar/replyToCast.ts -->
```ts
import { NeynarAPIClient } from "@standard-crypto/farcaster-js";

// init
const apiKey = "NeynarAPIKey";
const signerUuid = "signerUUID";
const apiClient = new NeynarAPIClient(apiKey);

// fetch cast to reply to
const user = await apiClient.lookupUserByUsername("dwr");
if (user === undefined) throw new Error("no such user");
const replyTo = await apiClient.fetchLatestCastForUser(user);
if (replyTo === undefined) throw new Error("no such user");

// post a reply
await apiClient.publishCast(signerUuid, "Replying to your cast!", replyTo);
```
<!-- AUTO-GENERATED-CONTENT:END -->

#### Follow a User

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/neynar/followUser.ts) -->
<!-- The below code snippet is automatically added from ./examples/neynar/followUser.ts -->
```ts
import { NeynarAPIClient } from "@standard-crypto/farcaster-js";

// init
const apiKey = "NeynarAPIKey";
const signerUuid = "signerUUID";
const apiClient = new NeynarAPIClient(apiKey);
const user = await apiClient.lookupUserByUsername("dwr");
if (user === undefined) throw new Error("no such user");

// follow an existing user
await apiClient.followUser(signerUuid, user);
```
<!-- AUTO-GENERATED-CONTENT:END -->

#### Parse an API Error Response

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/neynar/errorParsing.ts) -->
<!-- The below code snippet is automatically added from ./examples/neynar/errorParsing.ts -->
```ts
import { NeynarAPIClient } from "@standard-crypto/farcaster-js";

// init
const apiKey = "NeynarAPIKey";
const signerUuid = "signerUUID";
const apiClient = new NeynarAPIClient(apiKey);

// parse an error response from the API server
try {
  await apiClient.deleteCast(signerUuid, "SomeInvalidCastHash");
} catch (error) {
  if (NeynarAPIClient.isApiErrorResponse(error)) {
    const apiError = error.response.data;
    console.log(`API Error: ${apiError.message}`);
    console.log(`Status code: ${error.response.status}`);
  }
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

#### Create and Register a Signer

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/neynar/createSigner.ts) -->
<!-- The below code snippet is automatically added from ./examples/neynar/createSigner.ts -->
```ts
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  NeynarAPIClient,
  generateSignature,
} from "@standard-crypto/farcaster-js";

// init
const apiKey = "NeynarAPIKey";
const apiClient = new NeynarAPIClient(apiKey);

// signer params
const publicKey = "publicKeyForSignerAccount";
const fid = 123;
const privateKey = "accountMnemonic";

const deadline = Math.floor(Date.now() / 1000) + 86400;
const signer = await apiClient.createSigner();
const signature = await generateSignature(publicKey, fid, privateKey, deadline);
const registeredSigner = await apiClient.registerSigner(
  signer.signer_uuid,
  fid,
  deadline,
  signature
);
console.log(
  `Approve Signer iOS deeplink: ${registeredSigner.signer_approval_url}`
);
console.log(
  "Update url to format https://client.warpcast.com/deeplinks/signed-key-request?token=0x1234 on android"
);
console.log(`Signer Status: ${registeredSigner.status}`);
```
<!-- AUTO-GENERATED-CONTENT:END -->

#### Fetch a Signer

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/neynar/fetchSigner.ts) -->
<!-- The below code snippet is automatically added from ./examples/neynar/fetchSigner.ts -->
```ts
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NeynarAPIClient } from "@standard-crypto/farcaster-js";

// init
const apiKey = "NeynarAPIKey";
const signerUuid = "signerUUID";
const apiClient = new NeynarAPIClient(apiKey);

const signer = await apiClient.fetchSigner(signerUuid);
console.log(`Signer: ${signer}`);
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Merkle API

#### Publish a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/merkle/publishCast.ts) -->
<!-- The below code snippet is automatically added from ./examples/merkle/publishCast.ts -->
```ts
import { publishCast } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

const wallet = Wallet.fromMnemonic("twelve words here");

const cast = await publishCast(wallet, "Hello, Farcaster!");

console.log(`New cast hash: ${cast.hash}`);
```
<!-- AUTO-GENERATED-CONTENT:END -->

#### Lookup a User

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/merkle/lookupUser.ts) -->
<!-- The below code snippet is automatically added from ./examples/merkle/lookupUser.ts -->
```ts
import { MerkleAPIClient } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

const wallet = Wallet.fromMnemonic("twelve words here");
const client = new MerkleAPIClient(wallet);

// by farcaster ID ('fid')
await client.lookupUserByFid(3);

// by username
await client.lookupUserByUsername("dwr");
```
<!-- AUTO-GENERATED-CONTENT:END -->

#### Fetch User Activity

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/merkle/fetchUserActivity.ts) -->
<!-- The below code snippet is automatically added from ./examples/merkle/fetchUserActivity.ts -->
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

#### Reply to a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/merkle/replyToCast.ts) -->
<!-- The below code snippet is automatically added from ./examples/merkle/replyToCast.ts -->
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

#### Follow a User

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/merkle/followUser.ts) -->
<!-- The below code snippet is automatically added from ./examples/merkle/followUser.ts -->
```ts
import { MerkleAPIClient } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

// init
const wallet = Wallet.fromMnemonic("twelve words here");
const apiClient = new MerkleAPIClient(wallet);
const user = await apiClient.lookupUserByUsername("dwr");
if (user === undefined) throw new Error("no such user");

// follow an existing user
await apiClient.followUser(user);
```
<!-- AUTO-GENERATED-CONTENT:END -->

#### Parse an API Error Response

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/merkle/errorParsing.ts) -->
<!-- The below code snippet is automatically added from ./examples/merkle/errorParsing.ts -->
```ts
import { MerkleAPIClient } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

// init
const wallet = Wallet.fromMnemonic("twelve words here");
const apiClient = new MerkleAPIClient(wallet);

// parse an error response from the API server
try {
  await apiClient.deleteCast("SomeInvalidCastHash");
} catch (error) {
  if (MerkleAPIClient.isApiErrorResponse(error)) {
    const apiErrors = error.response.data.errors;
    for (const apiError of apiErrors) {
      console.log(`API Error: ${apiError.message}`);
    }

    console.log(`Status code: ${error.response.status}`);
  }
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

#### Use a User-Supplied Auth Token

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/merkle/userSuppliedAuthTokens.ts) -->
<!-- The below code snippet is automatically added from ./examples/merkle/userSuppliedAuthTokens.ts -->
```ts
import { MerkleAPIClient } from "@standard-crypto/farcaster-js";

// use an auth token provided directly by a user
const apiClient = new MerkleAPIClient({
  secret: "MK-abc123...",
  expiresAt: 12345678900000, // optional
});

// lookup that user
const user = await apiClient.fetchCurrentUser();
console.log(user.displayName);
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Documentation

### Warpcast API Client

The Warpcast API is a collection of publicly exposed API endpoints provided by Merkle Manufactory, Inc
for Farcaster V2. `farcaster-js` provides a set of typescript bindings for those endpoints, as well
as exposing the raw swagger bindings directly if needed.

See [here](/docs/classes/index.MerkleAPIClient.md) for full list of the methods supported.

Wrappers for the Warpcast API are based on a OpenAPI spec kept in the `src` directory that is no longer
kept up-to-date by the Warpcast team. Many manual edits have been added to the output of the openapi-generator.
To add wrappers for new API endpoints, the `yarn:generate` script can be used as a starting point.

### Hubs

Support for direct interaction with Farcaster hubs coming soon.

### User Registry

Support for direct interaction with the on-chain user registry coming soon.
