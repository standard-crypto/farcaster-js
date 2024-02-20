# Farcaster Hub REST API Client

A tool for interacting with the REST API of a Farcaster hub.

![NPM](https://img.shields.io/npm/l/@standard-crypto/farcaster-js-hub-rest?no-cache)
![NPM](https://img.shields.io/npm/v/@standard-crypto/farcaster-js-hub-rest?no-cache)
![GitHub Workflow Status](https://github.com/standard-crypto/farcaster-js/actions/workflows/farcaster-js.yml/badge.svg?branch=main)

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Setup](#setup)
- [Signers](#signers)
- [Examples](#examples)
  - [Publish a Cast](#publish-a-cast)
  - [React to a Cast](#react-to-a-cast)
  - [Follow a User](#follow-a-user)
  - [Fetch a Cast](#fetch-a-cast)
  - [List a User's Casts](#list-a-users-casts)
  - [Validate a Message](#validate-a-message)
  - [Fetch Hub Info](#fetch-hub-info)
- [Documentation](#documentation)
  - [HubRestAPIClient](#hubrestapiclient)
  - [OpenAPI Spec](#openapi-spec)
- [Setting the Target Hub](#setting-the-target-hub)
- [Contributing](#contributing)
<!-- AUTO-GENERATED-CONTENT:END -->

## Setup

Install the library:

```bash
npm install axios @standard-crypto/farcaster-js-hub-rest
```

## Signers

Signers are required to write data to Farcaster. You can learn more about signers from the [Farcaster docs](https://docs.farcaster.xyz/developers/guides/accounts/create-account-key).

The root package includes a CLI for creating signers. You can run the code below to generate a signer:
```
npm install axios @standard-crypto/farcaster-js
# alternatively, you can use @standard-crypto/farcaster-js-cli
farcaster-js create-signer
```

Read more about the CLI in [farcaster-js-cli/](../farcaster-js-cli/README.md).

## Examples

### Publish a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/publishCast.ts) -->
<!-- The below code snippet is automatically added from ./examples/publishCast.ts -->
```ts
import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const signerPrivateKey = '0x...';
const fid = 111;
const client = new HubRestAPIClient({ hubUrl: 'https://hub.farcaster.standardcrypto.vc:2281' });

const publishCastResponse = await client.submitCast({ text: 'This is a test cast submitted from farcaster-js-hub-rest' }, fid, signerPrivateKey);
console.log(`new cast hash: ${publishCastResponse.hash}`);
```
<!-- AUTO-GENERATED-CONTENT:END -->

### React to a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/reactToCast.ts) -->
<!-- The below code snippet is automatically added from ./examples/reactToCast.ts -->
```ts
import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const signerPrivateKey = '0x...';
const fid = 111;
const targetFid = 6365;
const targetCastHash = '0x3dba25e25db088f1a981da2b65b00f6008faee06';
const client = new HubRestAPIClient({ hubUrl: 'https://hub.farcaster.standardcrypto.vc:2281' });

const reactToCastResponse = await client.submitReaction({ type: 'like', target: { fid: targetFid, hash: targetCastHash } }, fid, signerPrivateKey);
console.log(`reaction hash: ${reactToCastResponse.hash}`);
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Follow a User

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/followUser.ts) -->
<!-- The below code snippet is automatically added from ./examples/followUser.ts -->
```ts
import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const signerPrivateKey = '0x...';
const fid = 111;
const targetFid = 6365;
const client = new HubRestAPIClient({ hubUrl: 'https://hub.farcaster.standardcrypto.vc:2281' });

const followResponse = await client.followUser(targetFid, fid, signerPrivateKey);
console.log(`follow hash: ${followResponse.hash}`);
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Fetch a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/getCastById.ts) -->
<!-- The below code snippet is automatically added from ./examples/getCastById.ts -->
```ts
import { FarcasterEpochTimestamp, HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const client = new HubRestAPIClient();

const cast = await client.getCastById({
  fid: 2,
  hash: '0xd2b1ddc6c88e865a33cb1a565e0058d757042974',
});
if (cast === null) {
  throw new Error('Cast not found');
}

console.log(cast.data.castAddBody.text); // text
console.log(FarcasterEpochTimestamp.parse(cast.data.timestamp)); // timestamp
```
<!-- AUTO-GENERATED-CONTENT:END -->

### List a User's Casts

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/listCastsByFid.ts) -->
<!-- The below code snippet is automatically added from ./examples/listCastsByFid.ts -->
```ts
import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const client = new HubRestAPIClient();

const casts = client.listCastsByFid(2);
for await (const cast of casts) {
  console.log(cast.data.castAddBody.text);
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Validate a Message

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/validateMessage.ts) -->
<!-- The below code snippet is automatically added from ./examples/validateMessage.ts -->
```ts
import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const client = new HubRestAPIClient();
const rawMessageBytes = '0x0a42080d10c4aa0118c6d1922e20018201320a12687474703a2f2f6578616d706c652e636f6d10011a1a08c4aa0112141fd48ddc9d5910046acfa5e1b91d253763e320c31214230a1291ae8e220bf9173d9090716981402bdd3d18012240f08c907486afe1c3311565b7a27c1f0011c74bd22ba167abe8ba30a35e808cbeae674aef7b74d3161c6186e48e3cc4d843c5ec9dc1dce9c6b71547adcc02c90c28013220196a70ac9847d59e039d0cfcf0cde1adac12f5fb447bb53334d67ab18246306c';

const validateCastResponse = await client.validateMessage(rawMessageBytes);
console.log(`valid message: ${validateCastResponse.valid}`);
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Fetch Hub Info

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/hubInfo.ts) -->
<!-- The below code snippet is automatically added from ./examples/hubInfo.ts -->
```ts
import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const client = new HubRestAPIClient();

const hubInfo = await client.getHubInfo();
console.log(hubInfo.nickname);

const hubInfoWithStats = await client.getHubInfo({ includeDbStats: true });
console.log(hubInfoWithStats.dbStats.numMessages);
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Documentation

### HubRestAPIClient

The `HubRestAPIClient` class provides a series of convenience methods for interacting with any hub's REST API. Its methods are documented [here](./docs/classes/hubRestApiClient.HubRestAPIClient.md).

### OpenAPI Spec

The `HubRestAPIClient` class provides convenience wrappers on top of the output of an `openapi-generator`
for the hub REST API [OpenAPI spec](./src/openapi/spec.yaml).

This class should suit most needs. If needed, the OpenAPI generated code is exported via the `HubRestAPIClient.apis` property.

The OpenAPI spec is best explored via [Redocly](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/standard-crypto/farcaster-js/develop/packages/farcaster-js-hub-rest/src/openapi/spec.yaml).

## Setting the Target Hub

By default the client will use `https://nemes.farcaster.xyz:2281` as its target hub, but you may also use our hub (<https://hub.farcaster.standard-crypto.vc:2281>) or any other hub you choose.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/changeTargetHub.ts) -->
<!-- The below code snippet is automatically added from ./examples/changeTargetHub.ts -->
```ts
import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const client = new HubRestAPIClient({ hubUrl: 'https://hub.farcaster.standardcrypto.vc:2281' });
console.log(await client.getHubInfo());
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)
