import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';

const client = new HubRestAPIClient();

const hubInfo = await client.getHubInfo();
console.log(hubInfo.nickname);

const hubInfoWithStats = await client.getHubInfo({ includeDbStats: true });
console.log(hubInfoWithStats.dbStats.numMessages);
