import { FarcasterEpochTimestamp, HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const client = new HubRestAPIClient();

const cast = await client.getCastById({
  fid: 2,
  hash: '0xd2b1ddc6c88e865a33cb1a565e0058d757042974',
});
if (cast === null) {
  throw new Error('Cast not found');
}

console.log(cast.data.castAddBody.text); // text
console.log(FarcasterEpochTimestamp.parse(cast.data.timestamp)); // timestamp
