import { Farcaster, publishCast } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";
import { AlchemyProvider } from "@ethersproject/providers";

const provider = new AlchemyProvider("goerli");
const farcaster = new Farcaster(provider);
const latestCast = await farcaster.getLatestActivityForUser("dwr");
const wallet = Wallet.fromMnemonic("twelve words here");
await publishCast(wallet, provider, "Replying to your cast!", latestCast);
