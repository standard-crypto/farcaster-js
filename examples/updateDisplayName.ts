import { InfuraProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import { FarcasterGuardianContentHost } from "farcaster";
import Farcaster from "farcaster";

const privateKey = "PRIVATE_KEY"; // 64 character hex string
const username = "USERNAME"; // // do not include the leading `@`

const farcaster = new Farcaster();
const provider = new InfuraProvider("rinkeby");
const signer = new Wallet(privateKey, provider); // any Signer implementation accepted
const contentHost = new FarcasterGuardianContentHost(privateKey);
await farcaster.updateDirectory(username, signer, contentHost, {
  displayName: "John Doe",
});
