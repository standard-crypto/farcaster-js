import { MerkleAPIClient } from "@standard-crypto/farcaster-js/merkleAPI";
import { Wallet } from "ethers";

// TODO: by username
// await userRegistry.lookupByUsername("dwr");

const wallet = Wallet.fromMnemonic("twelve words here");

const client = new MerkleAPIClient(wallet);

// by farcaster ID ('fid')
await client.lookupUserByFid(69);
