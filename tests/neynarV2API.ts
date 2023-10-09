import {
  Cast,
  NeynarV2APIClient,
  PostCastResponseCast,
  ReactionType,
  EmbedUrl,
  Logger,
  silentLogger,
} from "../src/neynarV2API";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { expectDefined, generateSignature } from "./utils";

chai.use(chaiAsPromised);

const privateKey = process.env.INTEGRATION_TEST_USER_MNEMONIC;
const apiKey = process.env.INTEGRATION_TEST_NEYNAR_API_KEY;
const signerUuid = process.env.INTEGRATION_TEST_NEYNAR_SIGNER_UUID;
const signerPublicKey = process.env.INTEGRATION_TEST_NEYNAR_SIGNER_PUBLIC_KEY;

const testLogger: Logger = {
  info: silentLogger.info,
  debug: silentLogger.debug,
  trace: silentLogger.trace,
  warn: silentLogger.warn,

  /* eslint-disable no-console */
  error: console.error,
  /* eslint-enable no-console */
};

const userDwrFid = 3;
const userGaviFid = 69; // @gavi
const userBotFid = 6365; // @gavi-bot

async function sleep(ms: number): Promise<void> {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

if (apiKey !== undefined && apiKey !== "") {
  describe("NeynarV2API", function () {
    this.timeout("30000");

    let client: NeynarV2APIClient;

    before("create client", function () {
      client = new NeynarV2APIClient(apiKey, { logger: testLogger });
    });

    describe("#signer", function () {
      /**
       * Note: While testing please reuse the signer, it costs money to approve a signer.
       * Steps to create & register a signer:
       * 1. Set INTEGRATION_TEST_USER_MNEMONIC in the .env file and replace userBotFid with it's fid
       * 2. Run "yarn add viem --dev"
       *    - Note: the project will not compile with this dependency installed
       * 3. Uncomment the code for `generateSignature()` in /tests/utils.ts
       * 4. Remove the skip on "can generate a signer"
       * 5. Set the values for your signer UUID & public key in your .env file
       * 6. Replace the skip to "can generate a signer" and remove the skip on "can register a signer"
       *   - Update the deadline if you want to use the signer for a longer period
       * 7. Open the signer_approval_url from the logged registeredSigner on a mobile device
       *    that is logged into the same account
       *    - if android -> update the deeplink to follow this format
       *     https://client.warpcast.com/deeplinks/signed-key-request?token=0x1234
       * 8. Approve the signer (costs $0.99)
       * 9. Replace the skip on "can register a signer" and run the tests
       */
      it.skip("can create a signer", async function () {
        const signer = await client.createSigner();
        expectDefined(signer);
        // eslint-disable-next-line no-console
        console.log(signer);
      });
      it.skip("can register a signer", async function () {
        const deadline = Math.floor(Date.now() / 1000) + 86400; // one day from now
        const signature = await generateSignature(
          signerPublicKey ?? "",
          userBotFid,
          privateKey ?? "",
          deadline
        );
        const registeredSigner = await client.registerSigner(
          signerUuid ?? "",
          userBotFid,
          deadline,
          signature
        );
        expectDefined(registeredSigner);
        expect(registeredSigner.signer_uuid).to.be.eq(signerUuid);
        expect(registeredSigner.public_key).to.be.eq(signerPublicKey);
        // eslint-disable-next-line no-console
        console.log(registeredSigner);
      });
      it("can fetch a signer", async function () {
        const signer = await client.fetchSigner(signerUuid ?? "");
        expectDefined(signer);
        expect(signer.public_key).to.be.eq(signerPublicKey);
      });
    });
    if (signerUuid !== undefined && signerUuid !== "") {
      describe("#fetchCast", function () {
        it("can fetch an existing cast", async function () {
          const existingCastHash = "0x0cac69b3162e2db93af22eb0156a1ecb6d2641e1";
          const cast = await client.fetchCast(existingCastHash);
          expectDefined(cast);
          expect(cast.hash).to.eq(existingCastHash);
        });

        it("returns undefined for nonexistent cast", async function () {
          const nonexistentCastHash =
            "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
          const cast = await client.fetchCast(nonexistentCastHash);
          expect(cast).to.be.undefined;
        });
      });

      describe("publish / delete casts", function () {
        let publishedCast: PostCastResponseCast | undefined;
        let reply: PostCastResponseCast | undefined;

        it("can publish a basic cast with no parent", async function () {
          const text = "this is a test cast";
          publishedCast = await client.publishCast(signerUuid, text);
          expectDefined(publishedCast);
          expect(publishedCast.text).to.eq(text);
        });

        it("can reply to an existing cast", async function () {
          const text = "this is a reply to the test cast";
          expectDefined(publishedCast);
          reply = await client.publishCast(signerUuid, text, publishedCast);
          expect(reply.text).to.eq(text);
          const replyCast = await client.fetchCast(reply.hash);
          expect(replyCast?.parent_hash).to.eq(publishedCast?.hash);
        });

        it("can delete a cast", async function () {
          expectDefined(reply);
          expectDefined(publishedCast);
          await sleep(1000);
          await client.deleteCast(signerUuid, reply.hash);
          await client.deleteCast(signerUuid, publishedCast.hash);
        });

        // no error thrown at the moment
        it.skip("cannot delete a cast from a different author", async function () {
          let errorThrownAndParsedCorrectly = false;
          try {
            await client.deleteCast(
              signerUuid,
              "0x0cac69b3162e2db93af22eb0156a1ecb6d2641e1"
            ); // a cast by @dwr
          } catch (error) {
            expect(NeynarV2APIClient.isApiErrorResponse(error)).is.true;
            if (NeynarV2APIClient.isApiErrorResponse(error)) {
              // repeating the above just for the type inference
              expect(error.response.status).to.eq(400);
              expect(error.response.data.code).to.contain(
                "Could not remove cast"
              );
              errorThrownAndParsedCorrectly = true;
            }
          }
          expect(errorThrownAndParsedCorrectly).to.be.true;
        });
      });

      describe("cast embeds", function () {
        it("can publish a cast with URL embeds", async function () {
          const embedURL = "https://www.farcaster.xyz/";
          const text = "this is a cast testing URL embed functionality";
          const publishCastResp = await client.publishCast(
            signerUuid,
            text,
            undefined /* replyTo */,
            [embedURL]
          );
          expectDefined(publishCastResp);

          // re-fetch the cast again, since the warpcast API might not return it in response to our POST
          await sleep(1000);
          const publishedCast = await client.fetchCast(publishCastResp.hash);
          expectDefined(publishedCast);

          expectDefined(publishedCast.embeds);
          const urls = publishedCast.embeds;
          expect(urls).to.have.length(1);
          const publishedEmbed: EmbedUrl = urls[0] as EmbedUrl;
          expect(publishedEmbed.url).to.be.eq(embedURL);
          await client.deleteCast(signerUuid, publishedCast);
        });

        it("can publish a cast with image embeds", async function () {
          const embedURL = "https://i.imgur.com/YPEZebo.png";
          const text = "this is a cast testing image embed functionality";
          const publishCastResp = await client.publishCast(
            signerUuid,
            text,
            undefined /* replyTo */,
            [embedURL]
          );
          expectDefined(publishCastResp);

          // re-fetch the cast again, since the warpcast API might not return it in response to our POST
          await sleep(1000);
          const publishedCast = await client.fetchCast(publishCastResp.hash);
          expectDefined(publishedCast);

          expectDefined(publishedCast.embeds);
          const images = publishedCast.embeds;
          expect(images).to.have.length(1);
          const publishedEmbed: EmbedUrl = images[0] as EmbedUrl;
          expect(publishedEmbed.url).to.be.eq(embedURL);
          await client.deleteCast(signerUuid, publishedCast);
        });
      });

      describe("reactions", function () {
        let cast: Cast | undefined;

        it("can react to a cast", async function () {
          const existingCastHash = "0x0cac69b3162e2db93af22eb0156a1ecb6d2641e1";
          cast = await client.fetchCast(existingCastHash);
          expectDefined(cast);
          const response = await client.reactToCast(
            signerUuid,
            ReactionType.Like,
            cast
          );
          expect(response.success).to.be.true;
        });

        it("can un-react to a cast", async function () {
          expectDefined(cast);
          const response = await client.removeReactionToCast(
            signerUuid,
            ReactionType.Like,
            cast
          );
          expect(response.success).to.be.true;
        });
      });

      describe("recasts", function () {
        let cast: Cast | undefined;
        it("can recast a cast", async function () {
          const existingCastHash = "0x0cac69b3162e2db93af22eb0156a1ecb6d2641e1";
          cast = await client.fetchCast(existingCastHash);
          expectDefined(cast);
          const response = await client.reactToCast(
            signerUuid,
            ReactionType.Recast,
            cast
          );
          expect(response.success).to.be.true;
        });

        it("can delete a recast", async function () {
          expectDefined(cast);
          const response = await client.removeReactionToCast(
            signerUuid,
            ReactionType.Recast,
            cast
          );
          expect(response.success).to.be.true;
        });
      });

      describe("follows", function () {
        it("can follow a user", async function () {
          const response = await client.followUser(signerUuid, {
            fid: userDwrFid,
          });
          expect(response.success).to.be.true;
          expect(response.details[0].success).to.be.true;
          expect(response.details[0].target_fid).to.be.eq(userDwrFid);
        });

        it("can unfollow a user", async function () {
          const response = await client.unfollowUser(signerUuid, {
            fid: userDwrFid,
          });
          expect(response.success).to.be.true;
          expect(response.details[0].success).to.be.true;
          expect(response.details[0].target_fid).to.be.eq(userDwrFid);
        });

        it("can follow multiple users", async function () {
          const response = await client.followUsers(signerUuid, [
            userDwrFid,
            userGaviFid,
          ]);
          expect(response.success).to.be.true;
          expect(response.details[0].success).to.be.true;
          expect(response.details[0].target_fid).to.be.eq(userDwrFid);
          expect(response.details[1].success).to.be.true;
          expect(response.details[1].target_fid).to.be.eq(userGaviFid);
        });

        it("can unfollow multiple users", async function () {
          const response = await client.unfollowUsers(signerUuid, [
            userDwrFid,
            userGaviFid,
          ]);
          expect(response.success).to.be.true;
          expect(response.details[0].success).to.be.true;
          expect(response.details[0].target_fid).to.be.eq(userDwrFid);
          expect(response.details[1].success).to.be.true;
          expect(response.details[1].target_fid).to.be.eq(userGaviFid);
        });
      });
    }
  });
} else {
  // eslint-disable-next-line no-console
  console.warn(
    "Skipping NeynarV2API integration tests. Env var INTEGRATION_TEST_NEYNAR_API_KEY is unset."
  );
}
