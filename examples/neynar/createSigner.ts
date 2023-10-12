/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  NeynarAPIClient,
  generateSignature,
} from "@standard-crypto/farcaster-js/neynarAPI";

// init
const apiKey = "NeynarAPIKey";
const apiClient = new NeynarAPIClient(apiKey);

// signer params
const publicKey = "publicKeyForSignerAccount";
const fid = 123;
const privateKey = "accountMnemonic";

const deadline = Math.floor(Date.now() / 1000) + 86400;
const signer = await apiClient.clients.v2.createSigner();
const signature = await generateSignature(publicKey, fid, privateKey, deadline);
const registeredSigner = await apiClient.clients.v2.registerSigner(
  signer.signer_uuid,
  fid,
  deadline,
  signature
);
console.log(
  `Approve Signer iOS deeplink: ${registeredSigner.signer_approval_url}`
);
console.log(
  "Update url to format https://client.warpcast.com/deeplinks/signed-key-request?token=0x1234 on android"
);
console.log(`Signer Status: ${registeredSigner.status}`);
