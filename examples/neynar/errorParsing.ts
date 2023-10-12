import { NeynarAPIClient } from "@standard-crypto/farcaster-js/neynarAPI";
import { NeynarV2APIClient } from "../neynarAPI/neynarV2API";

// init
const apiKey = "NeynarAPIKey";
const signerUuid = "signerUUID";
const apiClient = new NeynarAPIClient(apiKey);

// parse an error response from the API server
try {
  await apiClient.clients.v2.deleteCast(signerUuid, "SomeInvalidCastHash");
} catch (error) {
  if (NeynarV2APIClient.isApiErrorResponse(error)) {
    const apiError = error.response.data;
    console.log(`API Error: ${apiError.message}`);
    console.log(`Status code: ${error.response.status}`);
  }
}
