import { publishCast } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

const wallet = Wallet.fromMnemonic("twelve words here");

const cast = await publishCast(wallet, "Hello, Farcaster!");

console.log(`New cast hash: ${cast.hash}`);
