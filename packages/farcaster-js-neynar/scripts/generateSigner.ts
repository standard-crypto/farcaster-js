/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NeynarAPIClient } from '../src/index.js';

async function generateSigner(
  apiKey: string,
  privateKey: string,
  signerFid: number,
): Promise<void> {
  const client = new NeynarAPIClient(apiKey);

  // default deadline is 30 day from now
  // const deadline = Math.floor(Date.now() / 1000) + 30 * 86400;

  // create signer
  const signer = await client.v2.createAndRegisterSigner(
    signerFid,
    privateKey,
    // deadline,
  );

  console.log('Open url the url below on a logged in ios device to approve signer');
  console.log(`ios url: ${signer.signer_approval_url}`);
  const registerSignerToken =
  signer.signer_approval_url?.split('=')[1];
  console.log('If using an android device, use this url');
  console.log(`android url: https://client.warpcast.com/deeplinks/signed-key-request?token=${registerSignerToken}`);
  console.log('Once approved, you can start using your signer to write data to Farcaster');
  console.log(`signer uuid: ${signer.signer_uuid}`);
}

const privateKey = process.env.SIGNER_USER_MNEMONIC;
const apiKey = process.env.INTEGRATION_TEST_NEYNAR_API_KEY;
const userBotFid = parseInt(
  process.env.INTEGRATION_TEST_NEYNAR_SIGNER_FID ?? '0',
);

if (
  apiKey !== undefined &&
  apiKey !== '' &&
  privateKey !== undefined &&
  privateKey !== '' &&
  userBotFid !== 0
) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  generateSigner(apiKey, privateKey, userBotFid);
} else {
  console.warn(
    'Skipping NeynarAPI Signer generation. Env vars SIGNER_USER_MNEMONIC, INTEGRATION_TEST_NEYNAR_API_KEY and INTEGRATION_TEST_NEYNAR_SIGNER_FID are required.',
  );
}
