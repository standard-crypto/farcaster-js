import { NeynarAPIClient } from "@standard-crypto/farcaster-js/neynarAPI";

// init
const apiKey = "NeynarAPIKey";
const apiClient = new NeynarAPIClient(apiKey);

// fetch handle to a user
const user = await apiClient.clients.v1.lookupUserByUsername("dwr");
if (user === null) throw new Error("no such user");

// fetch user's casts
for await (const cast of apiClient.clients.v1.fetchCastsForUser(user.fid)) {
  console.log(cast.text);
}
