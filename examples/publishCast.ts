import { publishCast } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

const wallet = Wallet.fromMnemonic("twelve words here");
await publishCast(wallet, "Hello, Farcaster!");
