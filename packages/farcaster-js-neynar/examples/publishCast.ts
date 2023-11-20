import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

const signerUuid = 'approvedSignerUUID';
const client = new NeynarAPIClient('apiKey');

const publishedCast = await client.v2.publishCast(signerUuid, 'This is a test cast.');

console.log(`New cast hash: ${publishedCast.hash}`);
