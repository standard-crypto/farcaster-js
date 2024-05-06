# Farcaster.js

A collection of tools for interacting with the Farcaster social network.

![NPM](https://img.shields.io/npm/l/@standard-crypto/farcaster-js?no-cache)
![NPM](https://img.shields.io/npm/v/@standard-crypto/farcaster-js?no-cache)
![GitHub Workflow Status](https://github.com/standard-crypto/farcaster-js/actions/workflows/farcaster-js.yml/badge.svg?branch=main)

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Farcaster Hub REST API](#farcaster-hub-rest-api)
- [Neynar REST APIs](#neynar-rest-apis)
- [Signers](#signers)
  - [Privy](#privy)
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
import { HubRestAPIClient, ExternalEd25519Signer } from '@standard-crypto/farcaster-js';

import { NobleEd25519Signer } from '@farcaster/core';

const client = new HubRestAPIClient();
console.log(await client.getHubInfo());

// Use a private key
const signerPrivateKey = '0x...';
const fid = 111;
const writeClient = new HubRestAPIClient({ hubUrl: 'https://hub.farcaster.standardcrypto.vc:2281' });

const publishCastResponse = await writeClient.submitCast({ text: 'This is a test cast submitted from farcaster-js' }, fid, signerPrivateKey);
console.log(`new cast hash: ${publishCastResponse.hash}`);

// Use an external signer
const nobleSigner = new NobleEd25519Signer(new Uint8Array([]));
const _signMessage = async(messageHash: Uint8Array): Promise<Uint8Array> => {
  const res = await nobleSigner.signMessageHash(messageHash);
  if (res.isErr()) {
    throw res.error;
  }
  return res._unsafeUnwrap();
};
const _getPublicKey = async(): Promise<Uint8Array> => {
  const res = await nobleSigner.getSignerKey();
  if (res.isErr()) {
    throw res.error;
  }
  return res._unsafeUnwrap();
};
const externalSigner = new ExternalEd25519Signer(_signMessage, _getPublicKey);

const publishCastExternalSignerResponse = await writeClient.submitCast({ text: 'This is a test cast submitted from farcaster-js using an external signer' }, fid, externalSigner);
console.log(`new cast hash with external signer: ${publishCastExternalSignerResponse.hash}`);
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

## Signers

Signers are required to write data to Farcaster. You can learn more about signers from these resources ([Farcaster](https://docs.farcaster.xyz/developers/guides/accounts/create-account-key), [Neynar](https://docs.neynar.com/docs/write-to-farcaster-with-neynar-managed-signers), [Privy](https://docs.privy.io/guide/react/recipes/misc/farcaster-writes#_2-create-an-embedded-farcaster-signer)).

This package includes a CLI for creating signers. You can run the code below to generate a signer:
```
farcaster-js create-signer
```

Read more about the CLI in [farcaster-js-cli](./packages/farcaster-js-cli/README.md).

Additionally, signers may be created programmatically without use of the CLI. See the examples in [farcaster-js-neynar](./packages/farcaster-js-neynar/README.md#create-a-signer) or follow [this guide](https://docs.privy.io/guide/react/recipes/misc/farcaster-writes#_1-login-with-farcaster) from Privy for logging users in with Farcaster and authorizing a signer.

### Privy

[Privy](https://privy.io) enables users to easily log in to your app using their Farcaster account. Follow [this guide](https://docs.privy.io/guide/react/recipes/misc/farcaster-writes) to enable Farcaster login and begin writing messages. See the example below for usage once logging in with Farcaster is integrated.

```
import { HubRestAPIClient, ExternalEd25519Signer } from '@standard-crypto/farcaster-js';
import { useExperimentalFarcasterSigner, usePrivy } from '@privy-io/react-auth';

const client = new HubRestAPIClient();
console.log(await client.getHubInfo());

const { user } = usePrivy();
const { getFarcasterSignerPublicKey, signFarcasterMessage } = useExperimentalFarcasterSigner();

// Use a Privy embedded signer
const privySigner = new ExternalEd25519Signer(signFarcasterMessage, getFarcasterSignerPublicKey);
const fid = user.farcaster.fid!;

const publishCastExternalSignerResponse = await client.submitCast({ text: 'This is a test cast submitted from farcaster-js using an external signer' }, fid, privySigner);
console.log(`new cast hash with privy embedded signer signer: ${publishCastExternalSignerResponse.hash}`);
```

***Usage Versus Hub APIs:***

The REST APIs exposed by a Farcaster hub are designed to provide protocol entities optimized for the transport and indexing layer. Neynar APIs are designed for building at the application-layer.

Neynar v1 APIs are designed to replicate the deprecated Warpcast APIs to ensure that the ecosystem of products built on those APIs can continue thriving with minimal switching costs. The Neynar v1 APIs should act serve a drop-in replacement for applications using `farcaster-js` pre-version 6.0.

Neynar v2 APIs bring in additional support for new Farcaster protocol primitives like channels and signer management with much more support for storage, sign in with farcaster and new features delivered regularly.

See <https://neynar.com/> for API access and more details.

See the [@standard-crypto/farcaster-js-neynar](./packages/farcaster-js-neynar/README.md)
package for more on the Neynar API client.
