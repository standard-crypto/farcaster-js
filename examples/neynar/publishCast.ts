import { NeynarAPIClient } from "@standard-crypto/farcaster-js";

// init
const apiKey = "NeynarAPIKey";
const signerUuid = "signerUUID";
const apiClient = new NeynarAPIClient(apiKey);

const cast = await apiClient.publishCast(signerUuid, "Hellow, Farcaster!");

console.log(`New cast hash: ${cast.hash}`);
