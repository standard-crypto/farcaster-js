import { MerkleAPIClient } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

// init
const wallet = Wallet.fromMnemonic("twelve words here");
const apiClient = new MerkleAPIClient(wallet);
const user = await apiClient.lookupUserByUsername("dwr");
if (user === undefined) throw new Error("no such user");

// follow an existing user
await apiClient.followUser(user);
