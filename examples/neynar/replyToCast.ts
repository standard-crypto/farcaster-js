import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

// init
const apiKey = 'NeynarAPIKey';
const signerUuid = 'signerUUID';
const apiClient = new NeynarAPIClient(apiKey);

// post a reply
const castHash = '0xd02442da75c1a09c0b0a735f9d6fdfb0db287d89';
await apiClient.clients.v2.publishCast(signerUuid, 'Replying to your cast!', {
  replyTo: castHash,
});
