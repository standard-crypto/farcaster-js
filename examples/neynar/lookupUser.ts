import { NeynarAPIClient } from "@standard-crypto/farcaster-js/neynarAPI";

const apiKey = "NeynarAPIKey";
const client = new NeynarAPIClient(apiKey);

// by farcaster ID ('fid')
await client.clients.v1.lookupUserByFid(3);

// by username
await client.clients.v1.lookupUserByUsername("dwr");
