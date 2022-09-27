import { Farcaster, publishCast } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

const farcaster = new Farcaster();
const latestCast = await farcaster.getLatestActivityForUser("dwr");
const wallet = Wallet.fromMnemonic("twelve words here");
await publishCast(wallet, "Replying to your cast!", latestCast);
