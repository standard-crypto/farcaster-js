# Farcaster.js

A collection of tools for interacting with the Farcaster social network.

![NPM](https://img.shields.io/npm/l/@standard-crypto/farcaster-js?no-cache)
![NPM](https://img.shields.io/npm/v/@standard-crypto/farcaster-js?no-cache)
![GitHub Workflow Status](https://github.com/standard-crypto/farcaster-js/actions/workflows/farcaster-js.yml/badge.svg?branch=main)

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Farcaster Hub REST API](#farcaster-hub-rest-api)
- [Neynar REST APIs](#neynar-rest-apis)
<!-- AUTO-GENERATED-CONTENT:END -->

## Farcaster Hub REST API

Farcaster hubs expose a public REST API which can be used for simple queries.

***Setup:***

```sh
# Install all farcaster-js tools
npm install axios @standard-crypto/farcaster-js

# ...or install only the Hub REST API client
npm install axios @standard-crypto/farcaster-js-hub-rest
```

***Example:***

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/hubRest.ts) -->
<!-- The below code snippet is automatically added from ./examples/hubRest.ts -->
```ts
import { HubRestAPIClient } from '@standard-crypto/farcaster-js';

const client = new HubRestAPIClient();
console.log(await client.getHubInfo());
```
<!-- AUTO-GENERATED-CONTENT:END -->

See the [@standard-crypto/farcaster-js-hub-rest](./packages/farcaster-js-hub-rest/README.md)
package for more info.

## Neynar REST APIs

***Setup:***

```sh
# Install all farcaster-js tools
npm install axios @standard-crypto/farcaster-js

# ...or install only the Neynar API client
npm install axios @standard-crypto/farcaster-js-neynar
```

***Example:***

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/neynarSigner.ts) -->
<!-- The below code snippet is automatically added from ./examples/neynarSigner.ts -->
```ts
import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

const client = new NeynarAPIClient('apiKey');

const signerFid = 111; // fid of signer
const privateKey = 'your farcaster recovery phrase';
const deadline = Math.floor(Date.now() / 1000) + 86400; // one day from now - set longer if needed

// create signer
const registeredSigner = await client.v2.createAndRegisterSigner(
  signerFid,
  deadline,
  privateKey,
);

console.log('Open url the url below on a logged in ios device to approve signer');
console.log(`ios url: ${registeredSigner.signer_approval_url}`);
const registerSignerToken =
    registeredSigner.signer_approval_url?.split('=')[1];
console.log('If using an android device, use this url');
console.log(`android url: https://client.warpcast.com/deeplinks/signed-key-request?token=${registerSignerToken}`);
```
<!-- AUTO-GENERATED-CONTENT:END -->


<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/neynar.ts) -->
<!-- The below code snippet is automatically added from ./examples/neynar.ts -->
```ts
import { NeynarAPIClient, NeynarV2 } from '@standard-crypto/farcaster-js';

const signerUuid = 'approvedSignerUUID';
const client = new NeynarAPIClient('apiKey');

// Publish cast
const cast = await client.v2.publishCast(signerUuid, 'This is a test cast.');

// React to cast
await client.v2.reactToCast(signerUuid, NeynarV2.ReactionType.Like, cast.hash);
```
<!-- AUTO-GENERATED-CONTENT:END -->

***Usage Versus Hub APIs:***

The REST APIs exposed by a Farcaster hub are designed to provide protocol entities optimized for the transport and indexing layer. Neynar APIs are designed for building at the application-layer.

Neynar v1 APIs are designed to replicate the deprecated Warpcast APIs to ensure that the ecosystem of products built on those APIs can continue thriving with minimal switching costs. The Neynar v1 APIs should act serve a drop-in replacement for applications using `farcaster-js` pre-version 6.0.

Neynar v2 APIs bring in additional support for new Farcaster protocol primitives like channels and signer management with much more support for storage, sign in with farcaster and new features delivered regularly.

See <https://neynar.com/> for API access and more details.

See the [@standard-crypto/farcaster-js-neynar](./packages/farcaster-js-neynar/README.md)
package for more on the Neynar API client.
