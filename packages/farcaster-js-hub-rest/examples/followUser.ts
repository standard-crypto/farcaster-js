import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const signerPrivateKey = '0x...';
const fid = 111;
const targetFid = 6365;
const client = new HubRestAPIClient({ hubUrl: 'https://hub.farcaster.standardcrypto.vc:2281' });

const followResponse = await client.followUser(targetFid, fid, signerPrivateKey);
console.log(`follow hash: ${followResponse.hash}`);
