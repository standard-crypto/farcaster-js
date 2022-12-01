import { MerkleAPIClient } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";

// init
const wallet = Wallet.fromMnemonic("twelve words here");
const apiClient = new MerkleAPIClient(wallet);

// fetch handle to a user
const user = await apiClient.lookupUserByUsername("dwr");
if (user === undefined) throw new Error("no such user");

// fetch user's casts
for await (const cast of apiClient.fetchCastsForUser(user)) {
  console.log(cast.text);
}
