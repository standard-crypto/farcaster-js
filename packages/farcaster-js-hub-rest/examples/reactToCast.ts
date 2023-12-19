import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const signerPrivateKey = '0x...';
const fid = 111;
const targetFid = 6365;
const targetCastHash = '0x3dba25e25db088f1a981da2b65b00f6008faee06';
const client = new HubRestAPIClient({ hubUrl: 'https://hub.farcaster.standardcrypto.vc:2281' });

const reactToCastResponse = await client.submitReaction({ type: 'like', target: { fid: targetFid, hash: targetCastHash } }, fid, signerPrivateKey);
console.log(`reaction hash: ${reactToCastResponse.hash}`);
