import { NeynarAPIClient, NeynarV2 } from '@standard-crypto/farcaster-js';

const signerUuid = 'approvedSignerUUID';
const client = new NeynarAPIClient('apiKey');

// Publish cast
const cast = await client.v2.publishCast(signerUuid, 'This is a test cast.');

// React to cast
await client.v2.reactToCast(signerUuid, NeynarV2.ReactionType.Like, cast.hash);
