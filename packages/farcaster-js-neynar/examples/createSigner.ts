import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

const client = new NeynarAPIClient('apiKey');

const signerFid = 111; // fid of signer
const privateKey = 'your farcaster recovery phrase';
// default deadline is 30 days - set longer if needed
// const deadline = Math.floor(Date.now() / 1000) + 30 * 86400;

// create signer
const signer = await client.v2.createAndRegisterSigner(
  signerFid,
  privateKey,
//   deadline,
);

console.log('Open url the url below on a logged in ios device to approve signer');
console.log(`ios url: ${signer.signer_approval_url}`);
const registerSignerToken =
signer.signer_approval_url?.split('=')[1];
console.log('If using an android device, use this url');
console.log(`android url: https://client.warpcast.com/deeplinks/signed-key-request?token=${registerSignerToken}`);
console.log('Once approved, you can start using your signer to write data to Farcaster');
console.log(`signer uuid: ${signer.signer_uuid}`);
