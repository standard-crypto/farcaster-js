import { NeynarAPIClient } from "@standard-crypto/farcaster-js";

// init
const apiKey = "NeynarAPIKey";
const apiClient = new NeynarAPIClient(apiKey);

// fetch handle to a user
const user = await apiClient.lookupUserByUsername("dwr");
if (user === undefined) throw new Error("no such user");

// fetch user's casts
for await (const cast of apiClient.fetchCastsForUser(user)) {
  console.log(cast.text);
}
