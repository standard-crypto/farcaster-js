import { NeynarAPIClient, waitForNeynarSignerApproval } from '@standard-crypto/farcaster-js-neynar';
import QRCode from 'qrcode';

const client = new NeynarAPIClient('apiKey');

const developerMnemonic = 'your farcaster recovery phrase';

// create signer
const signer = await client.v2.createSigner(
  developerMnemonic,
);

console.log('Scan the QR code below on a logged in device to approve signer');
console.log(await QRCode.toString(signer.signer_approval_url ?? '', { type: 'terminal', small: true }));
console.log(`url: ${signer.signer_approval_url}`);
console.log('Once approved, you can start using your signer to write data to Farcaster');
console.log(`signer uuid: ${signer.signer_uuid}`);
console.log('waiting for signer to be approved...');
await waitForNeynarSignerApproval(client, signer.signer_uuid);
