/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NeynarAPIClient, generateSignature } from '../src/';
// import { NeynarAPIClient, generateSignature } from '@standard-crypto/farcaster-js-neynar';

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
  const client = new NeynarAPIClient(apiKey);

  // one day from now
  const deadline = Math.floor(Date.now() / 1000) + 86400;

  // create signer
  const signer = await client.v2.createSigner();

  // create signature
  const signature = await generateSignature(
    signer.public_key,
    userBotFid,
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
    `Set env var INTEGRATION_TEST_NEYNAR_SIGNER_UUID=${registeredSigner.signer_uuid}`,
  );
  console.log(
    `Set env var INTEGRATION_TEST_NEYNAR_SIGNER_PUBLIC_KEY=${registeredSigner.public_key}`,
  );
  console.log(
    `Open url ${registeredSigner.signer_approval_url} on a logged in ios device to approve signer`,
  );
  const registerSignerToken =
    registeredSigner.signer_approval_url?.split('=')[1];
  console.log(
    `If using an android device, use url https://client.warpcast.com/deeplinks/signed-key-request?token=${registerSignerToken}`,
  );
} else {
  console.warn(
    'Skipping NeynarAPI Signer generation. Env vars SIGNER_USER_MNEMONIC, INTEGRATION_TEST_NEYNAR_API_KEY and INTEGRATION_TEST_NEYNAR_SIGNER_FID are required.',
  );
}
