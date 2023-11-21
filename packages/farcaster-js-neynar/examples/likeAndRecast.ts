import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

const signerUuid = 'approvedSignerUUID';
const client = new NeynarAPIClient('apiKey');

const existingCastHash = 'existingCastHash';
await client.v2.reactToCast(signerUuid, 'like', existingCastHash); // Like Cast
await client.v2.reactToCast(signerUuid, 'recast', existingCastHash); // Recast Cast
