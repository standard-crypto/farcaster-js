import { InfuraProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";

import { GithubGistContentHost } from "../src/contentHost/github";
import { Farcaster } from "../src/farcaster";
import { Web3UserRegistry } from "../src/userRegistry";
import { expectDefined } from "./utils";

// Note: This is a live integration test. Running it requires a working github personal access token and
// the private key of a registered Farcaster address.

// See https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token
const githubPersonalAccessToken = "ghp_XXXXXXXXXXXXXXXXX";
const privateKey = "..."; // 64 character hex string

describe.skip("GithubGistContentHost", function () {
  it("supports publishing a cast", async function () {
    this.timeout(5000);
    const githubContentHost = new GithubGistContentHost(
      githubPersonalAccessToken
    );
    const farcaster = new Farcaster();
    const provider = new InfuraProvider("rinkeby");
    const signer = new Wallet(privateKey, provider);
    const userRegistry = new Web3UserRegistry(provider);
    const user = await userRegistry.lookupByAddress(signer.address);
    expectDefined(user);
    const unsignedCast = await farcaster.prepareCast({
      fromUsername: user.username,
      text: "This is a test cast written to a Github Gist",
    });
    const signedCast = await Farcaster.signCast(unsignedCast, signer);
    await githubContentHost.publishCast(signedCast);
  });
});
