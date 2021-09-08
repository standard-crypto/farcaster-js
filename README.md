# Farcaster

![NPM](https://img.shields.io/npm/l/@standard-crypto/farcaster)
![NPM](https://img.shields.io/npm/v/@standard-crypto/farcaster)
![GitHub Workflow Status](https://github.com/standard-crypto/farcaster-js/actions/workflows/farcaster-js.yml/badge.svg?branch=main)

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Examples](#examples)
  - [Publish a Post](#publish-a-post)
  - [Fetch User Activity](#fetch-user-activity)
  - [Reply to a Post](#reply-to-a-post)
  - [Lookup a User](#lookup-a-user)
  - [Register a New Username](#register-a-new-username)
<!-- AUTO-GENERATED-CONTENT:END -->

## Examples

### Publish a Post

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/publishPost.ts) -->
<!-- The below code snippet is automatically added from ./examples/publishPost.ts -->
```ts
import { publishPost } from "farcaster";

const privateKey = "..."; // 64 character hex string
await publishPost(privateKey, "Hello, Farcaster!");
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Fetch User Activity

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/fetchUserActivity.ts) -->
<!-- The below code snippet is automatically added from ./examples/fetchUserActivity.ts -->
```ts
import Farcaster from "farcaster";

const farcaster = new Farcaster();
for await (const activity of farcaster.getAllActivityForUser("dwr")) {
  console.log(activity.body.data.text);
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Reply to a Post

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/replyToPost.ts) -->
<!-- The below code snippet is automatically added from ./examples/replyToPost.ts -->
```ts
import Farcaster, { publishPost } from "farcaster";

const farcaster = new Farcaster();
const latestPost = await farcaster.getLatestActivityForUser("dwr");
const privateKey = "..."; // 64 character hex string
publishPost(privateKey, "Replying to your post!", latestPost);
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Lookup a User

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/lookupUser.ts) -->
<!-- The below code snippet is automatically added from ./examples/lookupUser.ts -->
```ts
import { InfuraProvider } from "@ethersproject/providers";
import { Web3UserRegistry } from "farcaster";

const provider = new InfuraProvider("rinkeby");
const userRegistry = new Web3UserRegistry(provider);
console.log(await userRegistry.lookupByUsername("dwr"));
```
<!-- AUTO-GENERATED-CONTENT:END -->

### Register a New Username

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/registerUsername.ts) -->
<!-- The below code snippet is automatically added from ./examples/registerUsername.ts -->
```ts
import { InfuraProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import { Web3UserRegistry } from "farcaster";

const provider = new InfuraProvider("rinkeby");
const userRegistry = new Web3UserRegistry(provider);
const signer = new Wallet("<private key>", provider); // any Signer implementation accepted
const newUsername = "MyNewUsername"; // do not include the leading `@`
const tx = await userRegistry.registerUsername(newUsername, signer, {
  gasLimit: 400000,
});
await tx.wait();
console.log(await userRegistry.lookupByUsername(newUsername));
```
<!-- AUTO-GENERATED-CONTENT:END -->
