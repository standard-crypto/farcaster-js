import { NeynarAPIClient } from "@standard-crypto/farcaster-js";

const apiKey = "NeynarAPIKey";
const client = new NeynarAPIClient(apiKey);

// by farcaster ID ('fid')
await client.lookupUserByFid(3);

// by username
await client.lookupUserByUsername("dwr");
