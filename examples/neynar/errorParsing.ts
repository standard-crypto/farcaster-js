/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NeynarAPIClient, NeynarV2APIClient } from '@standard-crypto/farcaster-js-neynar';

// init
const apiKey = 'NeynarAPIKey';
const signerUuid = 'signerUUID';
const apiClient = new NeynarAPIClient(apiKey);

// parse an error response from the API server
try {
  await apiClient.clients.v2.deleteCast(signerUuid, 'SomeInvalidCastHash');
} catch (error) {
  if (NeynarV2APIClient.isApiErrorResponse(error)) {
    const apiError = error.response.data;
    console.log(`API Error: ${apiError.message}`);
    console.log(`Status code: ${error.response.status}`);
  }
}
