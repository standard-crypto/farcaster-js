# [5.0.0-beta.1](https://github.com/standard-crypto/farcaster-js/compare/v4.0.0...v5.0.0-beta.1) (2022-12-05)


### Bug Fixes

* matching server-side changes to MerkleAPI ([5b7d187](https://github.com/standard-crypto/farcaster-js/commit/5b7d187775ba11b47c3a4eb909df5f25b3513f97)), closes [#392](https://github.com/standard-crypto/farcaster-js/issues/392)


### BREAKING CHANGES

* casterFid removed from parameters for reactToCast and removeReactionToCast
* `publishedAt` renamed to `timestamp` in `Cast` model
* `displayName` made non-optional in `User` and `Recaster` models
* `embeds` removed from request body for POST /v2/casts

# [4.0.0](https://github.com/standard-crypto/farcaster-js/compare/v3.0.7...v4.0.0) (2022-12-01)


### Features

* Farcaster api v2 ([#384](https://github.com/standard-crypto/farcaster-js/issues/384)) ([5e6fd5d](https://github.com/standard-crypto/farcaster-js/commit/5e6fd5d194061cdf15de24fd6ffd8ef5e393881d))
* support fetching user's custody address ([3ff017e](https://github.com/standard-crypto/farcaster-js/commit/3ff017eef3d35a8279fd6512dcff72edd8d8e684)), closes [#388](https://github.com/standard-crypto/farcaster-js/issues/388)
* support notifications ([58053e8](https://github.com/standard-crypto/farcaster-js/commit/58053e854d35699a6be76165704376bec6eb3fea)), closes [#387](https://github.com/standard-crypto/farcaster-js/issues/387)
* support revoking auth tokens ([661a37a](https://github.com/standard-crypto/farcaster-js/commit/661a37ac56393055b2f84d6090cf9ab9a5716583)), closes [#386](https://github.com/standard-crypto/farcaster-js/issues/386)


### BREAKING CHANGES

* various refactors in support of new v2 farcaster APIs

# [4.0.0-beta.2](https://github.com/standard-crypto/farcaster-js/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2022-12-01)


### Features

* support fetching user's custody address ([3ff017e](https://github.com/standard-crypto/farcaster-js/commit/3ff017eef3d35a8279fd6512dcff72edd8d8e684)), closes [#388](https://github.com/standard-crypto/farcaster-js/issues/388)
* support notifications ([58053e8](https://github.com/standard-crypto/farcaster-js/commit/58053e854d35699a6be76165704376bec6eb3fea)), closes [#387](https://github.com/standard-crypto/farcaster-js/issues/387)
* support revoking auth tokens ([661a37a](https://github.com/standard-crypto/farcaster-js/commit/661a37ac56393055b2f84d6090cf9ab9a5716583)), closes [#386](https://github.com/standard-crypto/farcaster-js/issues/386)
