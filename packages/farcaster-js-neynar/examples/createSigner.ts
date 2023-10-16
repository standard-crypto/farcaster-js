import { generateSignature, NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

const client = new NeynarAPIClient('apiKey');

const signerFid = 111; // fid of signer
const privateKey = 'mnemonic for signer';
const deadline = Math.floor(Date.now() / 1000) + 86400; // one day from now

const signer = await client.v2.createSigner();

const signature = await generateSignature(signer.public_key, signerFid, privateKey, deadline);

const registeredSigner = await client.v2.registerSigner(signer.signer_uuid, signerFid, deadline, signature);

console.log(
    `Open url ${registeredSigner.signer_approval_url} on a logged in ios device to approve signer`,
);
const registerSignerToken =
    registeredSigner.signer_approval_url?.split('=')[1];
console.log(
    `If using an android device, use url https://client.warpcast.com/deeplinks/signed-key-request?token=${registerSignerToken}`,
);
