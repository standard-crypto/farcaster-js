import { NeynarAPIClient } from "@standard-crypto/farcaster-js/neynarAPI";

// init
const apiKey = "NeynarAPIKey";
const signerUuid = "signerUUID";
const apiClient = new NeynarAPIClient(apiKey);
const user = await apiClient.clients.v1.lookupUserByUsername("dwr");
if (user === null) throw new Error("no such user");

// follow an existing user
await apiClient.clients.v2.followUsers(signerUuid, [user.fid]);
