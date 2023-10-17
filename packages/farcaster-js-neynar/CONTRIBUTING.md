# Contributing

## Setup

```sh
corepack enable

# install dependencies
yarn
```

## Running Tests

Integration tests require the following environment variables be set (see (.env.example)[./.env.example]):

```
INTEGRATION_TEST_NEYNAR_API_KEY - required for v1 & v2 testing
INTEGRATION_TEST_NEYNAR_SIGNER_FID - required for v2
INTEGRATION_TEST_NEYNAR_SIGNER_UUID - required for v2
INTEGRATION_TEST_NEYNAR_SIGNER_PUBLIC_KEY: required for v2
```

Run Tests

```sh
# running from project root...
yarn workspace @standard-crypto/farcaster-js-neynar test

# ...or from from this package's directory
yarn test
```

### Generating a Signer

Generating a signer requires the following environments variable be set:

```
INTEGRATION_TEST_NEYNAR_API_KEY
SIGNER_USER_MNEMONIC
```

Generate Signer

```sh
# running from project root...
yarn workspace @standard-crypto/farcaster-js-neynar signer

# ...or from from this package's directory
yarn signer

Set env var INTEGRATION_TEST_NEYNAR_SIGNER_UUID=<signer uuid>
Set env var INTEGRATION_TEST_NEYNAR_SIGNER_PUBLIC_KEY=<signer public key>
Open url farcaster://signed-key-request?token=<token> on a logged in ios device to approve signer
If using an android device, use url https://client.warpcast.com/deeplinks/signed-key-request?token=<token>
```

Save the signer uuid and public key, and approve the signer request on your mobile device.

## Changes to OpenAPI Schema

This package is mostly just a convenience wrapper on top of the `openapi-generator` output
for the Neynar APIs OpenAPI specs: [v1](./src/v1/openapi/spec.yaml), [v2](./src/v2/openapi/spec.yaml).

Feel free to make any changes to the specs, then `yarn generate` to produce the new code.

## Committing Changes

This library uses [Commitizen](https://commitizen-tools.github.io/commitizen/) for tracking semantic version changes.
Please use `yarn cz` when committing changes.

If you prefer to commit changes in incremental steps that may not pass the pre-commit checks, feel free to skip them:

```sh
git commit -m "chore: wip" --no-verify
```
