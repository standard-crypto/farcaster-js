import { NeynarAPIClient } from "@standard-crypto/farcaster-js";

// init
const apiKey = "NeynarAPIKey";
const signerUuid = "signerUUID";
const apiClient = new NeynarAPIClient(apiKey);

// parse an error response from the API server
try {
  await apiClient.deleteCast(signerUuid, "SomeInvalidCastHash");
} catch (error) {
  if (NeynarAPIClient.isApiErrorResponse(error)) {
    const apiError = error.response.data;
    console.log(`API Error: ${apiError.message}`);
    console.log(`Status code: ${error.response.status}`);
  }
}
