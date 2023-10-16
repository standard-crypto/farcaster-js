@standard-crypto/farcaster-js-hub-rest / [Modules](modules.md)

# Farcaster Hub REST API Client

A tool for interacting with the REST API of a Farcaster hub.

![NPM](https://img.shields.io/npm/l/@standard-crypto/farcaster-js-hub-rest?no-cache)
![NPM](https://img.shields.io/npm/v/@standard-crypto/farcaster-js-hub-rest?no-cache)
![GitHub Workflow Status](https://github.com/standard-crypto/farcaster-js/actions/workflows/farcaster-js.yml/badge.svg?branch=main)

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Setup](#setup)
- [Examples](#examples)
  - [Fetch a Cast](#fetch-a-cast)
  - [List a User's Casts](#list-a-users-casts)
  - [Fetch Hub Info](#fetch-hub-info)
- [Documentation](#documentation)
  - [HubRestAPIClient](#hubrestapiclient)
  - [OpenAPI Spec](#openapi-spec)
- [Contributing](#contributing)
<!-- AUTO-GENERATED-CONTENT:END -->

## Setup

Install the library:

```bash
npm install axios @standard-crypto/farcaster-js-hub-rest
```

## Examples

### Fetch a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/getCastById.ts) -->
<!-- The below code snippet is automatically added from ./examples/getCastById.ts -->
```ts
import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const client = new HubRestAPIClient();

const cast = await client.getCastById({
  fid: 2,
  hash: '0xd2b1ddc6c88e865a33cb1a565e0058d757042974',
});
if (cast === null) {
  throw new Error('Cast not found');
}

console.log(cast.data.castAddBody.text);
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

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)
