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
***Creating a Neynar Signer:***
<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/neynarSigner.ts) -->
<!-- The below code snippet is automatically added from ./examples/neynarSigner.ts -->
```ts
import { NeynarAPIClient, waitForNeynarSignerApproval } from '@standard-crypto/farcaster-js-neynar';
import QRCode from 'qrcode';

const client = new NeynarAPIClient('apiKey');

const developerMnemonic = 'your farcaster recovery phrase';
// default deadline is 30 days - set longer if needed
// const deadline = Math.floor(Date.now() / 1000) + 30 * 86400;

// create signer
const signer = await client.v2.createSigner(
  developerMnemonic,
//   deadline,
);

console.log('Scan the QR code below on a logged in device to approve signer');
console.log(await QRCode.toString(signer.signer_approval_url ?? '', { type: 'terminal', small: true }));
console.log(`url: ${signer.signer_approval_url}`);
console.log('Once approved, you can start using your signer to write data to Farcaster');
console.log(`signer uuid: ${signer.signer_uuid}`);
console.log('waiting for signer to be approved...');
await waitForNeynarSignerApproval(client, signer.signer_uuid);
```
<!-- AUTO-GENERATED-CONTENT:END -->

***Usage Versus Hub APIs:***

The REST APIs exposed by a Farcaster hub are designed to provide protocol entities optimized for the transport and indexing layer. Neynar APIs are designed for building at the application-layer.

Neynar v1 APIs are designed to replicate the deprecated Warpcast APIs to ensure that the ecosystem of products built on those APIs can continue thriving with minimal switching costs. The Neynar v1 APIs should act serve a drop-in replacement for applications using `farcaster-js` pre-version 6.0.

Neynar v2 APIs bring in additional support for new Farcaster protocol primitives like channels and signer management with much more support for storage, sign in with farcaster and new features delivered regularly.

See <https://neynar.com/> for API access and more details.

See the [@standard-crypto/farcaster-js-neynar](./packages/farcaster-js-neynar/README.md)
package for more on the Neynar API client.
