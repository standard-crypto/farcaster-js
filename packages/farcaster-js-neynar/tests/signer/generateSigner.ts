import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { expectDefinedNonNull } from '../utils';
import { Logger, silentLogger } from '../../src/logger';
import {
  Signer,
} from '../../src/v2';
import { NeynarAPIClient, generateSignature } from '../../src/';
import * as dotenv from 'dotenv';

chai.use(chaiAsPromised);

// load environment from .env
dotenv.config();

const privateKey = process.env.SIGNER_USER_MNEMONIC;
const apiKey = process.env.INTEGRATION_TEST_NEYNAR_API_KEY;

const testLogger: Logger = {
  info: silentLogger.info,
  debug: silentLogger.debug,
  trace: silentLogger.trace,
  warn: silentLogger.warn,

  /* eslint-disable no-console */
  error: console.error,
  /* eslint-enable no-console */
};

const userBotFid = 6365; // @gavi-bot

if (apiKey !== undefined && apiKey !== '') {
  describe('NeynarAPI', function() {
    this.timeout('30000');

    let client: NeynarAPIClient;

    before('create client', async function() {
      client = new NeynarAPIClient(apiKey, { logger: testLogger });
    });

    if (privateKey !== undefined && privateKey !== '') {
      describe('Create/Register a signer for testing', function() {
        let signature: string;
        let signer: Signer;
        const deadline = Math.floor(Date.now() / 1000) + 86400;
        it('can create a signer', async function() {
          signer = await client.clients.v2.createSigner();
          expectDefinedNonNull(signer);
        });
        it('can generate a signature', async function() {
          signature = await generateSignature(
            signer.public_key,
            userBotFid,
            privateKey,
            deadline,
          );
          expectDefinedNonNull(signature);
        });
        it('can register a signer', async function() {
          const registeredSigner = await client.clients.v2.registerSigner(
            signer.signer_uuid,
            userBotFid,
            deadline,
            signature,
          );
          expectDefinedNonNull(registeredSigner);
          expectDefinedNonNull(registeredSigner.signer_approval_url);
          expect(registeredSigner.signer_uuid).to.be.eq(signer.signer_uuid);
          expect(registeredSigner.public_key).to.be.eq(signer.public_key);
          // eslint-disable-next-line no-console
          console.log(
            `Set env var INTEGRATION_TEST_NEYNAR_SIGNER_UUID=${registeredSigner.signer_uuid}`,
          );
          // eslint-disable-next-line no-console
          console.log(
            `Set env var INTEGRATION_TEST_NEYNAR_SIGNER_PUBLIC_KEY=${registeredSigner.public_key}`,
          );
          // eslint-disable-next-line no-console
          console.log(
            `Open url ${registeredSigner.signer_approval_url} on a logged in ios device to approve signer`,
          );
          const androidUrl =
            'https://client.warpcast.com/deeplinks/signed-key-request?token=' +
            registeredSigner.signer_approval_url.split('=')[1];
          // eslint-disable-next-line no-console
          console.log(`If using an android device, use url ${androidUrl}`);
        });
      });
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        'Skipping NeynarAPI Signer generation. Env vars SIGNER_USER_MNEMONIC is unset.',
      );
    }
  });
} else {
  // eslint-disable-next-line no-console
  console.warn(
    'Skipping NeynarAPI Signer generation. Env var INTEGRATION_TEST_NEYNAR_API_KEY is unset.',
  );
}
