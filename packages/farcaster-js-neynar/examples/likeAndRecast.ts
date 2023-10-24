import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';
import { ReactionType } from '@standard-crypto/farcaster-js-neynar/v2';

const signerUuid = 'approvedSignerUUID';
const client = new NeynarAPIClient('apiKey');

const existingCastHash = 'existingCastHash';
await client.v2.reactToCast(signerUuid, ReactionType.Like, existingCastHash); // Like Cast
await client.v2.reactToCast(signerUuid, ReactionType.Recast, existingCastHash); // Recast Cast
