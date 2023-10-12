import { NeynarAPIClient } from "@standard-crypto/farcaster-js";

// init
const apiKey = "NeynarAPIKey";
const signerUuid = "signerUUID";
const apiClient = new NeynarAPIClient(apiKey);

const cast = await apiClient.clients.v2.publishCast(
  signerUuid,
  "Hello, Farcaster!"
);

console.log(`New cast hash: ${cast.hash}`);
