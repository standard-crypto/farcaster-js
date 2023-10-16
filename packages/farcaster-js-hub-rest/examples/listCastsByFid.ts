import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const client = new HubRestAPIClient();

const casts = client.listCastsByFid(2);
for await (const cast of casts) {
  console.log(cast.data.castAddBody.text);
}
