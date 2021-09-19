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
  - [Update Display Name](#update-display-name)
- [Self Hosting](#self-hosting)
  - [Github](#github)
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

### Update Display Name

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/updateDisplayName.ts) -->
<!-- The below code snippet is automatically added from ./examples/updateDisplayName.ts -->
```ts
import { InfuraProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import Farcaster, { FarcasterGuardianContentHost } from "farcaster";

const privateKey = "PRIVATE_KEY"; // 64 character hex string
const username = "USERNAME"; // do not include the leading `@`

const farcaster = new Farcaster();
const provider = new InfuraProvider("rinkeby");
const signer = new Wallet(privateKey, provider); // any Signer implementation accepted
const contentHost = new FarcasterGuardianContentHost(privateKey);
await farcaster.updateDirectory(username, signer, contentHost, {
  displayName: "John Doe",
});
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Self Hosting

### Github

First generate a [Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token)

An example script for migrating a user's data to a GitHub gist

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/migrateUserDataToGithub.ts) -->
<!-- The below code snippet is automatically added from ./examples/migrateUserDataToGithub.ts -->
```ts
import { InfuraProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import axios from "axios";
import Farcaster, {
  Directory,
  GithubGistContentHost,
  Web3UserRegistry,
} from "farcaster";

// See https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token
const githubPersonalAccessToken = "ghp_XXXXXXXXXXXXXX";
const privateKey = "..."; // 64 character hex string

// setup
const provider = new InfuraProvider("rinkeby");
const userRegistry = new Web3UserRegistry(provider);
const githubContentHost = new GithubGistContentHost(githubPersonalAccessToken);
const signer = new Wallet(privateKey, provider);
const farcaster = new Farcaster();

// lookup the existing Directory
const user = await userRegistry.lookupByAddress(signer.address);
if (!user) {
  throw new Error(`No user for address ${signer.address}`);
}
const oldDirectory = (await axios.get<Directory>(user.directoryUrl)).data;

// construct a new Directory with an updated `addressActivityUrl` that will point to the new Github gist
const newDirectoryBody = {
  ...oldDirectory.body,
  addressActivityUrl: await githubContentHost.activityUrl(),
};
const newDirectory = await Farcaster.signDirectory(newDirectoryBody, signer);

// upload the new directory to Github
await githubContentHost.updateDirectory(newDirectory);

// now migrate all the User's existing activity over to GitHub, too
const existingActivity = farcaster.getAllActivityForUser(user.username);
await githubContentHost.bulkUpload(existingActivity);

// last step is to update the UserRegistry contract state to point to GitHub for this user instead of Guardian
await userRegistry.updateDirectoryUrl(
  await githubContentHost.directoryUrl(),
  signer
);

// now, put a new post up on GitHub!
const unsignedPost = await farcaster.preparePost({
  fromUsername: user.username,
  text: "Posting to my self-hosted GitHub content host!",
});
const signedPost = await Farcaster.signPost(unsignedPost, signer);
await githubContentHost.publishPost(signedPost);
```
<!-- AUTO-GENERATED-CONTENT:END -->
