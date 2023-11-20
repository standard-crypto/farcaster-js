/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NeynarAPIClient, waitForNeynarSignerApproval } from '../src/index.js';
import QRCode from 'qrcode';

async function generateSigner(
  apiKey: string,
  developerMnemonic: string,
): Promise<void> {
  const client = new NeynarAPIClient(apiKey);

  // default deadline is 24 hours from now
  // const deadline = Math.floor(Date.now() / 1000) + 86400;

  // create signer
  const signer = await client.v2.createSigner(
    developerMnemonic,
    // deadline,
  );
  console.log('Scan the QR code below on a logged in device to approve signer');
  console.log(await QRCode.toString(signer.signer_approval_url ?? '', { type: 'terminal', small: true }));
  console.log(`url: ${signer.signer_approval_url}`);
  console.log('Once approved, you can start using your signer to write data to Farcaster');
  console.log(`signer uuid: ${signer.signer_uuid}`);
  console.log('waiting for signer to be approved...');
  await waitForNeynarSignerApproval(client, signer.signer_uuid);
}

const developerMnemonic = process.env.SIGNER_DEVELOPER_MNEMONIC;
const apiKey = process.env.INTEGRATION_TEST_NEYNAR_API_KEY;
const userBotFid = parseInt(
  process.env.INTEGRATION_TEST_NEYNAR_SIGNER_FID ?? '0',
);

if (
  apiKey !== undefined &&
  apiKey !== '' &&
  developerMnemonic !== undefined &&
  developerMnemonic !== '' &&
  userBotFid !== 0
) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  generateSigner(apiKey, developerMnemonic);
} else {
  console.warn(
    'Skipping NeynarAPI Signer generation. Env vars SIGNER_DEVELOPER_MNEMONIC and INTEGRATION_TEST_NEYNAR_API_KEY are required.',
  );
}
