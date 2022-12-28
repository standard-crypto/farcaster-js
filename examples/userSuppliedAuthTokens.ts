import { MerkleAPIClient } from "@standard-crypto/farcaster-js";

// use an auth token provided directly by a user
const apiClient = new MerkleAPIClient({
  secret: "MK-abc123...",
  expiresAt: 12345678900000, // optional
});

// lookup that user
const user = await apiClient.fetchCurrentUser();
console.log(user.displayName);
