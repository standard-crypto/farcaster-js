import { HubRestAPIClient, ExternalEd25519Signer } from '@standard-crypto/farcaster-js';

const client = new HubRestAPIClient();
console.log(await client.getHubInfo());

// Use a private key
const signerPrivateKey = '0x...';
const fid = 111;
const writeClient = new HubRestAPIClient({ hubUrl: 'https://hub.farcaster.standardcrypto.vc:2281' });

const publishCastResponse = await writeClient.submitCast({ text: 'This is a test cast submitted from farcaster-js' }, fid, signerPrivateKey);
console.log(`new cast hash: ${publishCastResponse.hash}`);

// Use an external signer
import { NobleEd25519Signer } from '@farcaster/core';

const nobleSigner = new NobleEd25519Signer(new Uint8Array([]));
const _signMessage = async (messageHash: Uint8Array) => {
    return nobleSigner.signMessageHash(messageHash);
}
const _getPublicKey = async () => {
    return nobleSigner.getSignerKey();
}
const externalSigner = new ExternalEd25519Signer(_signMessage, _getPublicKey);

const publishCastExternalSignerResponse = await writeClient.submitCast({ text: 'This is a test cast submitted from farcaster-js using an external signer' }, fid, externalSigner);
console.log(`new cast hash with external signer: ${publishCastExternalSignerResponse.hash}`);
