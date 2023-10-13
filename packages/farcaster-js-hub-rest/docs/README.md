@standard-crypto/farcaster-js-hub-rest / [Modules](modules.md)

# Farcaster Hub REST API Client

A tool for interacting with the REST API of a Farcaster hub.

![NPM](https://img.shields.io/npm/l/@standard-crypto/farcaster-js-hub-rest?no-cache)
![NPM](https://img.shields.io/npm/v/@standard-crypto/farcaster-js-hub-rest?no-cache)
![GitHub Workflow Status](https://github.com/standard-crypto/farcaster-js/actions/workflows/farcaster-js.yml/badge.svg?branch=main)

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Setup](#setup)
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
