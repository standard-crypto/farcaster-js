import { HubRestAPIClient, ExternalEd25519Signer } from '@standard-crypto/farcaster-js';

// Use an external signer
import { NobleEd25519Signer } from '@farcaster/core';

const client = new HubRestAPIClient();
console.log(await client.getHubInfo());

// Use a private key
const signerPrivateKey = '0x...';
const fid = 111;
const writeClient = new HubRestAPIClient({ hubUrl: 'https://hub.farcaster.standardcrypto.vc:2281' });

const publishCastResponse = await writeClient.submitCast({ text: 'This is a test cast submitted from farcaster-js' }, fid, signerPrivateKey);
console.log(`new cast hash: ${publishCastResponse.hash}`);

const nobleSigner = new NobleEd25519Signer(new Uint8Array([]));
const externalSigner = new ExternalEd25519Signer(async(messageHash: Uint8Array) => {
  return await nobleSigner.signMessageHash(messageHash);
}, async() => {
  return await nobleSigner.getSignerKey();
});

const publishCastExternalSignerResponse = await writeClient.submitCast({ text: 'This is a test cast submitted from farcaster-js using an external signer' }, fid, externalSigner);
console.log(`new cast hash with external signer: ${publishCastExternalSignerResponse.hash}`);
