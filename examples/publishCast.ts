import { publishCast } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";
import { AlchemyProvider } from "@ethersproject/providers";

const provider = new AlchemyProvider("goerli");
const wallet = Wallet.fromMnemonic("twelve words here");
await publishCast(wallet, provider, "Hello, Farcaster!");
