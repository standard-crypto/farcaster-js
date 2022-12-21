# [5.3.0](https://github.com/standard-crypto/farcaster-js/compare/v5.2.0...v5.3.0) (2022-12-21)


### Bug Fixes

* fix type returned by `fetchUserCastLikes` ([edacb1c](https://github.com/standard-crypto/farcaster-js/commit/edacb1c6e6271e4d7046c736b2c48681bc56ef18)), closes [#435](https://github.com/standard-crypto/farcaster-js/issues/435)


### Features

* add utility & docs for parsing Merkle API error responses ([098d4c2](https://github.com/standard-crypto/farcaster-js/commit/098d4c2a5bf66c4d4ff93c5bd55fecf14d57cb97)), closes [#435](https://github.com/standard-crypto/farcaster-js/issues/435)

# [5.2.0](https://github.com/standard-crypto/farcaster-js/compare/v5.1.0...v5.2.0) (2022-12-12)


### Features

* support `GET /v2/all-casts-in-thread` endpoint ([4e53a09](https://github.com/standard-crypto/farcaster-js/commit/4e53a090c642dd4c41a9e26b9f2bd77b23d44bbb)), closes [#413](https://github.com/standard-crypto/farcaster-js/issues/413)
* support `GET /v2/cast` endpoint ([8e2787d](https://github.com/standard-crypto/farcaster-js/commit/8e2787ddb3b66343a94ae576194ac7d40c79d654)), closes [#412](https://github.com/standard-crypto/farcaster-js/issues/412)
* support `GET /v2/recent-casts` endpoint ([cbe3a1f](https://github.com/standard-crypto/farcaster-js/commit/cbe3a1f9898968ed2a82e525c12d6e1916b4914b)), closes [#415](https://github.com/standard-crypto/farcaster-js/issues/415)
* support `GET /v2/recent-users` endpoint ([1e1e30d](https://github.com/standard-crypto/farcaster-js/commit/1e1e30de0474adec8023b9c97393975b70ff1948)), closes [#414](https://github.com/standard-crypto/farcaster-js/issues/414)
* support `GET /v2/user-by-verification` endpoint ([856a234](https://github.com/standard-crypto/farcaster-js/commit/856a234966a91bb59a70575e1673c4e28e842c7f)), closes [#416](https://github.com/standard-crypto/farcaster-js/issues/416)
* support `GET /v2/user-cast-likes` endpoint ([25dddaa](https://github.com/standard-crypto/farcaster-js/commit/25dddaad6c33cb906477702dfd6d73f7d6518e54)), closes [#417](https://github.com/standard-crypto/farcaster-js/issues/417)

# [5.1.0](https://github.com/standard-crypto/farcaster-js/compare/v5.0.0...v5.1.0) (2022-12-08)


### Bug Fixes

* merkleAPIClient no longer attempts to reuse a revoked API token ([502845a](https://github.com/standard-crypto/farcaster-js/commit/502845a91adad951d80c28cdc369c2b6d667a603))


### Features

* expose verifications endpoint ([47a54a5](https://github.com/standard-crypto/farcaster-js/commit/47a54a55538b8723cb15aa2744f08d4c3da8ff13)), closes [#404](https://github.com/standard-crypto/farcaster-js/issues/404)

# [5.0.0](https://github.com/standard-crypto/farcaster-js/compare/v4.0.0...v5.0.0) (2022-12-05)


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
