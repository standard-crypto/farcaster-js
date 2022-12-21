import { MerkleAPIClient } from "../src/merkleAPI";
import { Wallet } from "ethers";
import { expect } from "chai";
import { Logger, silentLogger } from "../src/merkleAPI/logger";
import { expectDefined } from "./utils";
import { AuthToken, Cast, CastReaction } from "./merkleAPI/swagger";
import OpenAPIResponseValidator from "openapi-response-validator";
import apiDefinitions from "../src/merkleAPI/swagger/spec.json";

const privateKey = process.env.INTEGRATION_TEST_USER_MNEMONIC;

const testLogger: Logger = {
  info: silentLogger.info,
  debug: silentLogger.debug,
  trace: silentLogger.trace,

  /* eslint-disable no-console */
  warn: console.warn,
  error: console.error,
  /* eslint-enable no-console */
};

const userDwrFid = 3;
const userGaviFid = 69; // @gavi
const userGaviBotFid = 1; // @gavi-bot

if (privateKey !== undefined && privateKey !== "") {
  describe("MerkleAPI", function () {
    this.timeout("10000");

    let client: MerkleAPIClient;

    before("create client", function () {
      const wallet = Wallet.fromMnemonic(privateKey);
      client = new MerkleAPIClient(wallet, { logger: testLogger });
    });

    it("#fetchCurrentUser", async function () {
      const user = await client.fetchCurrentUser();
      expect(user.displayName).not.empty;
    });

    describe("#fetchCastsForUser", function () {
      it("can fetch at least one cast", async function () {
        let foundCast = false;
        // eslint-disable-next-line no-unreachable-loop
        for await (const cast of client.fetchCastsForUser({
          fid: userGaviFid,
        })) {
          foundCast = true;
          expect(cast.author.fid).to.eq(userGaviFid);
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

      it("supports filtering recasts in/out", async function () {
        // filter recasts in
        let recastFound = false;
        for await (const cast of client.fetchCastsForUser(
          { fid: userDwrFid },
          { includeRecasts: true }
        )) {
          if (cast.author.fid !== userDwrFid) {
            recastFound = true;
            break;
          }
        }
        expect(recastFound).to.be.true;

        // filter recasts out
        recastFound = false;
        const numCastsToSearch = 500; // assume @dwr recasts at least once in 500 casts
        let i = 0;
        for await (const cast of client.fetchCastsForUser(
          { fid: userDwrFid },
          { includeRecasts: false }
        )) {
          if (i++ === numCastsToSearch) break;
          if (cast.author.fid !== userDwrFid) {
            recastFound = true;
            break;
          }
        }
        expect(recastFound).to.be.false;
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

    describe("#fetchCastsInThread", function () {
      it("can fetch multiple pages of casts", async function () {
        let castCount = 0;
        const threadHash =
          "0xc51b432e4c67a85208003ce2d8e015fe0966c00a7e62b4370e20db9d529770f0";
        for await (const cast of client.fetchCastsInThread(
          { hash: threadHash },
          { pageSize: 1 }
        )) {
          expectDefined(cast);
          expectDefined(cast.hash);
          castCount++;
          if (castCount === 2) break;
        }
        expect(castCount).to.eq(2);
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

    describe("#fetchCast", function () {
      it("can fetch an existing cast", async function () {
        const existingCastHash =
          "0xc51b432e4c67a85208003ce2d8e015fe0966c00a7e62b4370e20db9d529770f0";
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

    describe("#fetchLatestCastForUser", function () {
      it("returns latest cast for user", async function () {
        const cast = await client.fetchLatestCastForUser({
          fid: userGaviFid,
        });
        expectDefined(cast);
      });

      it("returns undefined if user has no (undeleted) casts", async function () {
        const cast = await client.fetchLatestCastForUser({
          fid: userGaviBotFid,
        });
        expect(cast).to.be.undefined;
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
        const user = await client.lookupUserByUsername("dwr");
        expect(user?.username).to.eq("dwr");
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
          expectDefined(cast.hash);
          expect(cast.type).to.eq("Like");
          castCount++;
          if (castCount === 10) break;
        }
        expect(castCount).to.eq(10);
      });
    });

    describe("publish / delete casts", function () {
      let publishedCast: Cast | undefined;
      let reply: Cast | undefined;

      it("can publish a basic cast with no parent", async function () {
        const text = "this is a test cast";
        publishedCast = await client.publishCast(text);
        expect(publishedCast.text).to.eq(text);
      });

      it("can reply to an existing cast", async function () {
        const text = "this is a reply to the test cast";
        expectDefined(publishedCast);
        reply = await client.publishCast(text, publishedCast);
        expect(reply.text).to.eq(text);
        expect(reply.parentHash).to.eq(publishedCast?.hash);
      });

      it("can delete a cast", async function () {
        expectDefined(reply);
        expectDefined(publishedCast);
        await client.deleteCast(reply);
        await client.deleteCast(publishedCast);
      });

      // Skipped: server currently returns 500 error
      it.skip("cannot delete a cast from a different author", async function () {
        // hash of a cast posted by @dwr
        await client.deleteCast(
          "0x4a52dd0d3b9864d108bf08f28bf059365838ff3932a46a18a81d8bb378b1862e"
        );
      });
    });

    describe("reactions", function () {
      let cast: Cast | undefined;
      let reaction: CastReaction | undefined;

      it("can react to a cast", async function () {
        cast = await client.fetchLatestCastForUser({ fid: userDwrFid });
        expectDefined(cast);

        reaction = await client.reactToCast("Like", cast);
        expect(reaction.type).to.eq("Like");
        expect(reaction.castHash).to.eq(cast.hash);
      });

      it("can un-react to a cast", async function () {
        expectDefined(cast);
        expectDefined(reaction);
        await client.removeReactionToCast("Like", cast);
      });
    });

    describe("recasts", function () {
      let cast: Cast | undefined;

      it("can recast a cast", async function () {
        cast = await client.fetchLatestCastForUser({ fid: userDwrFid });
        expectDefined(cast);

        await client.recast(cast);
      });

      it("can delete a recast", async function () {
        expectDefined(cast);
        await client.deleteRecast(cast);
      });
    });

    describe("follows", function () {
      it("can follow a user", async function () {
        await client.followUser({ fid: userDwrFid });
        const user = await client.lookupUserByFid(userDwrFid);
        expectDefined(user);
      });

      it("can fetch followers of a user", async function () {
        let followerFound = false;
        const currentUser = await client.fetchCurrentUser();
        for await (const follower of client.fetchUserFollowers({
          fid: userDwrFid,
        })) {
          if (follower.fid === currentUser.fid) {
            followerFound = true;
            break;
          }
        }
        expect(followerFound).to.be.true;
      });

      it("can fetch users followed by a user", async function () {
        let dwrFound = false;
        const currentUser = await client.fetchCurrentUser();
        for await (const following of client.fetchUserFollowing(currentUser)) {
          if (following.fid === userDwrFid) {
            dwrFound = true;
            break;
          }
        }
        expect(dwrFound).to.be.true;
      });

      it("can unfollow a user", async function () {
        await client.unfollowUser({ fid: userDwrFid });
        let dwrFound = false;
        const currentUser = await client.fetchCurrentUser();
        for await (const following of client.fetchUserFollowing(currentUser)) {
          if (following.fid === userDwrFid) {
            dwrFound = true;
            break;
          }
        }
        expect(dwrFound).to.be.false;
      });
    });

    describe("watches", function () {
      let cast: Cast | undefined;

      it("can watch a cast", async function () {
        cast = await client.fetchLatestCastForUser({ fid: userDwrFid });
        expectDefined(cast);
        await client.watchCast(cast);
      });

      it("can unwatch a cast", async function () {
        expectDefined(cast);
        await client.unwatchCast(cast);
      });
    });

    describe("assets", function () {
      it("can fetch a list of collections owned by a user", async function () {
        let assetFound = false;
        // eslint-disable-next-line no-unreachable-loop
        for await (const assetCollection of client.fetchUserAssetCollections({
          fid: userDwrFid,
        })) {
          expectDefined(assetCollection);
          assetFound = true;
          break;
        }
        expect(assetFound).to.be.true;
      });
    });

    describe("#fetchCustodyAddress", function () {
      it("can lookup by fid", async function () {
        const expectedCustodyAddr =
          "0x74232bf61e994655592747e20bdf6fa9b9476f79";
        const custodyAddr = await client.fetchCustodyAddressForUser("dwr");
        expect(custodyAddr).to.eq(expectedCustodyAddr);
      });
    });

    describe("auth", function () {
      let token: AuthToken;
      it("can create an auth token", async function () {
        token = await client.createAuthToken();
        expectDefined(token);
      });
      it("can revoke an auth token", async function () {
        expectDefined(token);
        await client.revokeAuthToken(token);
      });
      it("doesn't attempt to reuse revoked auth tokens", async function () {
        const token = await client.getOrCreateValidAuthToken();
        await client.revokeAuthToken(token);
        await client.fetchCurrentUser();
      });
    });

    describe("notifications", function () {
      it("can fetch mention and reply notifications", async function () {
        const notifications = await client.fetchMentionAndReplyNotifications();

        let notificationFound = false;
        // eslint-disable-next-line no-unreachable-loop
        for await (const notification of notifications) {
          expectDefined(notification);
          notificationFound = true;
          break;
        }

        expect(notificationFound).to.be.true;
      });
    });

    describe("api responses validator", function () {
      let authToken: AuthToken;
      before("get auth token", async function () {
        authToken = await client.getOrCreateValidAuthToken();
      });

      after("revoke auth token", async function () {
        await client.revokeAuthToken(authToken);
      });

      it("validates cast responses", async function () {
        const response = await client.apis.casts.v2CastsGet(
          userGaviFid,
          false,
          10,
          authToken.secret
        );
        const validator = new OpenAPIResponseValidator({
          responses: apiDefinitions.paths["/v2/casts"].get.responses,
          definitions: apiDefinitions.definitions,
        });
        const errors = validator.validateResponse(
          response.status,
          response.data
        );
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it("validates user responses", async function () {
        const response = await client.apis.users.v2UserGet(
          userGaviFid,
          authToken.secret
        );
        const validator = new OpenAPIResponseValidator({
          responses: apiDefinitions.paths["/v2/user"].get.responses,
          definitions: apiDefinitions.definitions,
        });
        const errors = validator.validateResponse(
          response.status,
          response.data
        );
        expect(errors, JSON.stringify(errors)).is.undefined;
      });
    });

    describe("verifications", function () {
      it("can fetch a user's verifications", async function () {
        let verificationFound = false;
        for await (const verification of client.fetchUserVerifications({
          fid: userDwrFid,
        })) {
          verificationFound = true;
          expect(verification.fid).eq(userDwrFid);
        }
        expect(verificationFound).to.be.true;
      });

      it("returns empty generator for user with no verifications", async function () {
        let verificationFound = false;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const _ of client.fetchUserVerifications({
          fid: userGaviBotFid,
        })) {
          verificationFound = true;
        }
        expect(verificationFound).to.be.false;
      });
    });
  });
} else {
  // eslint-disable-next-line no-console
  console.warn(
    "Skipping MerkleAPI integration tests. Env var INTEGRATION_TEST_USER_MNEMONIC is unset."
  );
}
