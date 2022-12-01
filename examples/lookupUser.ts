import { MerkleAPIClient } from "@standard-crypto/farcaster-js/merkleAPI";
import { Wallet } from "ethers";

const wallet = Wallet.fromMnemonic("twelve words here");
const client = new MerkleAPIClient(wallet);

// by farcaster ID ('fid')
await client.lookupUserByFid(3);

// by username
await client.lookupUserByUsername("dwr");
