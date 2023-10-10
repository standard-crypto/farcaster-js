import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { expectDefined } from "./utils";
import {
  NeynarAPIClient,
  Logger,
  silentLogger,
  generateSignature,
} from "../src/";
import {
  Cast as v2Cast,
  PostCastResponseCast,
  EmbedUrl,
  ReactionType,
} from "../src/neynarAPI/neynarV2API";
import { ReactionTypeEnum } from "../src/neynarAPI/neynarV1API";

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
  describe("NeynarAPI", function () {
    this.timeout("30000");

    let client: NeynarAPIClient;

    before("create client", function () {
      client = new NeynarAPIClient(apiKey, { logger: testLogger });
    });

    describe("#signer", function () {
      /**
       * Note: While testing please reuse the signer, it costs money to approve a signer.
       * Steps to create & register a signer:
       * 1. Remove the skip on "can create a signer" and capture the Signer UUID & public key from the logs
       * 2. Set the values for your Signer UUID & public key in your .env file
       * 3. Replace the skip to "can create a signer" and remove the skip on "can register a signer"
       *   - Update the deadline if you want to use the signer for a longer period
       * 4. Open the signer_approval_url from the logged registeredSigner on a mobile device
       *    that is logged into the same account
       *    - if android -> update the deeplink to follow this format
       *     https://client.warpcast.com/deeplinks/signed-key-request?token=0x1234
       * 5. Approve the signer (costs $0.99)
       * 6. Replace the skip on "can register a signer" and run the tests
       */
      let signature: string | undefined;
      const deadline = Math.floor(Date.now() / 1000) + 86400;
      it.skip("can create a signer", async function () {
        const signer = await client.createSigner();
        expectDefined(signer);
        // eslint-disable-next-line no-console
        console.log(signer);
      });
      it("can generate a signature", async function () {
        signature = await generateSignature(
          signerPublicKey ?? "",
          userBotFid,
          privateKey ?? "",
          deadline
        );
        expectDefined(signature);
      });
      it.skip("can register a signer", async function () {
        const registeredSigner = await client.registerSigner(
          signerUuid ?? "",
          userBotFid,
          deadline,
          signature ?? ""
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

    describe("#v1fetchCast", function () {
      it("can fetch an existing cast", async function () {
        const existingCastHash = "0x0cac69b3162e2db93af22eb0156a1ecb6d2641e1";
        const cast = await client.v1FetchCast(existingCastHash);
        expectDefined(cast);
        expect(cast.hash).to.eq(existingCastHash);
      });

      it("returns undefined for nonexistent cast", async function () {
        const nonexistentCastHash =
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
        const cast = await client.v1FetchCast(nonexistentCastHash);
        expect(cast).to.be.undefined;
      });
    });

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

    describe("#fetchCastsInThread", function () {
      it("can fetch multiple pages of casts", async function () {
        const threadHash = "0xd02442da75c1a09c0b0a735f9d6fdfb0db287d89";
        const castsInThread = await client.fetchCastsInThread({
          hash: threadHash,
        });
        expectDefined(castsInThread);
        for (const cast of castsInThread) {
          expectDefined(cast.hash);
        }
        expect(castsInThread.length).to.be.greaterThan(10);
      });
    });

    describe("#fetchCastsForUser", function () {
      it("can fetch at least one cast", async function () {
        let foundCast = false;
        // eslint-disable-next-line no-unreachable-loop
        for await (const cast of client.fetchCastsForUser({
          fid: userGaviFid,
        })) {
          foundCast = true;
          expect(cast.author.fid).to.eq(userGaviFid.toString());
          expectDefined(cast.timestamp);
          break;
        }
        expect(foundCast).to.be.true;
      });

      it("can fetch multiple pages worth of casts", async function () {
        let castCount = 0;
        const castCountBiggerThanPageSize = 150;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const _ of client.fetchCastsForUser({ fid: userDwrFid })) {
          castCount++;
          if (castCount >= castCountBiggerThanPageSize) {
            break;
          }
        }
        expect(castCount).to.be.greaterThanOrEqual(castCountBiggerThanPageSize);
      });
    });

    describe("#fetchRecentCasts", function () {
      it("can fetch multiple pages of casts", async function () {
        let castCount = 0;
        for await (const cast of client.fetchRecentCasts({ pageSize: 5 })) {
          expectDefined(cast);
          expectDefined(cast.hash);
          castCount++;
          if (castCount === 10) break;
        }
        expect(castCount).to.eq(10);
      });
    });

    describe("#fetchRecentUsers", function () {
      it("can fetch multiple pages of users", async function () {
        let userCount = 0;
        for await (const user of client.fetchRecentUsers({ pageSize: 5 })) {
          expectDefined(user);
          expectDefined(user.username);
          userCount++;
          if (userCount === 10) break;
        }
        expect(userCount).to.eq(10);
      });
    });

    describe("#fetchUserCastLikes", function () {
      it("can fetch multiple pages of likes", async function () {
        let castCount = 0;
        for await (const cast of client.fetchUserCastLikes(
          { fid: userDwrFid },
          {
            pageSize: 5,
          }
        )) {
          expectDefined(cast);
          expectDefined(cast.reaction?.reaction_target_hash);
          expect(cast.reaction?.reaction_type).to.eq("like");
          castCount++;
          if (castCount === 10) break;
        }
        expect(castCount).to.eq(10);
      });
    });

    describe("#lookupUserByFid", function () {
      it("can find existing user", async function () {
        const user = await client.lookupUserByFid(userGaviFid);
        expect(user?.username).to.eq("gavi");
      });

      it("returns undefined if user not found", async function () {
        const user = await client.lookupUserByFid(111111111111);
        expect(user).to.be.undefined;
      });
    });

    describe("#lookupUserByUsername", function () {
      it("can find existing user", async function () {
        const user = await client.lookupUserByUsername("dwr.eth");
        expect(user?.username).to.eq("dwr.eth");
      });

      it("returns undefined if user not found", async function () {
        const user = await client.lookupUserByUsername("nosuchusername11"); // cSpell:disable-line
        expect(user).to.be.undefined;
      });
    });

    describe("#lookupUserByVerification", function () {
      it("can find existing user", async function () {
        const user = await client.lookupUserByVerification(
          "0xAA8b53BE5670d56bA9795AFCEdF6d39b96f5f1E2"
        );
        expect(user?.username).to.eq("gavi-bot");
      });

      it("returns undefined if address not found", async function () {
        const user = await client.lookupUserByVerification(
          "0x0000000000000000000000000000000000000000"
        );
        expect(user).to.be.undefined;
      });
    });

    describe("#fetchCustodyAddress", function () {
      it("can lookup by fid", async function () {
        const expectedCustodyAddr =
          "0x6b0bda3f2ffed5efc83fa8c024acff1dd45793f1";
        const custodyAddr = await client.fetchCustodyAddressForUser(userDwrFid);
        expect(custodyAddr).to.eq(expectedCustodyAddr);
      });
    });

    describe("verifications", function () {
      it("can fetch a user's verifications", async function () {
        const verifications = await client.fetchUserVerifications({
          fid: userDwrFid,
        });
        expect(verifications?.fid).eq(userDwrFid.toString());
        expect(verifications?.verifications.length).to.be.greaterThan(0);
      });

      it("returns empty generator for user with no verifications", async function () {
        const verifications = await client.fetchUserVerifications({
          fid: 100,
        });
        expect(verifications?.verifications.length).to.eq(0);
      });
    });

    describe("notifications", function () {
      it("can fetch mention and reply notifications", async function () {
        let castCount = 0;
        let notificationFound = false;
        for await (const notification of client.fetchMentionAndReplyNotifications(
          userDwrFid,
          {
            pageSize: 5,
          }
        )) {
          expectDefined(notification);
          expectDefined(notification.hash);
          expectDefined(notification.text);
          castCount++;
          notificationFound = true;
          if (castCount === 10) break;
        }
        expect(castCount).to.eq(10);
        expect(notificationFound).to.be.true;
      });
    });

    describe("get reactions", function () {
      it("can fetch reactions to a cast", async function () {
        const existingCastHash = "0xd02442da75c1a09c0b0a735f9d6fdfb0db287d89";
        let castCount = 0;
        let reactionFound = false;
        for await (const observedReaction of client.fetchCastLikes(
          existingCastHash,
          { pageSize: 5 }
        )) {
          expect(observedReaction.type).eq(ReactionTypeEnum.Like);
          castCount++;
          reactionFound = true;
          if (castCount === 10) break;
        }
        expect(castCount).to.eq(10);
        expect(reactionFound).to.be.true;
      });
    });

    describe("get follows", function () {
      it("can fetch followers of a user", async function () {
        let followerFound = false;
        let followersFound = 0;
        const followers = await client.fetchUserFollowers({
          fid: userGaviFid,
        });
        for (const follower of followers ?? []) {
          expectDefined(follower);
          expectDefined(follower.fid);
          followerFound = true;
          followersFound++;
          if (followersFound === 50) break;
        }
        expect(followersFound).to.eq(50);
        expect(followerFound).to.be.true;
      });

      it("can fetch users followed by a user", async function () {
        let followingFound = false;
        let dwrFound = false;
        const following = await client.fetchUserFollowers({
          fid: userGaviFid,
        });
        for (const follow of following ?? []) {
          if (follow.fid === userDwrFid) {
            dwrFound = true;
            break;
          }
          expectDefined(follow);
          expectDefined(follow.fid);
          followingFound = true;
        }
        expect(followingFound).to.be.true;
        expect(dwrFound).to.be.true;
      });
    });

    if (signerUuid !== undefined && signerUuid !== "") {
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
          await sleep(1000);
          reply = await client.publishCast(signerUuid, text, publishedCast);
          expect(reply.text).to.eq(text);
          await sleep(1000);
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
            expect(NeynarAPIClient.isApiErrorResponse(error)).is.true;
            if (NeynarAPIClient.isApiErrorResponse(error)) {
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

      describe("post reactions", function () {
        let cast: v2Cast | undefined;

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
        let cast: v2Cast | undefined;
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

      describe("post follows", function () {
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
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        "Skipping NeynarAPI write integration tests. Env var INTEGRATION_TEST_NEYNAR_SIGNER_UUID is unset."
      );
    }
  });
} else {
  // eslint-disable-next-line no-console
  console.warn(
    "Skipping NeynarAPI integration tests. Env var INTEGRATION_TEST_NEYNAR_API_KEY is unset."
  );
}
export { NeynarAPIClient };
