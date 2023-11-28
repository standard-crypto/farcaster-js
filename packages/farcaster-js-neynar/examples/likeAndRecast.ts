import { NeynarAPIClient, ReactionType } from '@standard-crypto/farcaster-js-neynar';

const signerUuid = 'approvedSignerUUID';
const client = new NeynarAPIClient('apiKey');

const existingCastHash = 'existingCastHash';
await client.v2.reactToCast(signerUuid, ReactionType.Like, existingCastHash); // Like Cast
await client.v2.reactToCast(signerUuid, ReactionType.Recast, existingCastHash); // Recast Cast
