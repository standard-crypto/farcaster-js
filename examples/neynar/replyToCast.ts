import { NeynarAPIClient } from "@standard-crypto/farcaster-js";

// init
const apiKey = "NeynarAPIKey";
const signerUuid = "signerUUID";
const apiClient = new NeynarAPIClient(apiKey);

// fetch cast to reply to
const user = await apiClient.lookupUserByUsername("dwr");
if (user === null) throw new Error("no such user");
const replyTo = await apiClient.fetchLatestCastForUser(user.fid);
if (replyTo === null) throw new Error("no such user");

// post a reply
await apiClient.publishCast(signerUuid, "Replying to your cast!", replyTo.hash);
