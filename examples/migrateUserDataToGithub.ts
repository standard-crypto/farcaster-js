import { InfuraProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import axios from "axios";
import {
  Farcaster,
  Directory,
  GithubGistContentHost,
  Web3UserRegistry,
} from "@standard-crypto/farcaster-js";

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
if (user == null) {
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

// now, put a new cast up on GitHub!
const unsignedCast = await farcaster.prepareCast({
  fromUsername: user.username,
  text: "Casting to my self-hosted GitHub content host!",
});
const signedCast = await Farcaster.signCast(unsignedCast, signer);
await githubContentHost.publishCast(signedCast);
