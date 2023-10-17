import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

const signerUuid = 'approvedSignerUUID';
const client = new NeynarAPIClient('apiKey');

const userToFollowFid = 13525;
await client.v2.followUsers(signerUuid, [userToFollowFid]);
