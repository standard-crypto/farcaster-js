import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const client = new HubRestAPIClient({ hubUrl: 'https://hub.farcaster.standardcrypto.vc:2281' });
console.log(await client.getHubInfo());
