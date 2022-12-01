import { MerkleAPIClient } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

// init
const wallet = Wallet.fromMnemonic("twelve words here");
const apiClient = new MerkleAPIClient(wallet);

// fetch cast to reply to
const user = await apiClient.lookupUserByUsername("dwr");
if (user === undefined) throw new Error("no such user");
const replyTo = await apiClient.fetchLatestCastForUser(user);
if (replyTo === undefined) throw new Error("no such user");

// post a reply
await apiClient.publishCast("Replying to your cast!", replyTo);
