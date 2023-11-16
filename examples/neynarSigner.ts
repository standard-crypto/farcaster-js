import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

const client = new NeynarAPIClient('apiKey');

const signerFid = 111; // fid of signer
const privateKey = 'your farcaster recovery phrase';
const deadline = Math.floor(Date.now() / 1000) + 86400; // one day from now - set longer if needed

// create signer
const registeredSigner = await client.v2.createAndRegisterSigner(
  signerFid,
  deadline,
  privateKey,
);

console.log('Open url the url below on a logged in ios device to approve signer');
console.log(`ios url: ${registeredSigner.signer_approval_url}`);
const registerSignerToken =
    registeredSigner.signer_approval_url?.split('=')[1];
console.log('If using an android device, use this url');
console.log(`android url: https://client.warpcast.com/deeplinks/signed-key-request?token=${registerSignerToken}`);
