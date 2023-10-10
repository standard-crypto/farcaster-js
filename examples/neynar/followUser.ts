import { NeynarAPIClient } from "@standard-crypto/farcaster-js";

// init
const apiKey = "NeynarAPIKey";
const signerUuid = "signerUUID";
const apiClient = new NeynarAPIClient(apiKey);
const user = await apiClient.lookupUserByUsername("dwr");
if (user === undefined) throw new Error("no such user");

// follow an existing user
await apiClient.followUser(signerUuid, user);
