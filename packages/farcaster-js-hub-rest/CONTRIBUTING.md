# Contributing

## Setup

```sh
corepack enable

# install dependencies
yarn
```

## Running Tests

Integration tests may be run without any special credentials:

```sh
# running from project root...
yarn workspace @standard-crypto/farcaster-js-hub-rest test

# ...or from from this package's directory
yarn test
```

## Changes to OpenAPI Schema

This package is mostly just a convenience wrapper on top of the `openapi-generator` output
for the hub REST API [OpenAPI spec](./src/openapi/spec.yaml).

Feel free to make any changes to the spec, then `yarn generate` to produce the new code.

## Committing Changes

This library uses [Commitizen](https://commitizen-tools.github.io/commitizen/) for tracking semantic version changes.
Please use `yarn cz` when committing changes.

If you prefer to commit changes in incremental steps that may not pass the pre-commit checks, feel free to skip them:

```sh
git commit -m "chore: wip" --no-verify
```
