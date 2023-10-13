import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import OpenAPIResponseValidator from 'openapi-response-validator';
import { promises as fs } from 'fs';
import yaml from 'yaml';
import type { OpenAPIV3 } from 'openapi-types'; // cspell:disable-line
import type { OverrideProperties } from 'type-fest';

import { HubRestAPIClient } from '../../src';
import { Logger, silentLogger } from '../../src/logger';
import { expectDefinedNonNull } from '../utils';
import {
  GetUserDataByFid200ResponseOneOf,
  HubEvent,
  LinkType,
  ListOnChainSignersByFid200ResponseOneOf,
  OnChainEventType,
  ReactionType,
  UserDataType,
} from '../../src/openapi';
import type { paths as SchemaPaths } from '../../src/openapi/generated/schema';

chai.use(chaiAsPromised);

const userGaviFid = 69; // @gavi

const testLogger: Logger = {
  info: silentLogger.info,
  debug: silentLogger.debug,
  trace: silentLogger.trace,
  warn: silentLogger.warn,

  /* eslint-disable no-console */
  error: console.error,
  /* eslint-enable no-console */
};

describe('HubWebClient', function() {
  let client: HubRestAPIClient;
  let apiSpec: OverrideProperties<OpenAPIV3.Document, { paths: SchemaPaths }>; // cspell:disable-line

  before('setup', async function() {
    client = new HubRestAPIClient({
      server: 'http://nemes.farcaster.xyz:2281',
      logger: testLogger,
    });

    const apiSpecYaml = await fs.readFile(
      './src/openapi/spec.yaml',
      'utf8',
    );
    apiSpec = yaml.parse(apiSpecYaml);
  });

  describe('Info API', function() {
    it('validates against OpenAPI spec', async function() {
      const info = await client.apis.info.getInfo({ dbstats: true });
      const validator = new OpenAPIResponseValidator({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        responses: apiSpec.paths['/v1/info'].get.responses as any,
        components: apiSpec.components,
      });
      const errors = validator.validateResponse(200, info.data);
      expect(errors, JSON.stringify(errors)).is.undefined;
    });

    it('can fetch info with/without dbstats', async function() {
      const withDbStats = await client.getHubInfo({ includeDbStats: true });
      const withoutDbStats = await client.getHubInfo({ includeDbStats: false });
      expect(withDbStats.dbStats).to.not.be.undefined;
      expect(withoutDbStats.dbStats).to.be.undefined;
    });
  });

  describe('Casts API', function() {
    describe('#getCastById', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.casts.getCastById({
          fid: 2,
          hash: '0xd2b1ddc6c88e865a33cb1a565e0058d757042974',
        });
        const validator = new OpenAPIResponseValidator({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          responses: apiSpec.paths['/v1/castById'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('can fetch an existing cast', async function() {
        const cast = await client.getCastById({
          fid: 2,
          hash: '0xd2b1ddc6c88e865a33cb1a565e0058d757042974',
        });
        expectDefinedNonNull(cast);
      });

      it('returns null for nonexistent cast', async function() {
        const cast = await client.getCastById({
          fid: 2,
          hash: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        });
        expect(cast).to.be.null;
      });
    });

    describe('#listCastsByFid', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.casts.listCastsByFid({
          fid: userGaviFid,
        });
        expect(response.data.messages).to.not.be.empty;
        const validator = new OpenAPIResponseValidator({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          responses: apiSpec.paths['/v1/castsByFid'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('can paginate', async function() {
        const pageSize = 1;
        const castHashesSeen = new Set<string>();

        let castCount = 0;
        for await (const cast of client.listCastsByFid(userGaviFid, {
          pageSize,
        })) {
          expect(castHashesSeen).to.not.contain(cast.hash);
          castHashesSeen.add(cast.hash);

          castCount++;
          if (castCount > pageSize) {
            break;
          }
        }
        expect(castCount).to.be.greaterThan(pageSize);
      });

      it('handles end of pagination correctly', async function() {
        let castCount = 0;
        for await (const _ of client.listCastsByFid(userGaviFid)) {
          castCount++;
        }
        expect(castCount > 0);
      });
    });

    describe('#listCastsByParent', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.casts.listCastsByParent({
          fid: 226,
          hash: '0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9',
        });
        expect(response.data.messages).to.not.be.empty;
        const validator = new OpenAPIResponseValidator({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          responses: apiSpec.paths['/v1/castsByParent'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('can fetch by parent Cast ID', async function() {
        const pageSize = 1;
        const casts = client.listCastsByParent(
          { fid: 226, hash: '0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9' },
          {
            pageSize,
          },
        );
        const cast = await casts.next();
        expectDefinedNonNull(cast.value);
      });

      it('can fetch by parent URL', async function() {
        const pageSize = 1;
        const casts = client.listCastsByParent(
          {
            url: 'chain://eip155:1/erc721:0x39d89b649ffa044383333d297e325d42d31329b2',
          },
          {
            pageSize,
          },
        );
        const cast = await casts.next();
        expectDefinedNonNull(cast.value);
      });
    });

    describe('#listCastsByMention', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.casts.listCastsByMention({
          fid: 6833,
        });
        expect(response.data.messages).to.not.be.empty;
        const validator = new OpenAPIResponseValidator({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          responses: apiSpec.paths['/v1/castsByMention'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('can fetch a cast by mention', async function() {
        const pageSize = 1;
        const casts = client.listCastsByMention(6833, {
          pageSize,
        });
        const cast = await casts.next();
        expectDefinedNonNull(cast.value);
      });
    });
  });

  describe('Reactions API', function() {
    describe('#getReactionById', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.reactions.getReactionById({
          fid: 2,
          targetFid: 1795,
          targetHash: '0x7363f449bfb0e7f01c5a1cc0054768ed5146abc0',
          reactionType: ReactionType.Like,
        });
        const validator = new OpenAPIResponseValidator({
          components: apiSpec.components,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          responses: apiSpec.paths['/v1/reactionById'].get.responses as any,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('can fetch an existing reaction', async function() {
        const reaction = await client.getReactionById({
          fid: 2,
          targetFid: 1795,
          targetHash: '0x7363f449bfb0e7f01c5a1cc0054768ed5146abc0',
          reactionType: ReactionType.Like,
        });
        expectDefinedNonNull(reaction);
      });

      it('returns null for nonexistent cast', async function() {
        const reaction = await client.getReactionById({
          fid: 1,
          targetFid: 2,
          targetHash: '0x0000000000000000000000000000000000000000',
          reactionType: ReactionType.Like,
        });
        expect(reaction).to.be.null;
      });
    });

    describe('#listReactionsByFid', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.reactions.listReactionsByFid({
          fid: 2,
          reactionType: ReactionType.Like,
        });
        expect(response.data.messages).to.not.be.empty;
        const validator = new OpenAPIResponseValidator({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          responses: apiSpec.paths['/v1/reactionsByFid'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('can fetch multiple reactions by FID', async function() {
        const pageSize = 1;
        const reactions = client.listReactionsByFid(2, ReactionType.Like, {
          pageSize,
        });
        const reactionOne = await reactions.next();
        const reactionTwo = await reactions.next();
        expectDefinedNonNull(reactionOne.value);
        expectDefinedNonNull(reactionTwo.value);
        expect(reactionOne.value?.hash).to.not.eq(reactionTwo.value?.hash);
      });
    });

    describe('#listReactionsByCast', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.reactions.listReactionsByCast({
          targetFid: 1795,
          targetHash: '0x7363f449bfb0e7f01c5a1cc0054768ed5146abc0',
          reactionType: ReactionType.Like,
        });
        expect(response.data.messages).to.not.be.empty;
        const validator = new OpenAPIResponseValidator({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          responses: apiSpec.paths['/v1/reactionsByCast'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('can fetch multiple reactions by cast', async function() {
        const pageSize = 1;
        const reactions = client.listReactionsByCast(
          1795,
          '0x7363f449bfb0e7f01c5a1cc0054768ed5146abc0',
          ReactionType.Like,
          {
            pageSize,
          },
        );
        const reactionOne = await reactions.next();
        const reactionTwo = await reactions.next();
        expectDefinedNonNull(reactionOne.value);
        expectDefinedNonNull(reactionTwo.value);
        expect(reactionOne.value?.hash).to.not.eq(reactionTwo.value?.hash);
      });
    });

    describe('#listReactionsByTarget', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.reactions.listReactionsByTarget({
          url: 'chain://eip155:1/erc721:0x39d89b649ffa044383333d297e325d42d31329b2',
          reactionType: ReactionType.Like,
        });
        expect(response.data.messages).to.not.be.empty;
        const validator = new OpenAPIResponseValidator({
          responses:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            apiSpec.paths['/v1/reactionsByTarget'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('can fetch multiple reactions by cast', async function() {
        const pageSize = 1;
        const reactions = client.listReactionsByTarget(
          'chain://eip155:1/erc721:0x39d89b649ffa044383333d297e325d42d31329b2',
          ReactionType.Like,
          {
            pageSize,
          },
        );
        const reactionOne = await reactions.next();
        const reactionTwo = await reactions.next();
        expectDefinedNonNull(reactionOne.value);
        expectDefinedNonNull(reactionTwo.value);
        expect(reactionOne.value?.hash).to.not.eq(reactionTwo.value?.hash);
      });
    });
  });

  describe('Links API', function() {
    describe('#getLinkById', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.links.getLinkById({
          fid: 6833,
          targetFid: 2,
          linkType: LinkType.Follow,
        });
        const validator = new OpenAPIResponseValidator({
          components: apiSpec.components,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          responses: apiSpec.paths['/v1/linkById'].get.responses as any,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('can fetch an existing link', async function() {
        const link = await client.getLinkById(6833, 2);
        expectDefinedNonNull(link);
      });

      it('returns null for nonexistent link', async function() {
        const link = await client.getLinkById(userGaviFid, 6833);
        expect(link).to.be.null;
      });
    });

    describe('#listLinksByFid', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.links.listLinksByFid({
          fid: 6833,
        });
        expect(response.data.messages).to.not.be.empty;
        const validator = new OpenAPIResponseValidator({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          responses: apiSpec.paths['/v1/linksByFid'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('can fetch a link by ID', async function() {
        const pageSize = 1;
        const links = client.listLinksByFid(6833, {
          pageSize,
        });
        const link = await links.next();
        expectDefinedNonNull(link.value);
      });
    });

    describe('#listLinksByTargetFid', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.links.listLinksByTargetFid({
          targetFid: 6833,
        });
        expect(response.data.messages).to.not.be.empty;
        const validator = new OpenAPIResponseValidator({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          responses: apiSpec.paths['/v1/linksByTargetFid'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('can fetch a link by target ID', async function() {
        const pageSize = 1;
        const links = client.listLinksByTargetFid(6833, {
          pageSize,
        });
        const link = await links.next();
        expectDefinedNonNull(link.value);
      });
    });
  });

  describe('UserData API', function() {
    describe('#getSpecificUserDataByFid', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.userData.getUserDataByFid({
          fid: 6833,
          userDataType: UserDataType.Username,
        });
        const validator = new OpenAPIResponseValidator({
          components: apiSpec.components,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          responses: apiSpec.paths['/v1/userDataByFid'].get.responses as any,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('filters on user data type', async function() {
        const userDataUsername = await client.getSpecificUserDataByFid(
          6833,
          UserDataType.Username,
        );
        expectDefinedNonNull(userDataUsername);
        expect(userDataUsername.data.userDataBody.type).eq(
          UserDataType.Username,
        );

        const userDataPfp = await client.getSpecificUserDataByFid(
          6833,
          UserDataType.Pfp,
        );
        expectDefinedNonNull(userDataPfp);
        expect(userDataPfp.data.userDataBody.type).eq(UserDataType.Pfp);
      });

      it('returns null for nonexistent user data', async function() {
        const userData = await client.getSpecificUserDataByFid(
          userGaviFid,
          UserDataType.Url,
        );
        expect(userData).to.be.null;
      });
    });

    describe('#listAllUserDataByFid', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.userData.getUserDataByFid({
          fid: 6833,
        });
        expect((response.data as GetUserDataByFid200ResponseOneOf).messages).to
          .not.be.empty;
        const validator = new OpenAPIResponseValidator({
          components: apiSpec.components,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          responses: apiSpec.paths['/v1/userDataByFid'].get.responses as any,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('can fetch existing user data', async function() {
        const pageSize = 1;
        const userData = client.listAllUserDataByFid(6833, { pageSize });
        const singleData = await userData.next();
        expectDefinedNonNull(singleData);
      });

      it('returns empty list for nonexistent FID', async function() {
        const userData = client.listAllUserDataByFid(4294967295);
        const iter = await userData.next();
        expect(iter.done).to.be.true;
        expect(iter.value).to.be.undefined;
      });
    });
  });

  describe('FIDs API', function() {
    describe('#listFids', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.fids.listFids();
        expect(response.data.fids).to.not.be.empty;
        const validator = new OpenAPIResponseValidator({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          responses: apiSpec.paths['/v1/fids'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('can fetch some FIDs', async function() {
        const pageSize = 1;
        const fids = client.listFids({
          pageSize,
        });
        const fidOne = await fids.next();
        const fidTwo = await fids.next();
        expectDefinedNonNull(fidOne.value);
        expectDefinedNonNull(fidTwo.value);
      });
    });
  });

  describe('Storage API', function() {
    describe('#getStorageLimitsByFid', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.storage.getStorageLimitsByFid({
          fid: 6833,
        });
        expect(response.data).to.not.be.empty;
        const validator = new OpenAPIResponseValidator({
          responses:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            apiSpec.paths['/v1/storageLimitsByFid'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('returns some storage limits', async function() {
        const limits = await client.getStorageLimitsByFid(6833);
        expect(limits).to.not.be.empty;
      });
    });
  });

  describe('Usernames API', function() {
    describe('#getUsernameProof', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.usernames.getUsernameProof({
          name: 'gavi',
        });
        const validator = new OpenAPIResponseValidator({
          responses:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            apiSpec.paths['/v1/userNameProofByName'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('returns null for nonexistent name', async function() {
        const response = await client.getUsernameProof('xxxxxxxx');
        expect(response).to.be.null;
      });
    });

    describe('#listUsernameProofsForFid', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.usernames.listUsernameProofsByFid({
          fid: 2,
        });
        expect(response.data.proofs).to.not.be.empty;
        const validator = new OpenAPIResponseValidator({
          responses:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            apiSpec.paths['/v1/userNameProofsByFid'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });
    });
  });

  describe('Verifications API', function() {
    describe('#listVerificationsByFid', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.verifications.listVerificationsByFid(
          {
            fid: 2,
          },
        );
        expect(response.data.messages).to.not.be.empty;
        const validator = new OpenAPIResponseValidator({
          responses:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            apiSpec.paths['/v1/verificationsByFid'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });
    });
  });

  describe('OnChain Events API', function() {
    describe('#listOnChainEventsByFid', function() {
      it('validates against OpenAPI spec', async function() {
        for (const eventType of [
          OnChainEventType.Signer,
          // TODO: find an FID with this event
          // OnChainEventType.SignerMigrated,
          OnChainEventType.IdRegister,
          OnChainEventType.StorageRent,
        ]) {
          const response =
            await client.apis.onChainEvents.listOnChainEventsByFid({
              fid: 3,
              eventType,
            });
          expect(response.data.events).to.not.be.empty;
          const validator = new OpenAPIResponseValidator({
            responses:
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              apiSpec.paths['/v1/onChainEventsByFid'].get.responses as any,
            components: apiSpec.components,
          });
          const errors = validator.validateResponse(200, response.data);
          expect(errors, JSON.stringify(errors)).is.undefined;
        }
      });

      it('returns OnChainSigner events', async function() {
        const events = await client.listOnChainEventsByFid(
          2,
          OnChainEventType.Signer,
        );
        expect(events).to.not.be.empty;
        const event = events[0];
        expect(event.type).to.eq(OnChainEventType.Signer);
        expectDefinedNonNull(event.signerEventBody);
      });

      it('returns IdRegister events', async function() {
        const events = await client.listOnChainEventsByFid(
          2,
          OnChainEventType.IdRegister,
        );
        expect(events).to.not.be.empty;
        const event = events[0];
        expect(event.type).to.eq(OnChainEventType.IdRegister);
        expectDefinedNonNull(event.idRegisterEventBody);
      });

      // TODO: find an FID with SignerMigrated events
      it.skip('returns SignerMigrated events', async function() {
        const events = await client.listOnChainEventsByFid(
          2,
          OnChainEventType.SignerMigrated,
        );
        expect(events).to.not.be.empty;
        const event = events[0];
        expect(event.type).to.eq(OnChainEventType.SignerMigrated);
        expectDefinedNonNull(event.signerMigratedEventBody);
      });

      it('returns StorageRent events', async function() {
        const events = await client.listOnChainEventsByFid(
          2,
          OnChainEventType.StorageRent,
        );
        expect(events).to.not.be.empty;
        const event = events[0];
        expect(event.type).to.eq(OnChainEventType.StorageRent);
        expectDefinedNonNull(event.storageRentEventBody);
      });
    });

    describe('#getOnChainSignerEventBySigner', function() {
      it('validates against OpenAPI spec', async function() {
        // Provide the `signer` param
        const response =
          await client.apis.onChainEvents.listOnChainSignersByFid({
            fid: 6833,
            signer:
              '0x0852c07b5695ff94138b025e3f9b4788e06133f04e254f0ea0eb85a06e999cdd',
          });
        expect(response.data).to.not.be.empty;
        const validator = new OpenAPIResponseValidator({
          responses:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            apiSpec.paths['/v1/onChainSignersByFid'].get.responses as any,
          components: apiSpec.components,
        });
        let errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;

        // Omit the `signer` param
        const listResponse =
          await client.apis.onChainEvents.listOnChainSignersByFid({
            fid: 6833,
          });
        expect(listResponse.data).to.have.property('events');
        expect(
          (listResponse.data as ListOnChainSignersByFid200ResponseOneOf).events,
        ).to.not.be.empty;
        errors = validator.validateResponse(200, listResponse.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('returns the appropriate event', async function() {
        const event = await client.getOnChainSignerEventBySigner(
          6833,
          '0x0852c07b5695ff94138b025e3f9b4788e06133f04e254f0ea0eb85a06e999cdd',
        );
        expectDefinedNonNull(event);
        expectDefinedNonNull(event.signerEventBody);
      });

      it('returns null if signer not found', async function() {
        const event = await client.getOnChainSignerEventBySigner(
          6833,
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        );
        expect(event).to.be.null;
      });
    });

    describe('#getOnChainIdRegistryEventByAddress', function() {
      it('validates against OpenAPI spec', async function() {
        const response =
          await client.apis.onChainEvents.getOnChainIdRegistrationByAddress({
            address: '0x74232bf61e994655592747e20bdf6fa9b9476f79',
          });
        expect(response.data).to.not.be.empty;
        const validator = new OpenAPIResponseValidator({
          responses: apiSpec.paths['/v1/onChainIdRegistryEventByAddress'].get
            .responses as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('returns the appropriate event', async function() {
        const event = await client.getOnChainIdRegistryEventByAddress(
          '0x74232bf61e994655592747e20bdf6fa9b9476f79',
        );
        expectDefinedNonNull(event);
        expectDefinedNonNull(event.idRegisterEventBody);
      });

      it('returns null if signer not found', async function() {
        const event = await client.getOnChainIdRegistryEventByAddress(
          '0x0000000000000000000000000000000000000000',
        );
        expect(event).to.be.null;
      });
    });
  });

  describe('Hub Events API', function() {
    describe('#listHubEvents', function() {
      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.hubEvents.listEvents();
        expect(response.data.events).to.not.be.empty;
        const validator = new OpenAPIResponseValidator({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          responses: apiSpec.paths['/v1/events'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('returns some hub events', async function() {
        const eventsIter = client.listHubEvents();
        const eventOne = await eventsIter.next();
        const eventTwo = await eventsIter.next();
        expectDefinedNonNull(eventOne.value);
        expectDefinedNonNull(eventTwo.value);
      });
    });

    describe('#getEventById', function() {
      let eventId: number;

      beforeEach('fetch recent event ID', async function() {
        const events = client.listHubEvents();
        const event = await events.next();
        expectDefinedNonNull(event.value);
        eventId = (event.value as HubEvent).id;
      });

      it('validates against OpenAPI spec', async function() {
        const response = await client.apis.hubEvents.getEventById({
          eventId,
        });
        const validator = new OpenAPIResponseValidator({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          responses: apiSpec.paths['/v1/eventById'].get.responses as any,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it('can fetch an event', async function() {
        const event = await client.getHubEventById(eventId);
        expectDefinedNonNull(event);
        expect(event.id).eq(eventId);
      });

      it('returns null when event not found', async function() {
        const eventId = 0;
        const event = await client.getHubEventById(eventId);
        expect(event).to.be.null;
      });
    });
  });
});
