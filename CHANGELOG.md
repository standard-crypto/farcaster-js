# [7.3.0](https://github.com/standard-crypto/farcaster-js/compare/v7.2.0...v7.3.0) (2024-02-14)

### Features

* farcaster-js-hub-rest: Adds the param `parentUrl` to the `submitCast` method to allow casting into a channel

### Bug Fixes

* farcaster-js-hub-rest: Updates the openAPI spec to fix the `Embed` object to support urls and casts

# [7.2.0](https://github.com/standard-crypto/farcaster-js/compare/v7.1.0...v7.2.0) (2024-01-29)

### Features

* Updates the openAPI spec to add types for Frames and the `/validateMessage` endpoint
* Implements validate message logic

# [7.1.1](https://github.com/standard-crypto/farcaster-js/compare/v7.0.0...v7.1.0) (2023-12-20)

### Features

* Adds parentCastId to submitCast
* Changes the openAPI spec to improve some of the generated typescript types (it was producing something unusable)
* Remove the nullable types for return values of methods like submitCast



# [7.0.0](https://github.com/standard-crypto/farcaster-js/compare/v6.0.7...v7.0.0) (2023-11-28)

### Features

* Add CLI sub-package for creating Farcaster signers
* Add support for submitting messages to hubs in hub-rest sub-package
* Simplify signer creation for Neynar
* Update Neynar reactToCast parameters


# [6.0.3](https://github.com/standard-crypto/farcaster-js/compare/v6.0.2...v6.0.3) (2023-10-21)


# [6.0.2](https://github.com/standard-crypto/farcaster-js/compare/v6.0.1...v6.0.2) (2023-10-19)

### Features

* update default hub to nemes.farcaster.xyz


# [6.0.1](https://github.com/standard-crypto/farcaster-js/compare/v6.0.0...v6.0.1) (2023-10-18)

### Bug Fixes

* fix typescript \types\ output to not output types of dependencies


# [6.0.0](https://github.com/standard-crypto/farcaster-js/compare/v5.7.0...v6.0.0) (2023-10-16)

### Features

* creates new package structure for using hub-rest and Neynar APIs


# [5.7.0](https://github.com/standard-crypto/farcaster-js/compare/v5.6.0...v5.7.0) (2023-10-05)


### Bug Fixes

* **deps:** bump axios from 1.3.4 to 1.3.5 ([7d9ee28](https://github.com/standard-crypto/farcaster-js/commit/7d9ee28f655301a471d453527c3367ab4946161d))
* **deps:** bump axios from 1.3.5 to 1.3.6 ([a7fbc1a](https://github.com/standard-crypto/farcaster-js/commit/a7fbc1a52e6fcf391f58b1f9b2bf4d1f93127315))
* **deps:** bump axios from 1.3.6 to 1.4.0 ([97d850e](https://github.com/standard-crypto/farcaster-js/commit/97d850e7afaf23db08226c51876accf68c2d4ede))
* **deps:** bump canonicalize from 1.0.8 to 2.0.0 ([8fb66af](https://github.com/standard-crypto/farcaster-js/commit/8fb66af4a4330e39be3b73c9738944f530eaf410))


### Features

* adds support for embeds ([37a9c14](https://github.com/standard-crypto/farcaster-js/commit/37a9c14c33c5ebb5b83aa7f72e67febfa39dd88f)), closes [#621](https://github.com/standard-crypto/farcaster-js/issues/621)

# [5.6.0](https://github.com/standard-crypto/farcaster-js/compare/v5.5.4...v5.6.0) (2023-03-21)


### Features

* prevent users getting stuck with 401s due to too many Auth Tokens ([a8d6941](https://github.com/standard-crypto/farcaster-js/commit/a8d69417b905c5b35eaaf5bea0e9fcee2acf2963)), closes [#547](https://github.com/standard-crypto/farcaster-js/issues/547)
* wrap the Healtcheck Warpcast API endpoint ([b29d7cf](https://github.com/standard-crypto/farcaster-js/commit/b29d7cfa5f00b1334450c1b48de242353e9875f4)), closes [#541](https://github.com/standard-crypto/farcaster-js/issues/541)
* wrap Warpcast API methods for signer requests ([00f193d](https://github.com/standard-crypto/farcaster-js/commit/00f193ddf6d1af2989ff7288c3061569c298fa61)), closes [#539](https://github.com/standard-crypto/farcaster-js/issues/539)

## [5.5.4](https://github.com/standard-crypto/farcaster-js/compare/v5.5.3...v5.5.4) (2023-03-14)


### Bug Fixes

* fix bug caused by upstream Warpcast API change to lookupUserByFid response code ([24b53d1](https://github.com/standard-crypto/farcaster-js/commit/24b53d104478910f82c5d6c4df3afbf4add12f4a))

## [5.5.3](https://github.com/standard-crypto/farcaster-js/compare/v5.5.2...v5.5.3) (2023-02-28)


### Bug Fixes

* **deps:** bump axios from 1.3.3 to 1.3.4 ([bbd737b](https://github.com/standard-crypto/farcaster-js/commit/bbd737b4002fd8941bb1fc35cf6c65a85bffeecc))
* warpcast API changed case of "Like" reaction type to "like" ([5afaafa](https://github.com/standard-crypto/farcaster-js/commit/5afaafa84d369e240f7ddb8566ccb048a1f816fd))

## [5.5.2](https://github.com/standard-crypto/farcaster-js/compare/v5.5.1...v5.5.2) (2023-02-16)


### Bug Fixes

* **deps:** bump axios from 1.1.3 to 1.3.1 ([701086e](https://github.com/standard-crypto/farcaster-js/commit/701086e7a35b6da2d11e693efe0912e8b9b8b867))
* **deps:** bump axios from 1.3.1 to 1.3.2 ([6facc5e](https://github.com/standard-crypto/farcaster-js/commit/6facc5e27bd6885cc9dc66b11c21aaef6add4a33))
* **deps:** bump axios from 1.3.2 to 1.3.3 ([8f833e7](https://github.com/standard-crypto/farcaster-js/commit/8f833e7a73786551c7a0488e5d26d5219c776bcc))
* migrate API client from farcaster.xyz to warpcast.com ([dbb2f16](https://github.com/standard-crypto/farcaster-js/commit/dbb2f162c1a8c7cf890792a1345247a66bfa941d))


### Reverts

* adds to package.json keywords ([a05a548](https://github.com/standard-crypto/farcaster-js/commit/a05a548fd9020f31bea7f5fe9da629878f9b4d51))

## [5.5.1](https://github.com/standard-crypto/farcaster-js/compare/v5.5.0...v5.5.1) (2023-01-13)


### Bug Fixes

* narrow return type of `fetchMentionAndReplyNotifications()` ([e2bb2f6](https://github.com/standard-crypto/farcaster-js/commit/e2bb2f66e10435b664484ba7e147eef005fe9c55)), closes [#459](https://github.com/standard-crypto/farcaster-js/issues/459)

# [5.5.0](https://github.com/standard-crypto/farcaster-js/compare/v5.4.0...v5.5.0) (2023-01-10)


### Features

* adds `fetchCastLikes()` to MerkleAPIClient ([e07abf2](https://github.com/standard-crypto/farcaster-js/commit/e07abf2b33e2c17ef6c739dc00c0f48d2b017568)), closes [#454](https://github.com/standard-crypto/farcaster-js/issues/454)

# [5.4.0](https://github.com/standard-crypto/farcaster-js/compare/v5.3.0...v5.4.0) (2022-12-28)


### Bug Fixes

* export the underlying MerkleAPI types ([a2605de](https://github.com/standard-crypto/farcaster-js/commit/a2605de690a5604a053fe658e2b176ee8bfe78e5))


### Features

* add MerkleAPIClient support for user-supplied AuthTokens (replacing Wallet param) ([46d6758](https://github.com/standard-crypto/farcaster-js/commit/46d6758a4584f91c268a7c8278dfde5ca4f0be1e)), closes [#438](https://github.com/standard-crypto/farcaster-js/issues/438)

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
