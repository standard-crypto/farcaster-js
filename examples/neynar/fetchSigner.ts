/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NeynarAPIClient } from "@standard-crypto/farcaster-js";

// init
const apiKey = "NeynarAPIKey";
const signerUuid = "signerUUID";
const apiClient = new NeynarAPIClient(apiKey);

const signer = await apiClient.clients.v2.fetchSigner(signerUuid);
console.log(`Signer: ${signer}`);
