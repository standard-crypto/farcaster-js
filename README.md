# Farcaster.js

A collection of tools for interacting with the Farcaster social network.

![NPM](https://img.shields.io/npm/l/@standard-crypto/farcaster-js?no-cache)
![NPM](https://img.shields.io/npm/v/@standard-crypto/farcaster-js?no-cache)
![GitHub Workflow Status](https://github.com/standard-crypto/farcaster-js/actions/workflows/farcaster-js.yml/badge.svg?branch=main)

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Farcaster Hub REST API](#farcaster-hub-rest-api)
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

```typescript
import { HubRestAPIClient } from '@standard-crypto/farcaster-js'

const client = new HubRestAPIClient();
console.log(await client.getHubInfo());
```

See the [@standard-crypto/farcaster-js-hub-rest](./packages/farcaster-js-hub-rest/README.md)
package for more info.
