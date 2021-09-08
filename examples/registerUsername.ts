import { InfuraProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import { Web3UserRegistry } from "farcaster";

const provider = new InfuraProvider("rinkeby");
const userRegistry = new Web3UserRegistry(provider);
const signer = new Wallet("<private key>", provider); // any Signer implementation accepted
const newUsername = "MyNewUsername"; // do not include the leading `@`
await userRegistry.registerUsername(newUsername, signer, { gasLimit: 400000 });
console.log(await userRegistry.lookupByUsername(newUsername));
