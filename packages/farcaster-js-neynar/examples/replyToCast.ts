import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

const signerUuid = 'approvedSignerUUID';
const client = new NeynarAPIClient('apiKey');

const existingCastHash = 'existingCastHash';
const publishedCast = await client.v2.publishCast(signerUuid, 'This is a reply cast.', { replyTo: existingCastHash });

console.log(`Reply hash:${publishedCast.hash}`);
