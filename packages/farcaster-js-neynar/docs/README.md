@standard-crypto/farcaster-js-neynar / [Modules](modules.md)

# Farcaster Neynar API Client

A tool for interacting with Farcaster via Neynar APIs.

![NPM](https://img.shields.io/npm/l/@standard-crypto/farcaster-js-neynar?no-cache)
![NPM](https://img.shields.io/npm/v/@standard-crypto/farcaster-js-neynar?no-cache)
![GitHub Workflow Status](https://github.com/standard-crypto/farcaster-js/actions/workflows/farcaster-js.yml/badge.svg?branch=main)

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Setup](#setup)
- [Examples](#examples)
  - [Create a Signer](#create-a-signer)
  - [Publish a Cast](#publish-a-cast)
  - [Reply to a Cast](#reply-to-a-cast)
  - [Like and Recast a Cast](#like-and-recast-a-cast)
  - [Follow a User](#follow-a-user)
  - [Get a User's Casts and Likes](#get-a-users-casts-and-likes)
- [Contributing](#contributing)
<!-- AUTO-GENERATED-CONTENT:END -->

## Setup

Install the library:

```bash
npm install axios @standard-crypto/farcaster-js-neynar
```

## Examples

### Create a Signer

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/createSigner.ts) -->
<!-- The below code snippet is automatically added from ./examples/createSigner.ts -->
```ts
import { NeynarAPIClient, waitForNeynarSignerApproval } from '@standard-crypto/farcaster-js-neynar';
import QRCode from 'qrcode';

const client = new NeynarAPIClient('apiKey');

const developerMnemonic = 'your farcaster recovery phrase';

// create signer
const signer = await client.v2.createSigner(
  developerMnemonic,
);

console.log('Scan the QR code below on a logged in device to approve signer');
console.log(await QRCode.toString(signer.signer_approval_url ?? '', { type: 'terminal', small: true }));
console.log(`url: ${signer.signer_approval_url}`);
console.log('Once approved, you can start using your signer to write data to Farcaster');
console.log(`signer uuid: ${signer.signer_uuid}`);
console.log('waiting for signer to be approved...');
await waitForNeynarSignerApproval(client, signer.signer_uuid);
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Publish a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/publishCast.ts) -->
<!-- The below code snippet is automatically added from ./examples/publishCast.ts -->
```ts
import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

const signerUuid = 'approvedSignerUUID';
const client = new NeynarAPIClient('apiKey');

const publishedCast = await client.v2.publishCast(signerUuid, 'This is a test cast.');

console.log(`New cast hash: ${publishedCast.hash}`);
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Reply to a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/replyToCast.ts) -->
<!-- The below code snippet is automatically added from ./examples/replyToCast.ts -->
```ts
import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

const signerUuid = 'approvedSignerUUID';
const client = new NeynarAPIClient('apiKey');

const existingCastHash = 'existingCastHash';
const publishedCast = await client.v2.publishCast(signerUuid, 'This is a reply cast.', { replyTo: existingCastHash });

console.log(`Reply hash:${publishedCast.hash}`);
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Like and Recast a Cast

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/likeAndRecast.ts) -->
<!-- The below code snippet is automatically added from ./examples/likeAndRecast.ts -->
```ts
import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

const signerUuid = 'approvedSignerUUID';
const client = new NeynarAPIClient('apiKey');

const existingCastHash = 'existingCastHash';
await client.v2.reactToCast(signerUuid, 'like', existingCastHash); // Like Cast
await client.v2.reactToCast(signerUuid, 'recast', existingCastHash); // Recast Cast
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Follow a User

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/followUser.ts) -->
<!-- The below code snippet is automatically added from ./examples/followUser.ts -->
```ts
import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

const signerUuid = 'approvedSignerUUID';
const client = new NeynarAPIClient('apiKey');

const userToFollowFid = 13525;
await client.v2.followUsers(signerUuid, [userToFollowFid]);
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Get a User's Casts and Likes

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/getUserActivity.ts) -->
<!-- The below code snippet is automatically added from ./examples/getUserActivity.ts -->
```ts
import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

const client = new NeynarAPIClient('apiKey');

const username = 'dwr';

const user = await client.v1.lookupUserByUsername(username);
if (user === null) throw new Error(`No user ${username} found.`);

const numCastsToFetch = 100;
let castsFetched = 0;
console.log('User Casts:');
for await (const cast of await client.v1.fetchCastsForUser(user.fid)) {
  console.log(cast.text);
  castsFetched++;
  if (castsFetched === numCastsToFetch) break;
}

const numLikesToFetch = 100;
let likesFetched = 0;
console.log('User Likes:');
for await (const like of await client.v1.fetchUserCastLikes(user.fid)) {
  console.log(`${like.cast_author?.username} : ${like.cast?.cast_text}`);
  likesFetched++;
  if (likesFetched === numLikesToFetch) break;
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)
