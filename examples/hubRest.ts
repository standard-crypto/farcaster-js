import { HubRestAPIClient } from '@standard-crypto/farcaster-js';

const client = new HubRestAPIClient();
console.log(await client.getHubInfo());

const signerPrivateKey = '0x...';
const fid = 111;
const writeClient = new HubRestAPIClient({ hubUrl: 'https://hub.farcaster.standardcrypto.vc:2281' });

const publishCastResponse = await writeClient.submitCast({ text: 'This is a test cast submitted from farcaster-js-hub-rest' }, fid, signerPrivateKey);
console.log(`new cast hash: ${publishCastResponse?.hash}`);
