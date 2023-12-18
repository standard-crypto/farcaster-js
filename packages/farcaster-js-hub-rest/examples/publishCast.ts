import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const signerPrivateKey = '0x...';
const fid = 111;
const client = new HubRestAPIClient({ hubUrl: 'https://hub.farcaster.standardcrypto.vc:2281' });

const publishCastResponse = await client.submitCast({ text: 'This is a test cast submitted from farcaster-js-hub-rest' }, fid, signerPrivateKey);
console.log(`new cast hash: ${publishCastResponse.hash}`);
