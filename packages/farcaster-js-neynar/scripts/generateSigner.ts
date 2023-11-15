/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NeynarAPIClient, generateSignature } from '../src/index.js';

async function generateSigner(
  apiKey: string,
  privateKey: string,
  signerFid: number,
): Promise<void> {
  const client = new NeynarAPIClient(apiKey);

  // one day from now
  const deadline = Math.floor(Date.now() / 1000) + 86400;

  // create signer
  const signer = await client.v2.createSigner();

  // create signature
  const signature = await generateSignature(
    signer.public_key,
    signerFid,
    privateKey,
    deadline,
  );

  // register signer
  const registeredSigner = await client.v2.registerSigner(
    signer.signer_uuid,
    userBotFid,
    deadline,
    signature,
  );

  console.log(
    `Open url ${registeredSigner.signer_approval_url} on a logged in ios device to approve signer`,
  );
  const registerSignerToken =
    registeredSigner.signer_approval_url?.split('=')[1];
  console.log(
    `If using an android device, use url https://client.warpcast.com/deeplinks/signed-key-request?token=${registerSignerToken}`,
  );
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
