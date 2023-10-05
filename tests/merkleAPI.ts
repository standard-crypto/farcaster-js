import { MerkleAPIClient } from "../src/merkleAPI";
import { Wallet } from "ethers";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { Logger, silentLogger } from "../src/merkleAPI/logger";
import { expectDefined } from "./utils";
import { AuthToken, Cast, CastReaction } from "./merkleAPI/swagger";
import OpenAPIResponseValidator from "openapi-response-validator";
import apiDefinitions from "../src/merkleAPI/swagger/spec.json";

chai.use(chaiAsPromised);

const privateKey = process.env.INTEGRATION_TEST_USER_MNEMONIC;

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
const userGaviBotFid = 6365; // @gavi-bot

async function sleep(ms: number): Promise<void> {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

if (privateKey !== undefined && privateKey !== "") {
  describe("MerkleAPI", function () {
    this.timeout("30000");

    let client: MerkleAPIClient;

    async function _cleanupBotCasts(): Promise<void> {
      const castHashes = new Array<string>();
      for await (const cast of client.fetchCastsForUser({
        fid: userGaviBotFid,
      })) {
        castHashes.push(cast.hash);
      }
      for (const castHash of castHashes) {
        await client.deleteCast(castHash);
      }
    }

    before("create client", function () {
      const wallet = Wallet.fromMnemonic(privateKey);
      client = new MerkleAPIClient(wallet, { logger: testLogger });
    });

    before("cleanup any existing casts", _cleanupBotCasts);
    after("cleanup any trailing casts", _cleanupBotCasts);

    it("can healthcheck", async function () {
      const { status } = await client.healthcheck();
      expect(status).to.eq("ok");
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
          "0x832cfd5a2e54fc43c3f267c1ffdf4e63b0863cb0284a11ae0bafa7b0d0ef604a";
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
          expect(cast.type).to.eq("like");
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
        await sleep(1000);
        await client.deleteCast(reply);
        await client.deleteCast(publishedCast);
      });

      it("cannot delete a cast from a different author", async function () {
        let errorThrownAndParsedCorrectly = false;
        try {
          await client.deleteCast("0x0cac69b3162e2db93af22eb0156a1ecb6d2641e1"); // a cast by @dwr
        } catch (error) {
          expect(MerkleAPIClient.isApiErrorResponse(error)).is.true;
          if (MerkleAPIClient.isApiErrorResponse(error)) {
            // repeating the above just for the type inference
            expect(error.response.status).to.eq(400);
            const errors = error.response.data.errors;
            expect(errors).to.have.length(1);
            expect(errors[0].message).to.contain("does not exist");
            errorThrownAndParsedCorrectly = true;
          }
        }
        expect(errorThrownAndParsedCorrectly).to.be.true;
      });
    });

    describe("reactions", function () {
      let cast: Cast | undefined;
      let reaction: CastReaction | undefined;

      it("can react to a cast", async function () {
        cast = await client.fetchLatestCastForUser({ fid: userDwrFid });
        expectDefined(cast);

        reaction = await client.reactToCast("like", cast);
        expect(reaction.type).to.eq("like");
        expect(reaction.castHash).to.eq(cast.hash);
      });

      it("can fetch reactions to a cast", async function () {
        expectDefined(cast);
        expectDefined(reaction);

        let reactionFound = false;
        for await (const observedReaction of client.fetchCastLikes(cast)) {
          if (observedReaction.reactor.fid === reaction.reactor.fid) {
            expect(observedReaction.type).eq(reaction.type);
            reactionFound = true;
          }
        }
        expect(reactionFound).to.be.true;
      });

      it("can un-react to a cast", async function () {
        expectDefined(cast);
        expectDefined(reaction);
        await client.removeReactionToCast("like", cast);
      });
    });

    // Skipped due to warpcast API consistently 500-ing on recast attempts
    describe.skip("recasts", function () {
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
      // used to delay the time between when we follow a user, and when we query the server
      // for our follows. There seems to be a delay before the update fully propagates server-side
      let _followersUpdateTimer: () => void;
      const followersUpdatePropagated: Promise<void> = new Promise(
        (resolve) => (_followersUpdateTimer = resolve)
      );
      this.retries(4);

      it("can follow a user", async function () {
        await client.followUser({ fid: userDwrFid });

        setTimeout(_followersUpdateTimer, 5000);
      });

      it("can fetch followers of a user", async function () {
        let followerFound = false;
        // eslint-disable-next-line no-unreachable-loop, @typescript-eslint/no-unused-vars
        for await (const _ of client.fetchUserFollowers({
          fid: userDwrFid,
        })) {
          followerFound = true;
          break;
        }
        expect(followerFound).to.be.true;
      });

      it("can fetch users followed by a user", async function () {
        await followersUpdatePropagated;

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

    // See issue #652
    describe.skip("assets", function () {
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

      it("returns an error when attempting to use authenticated API endpoints without providing credentials", async function () {
        const noAuthClient = new MerkleAPIClient(undefined, {
          logger: testLogger,
        });
        const request = noAuthClient.fetchCurrentUser();
        await expect(request).to.be.rejectedWith(
          "Attempt to use an authenticated API method without first providing a wallet or AuthToken"
        );
      });

      it("can gracefully handle inadvertent creation of too many auth tokens at once", async function () {
        this.timeout("300000");

        // Create too many long-lived tokens
        const numTokens = 60;
        const ONE_YEAR_IN_MILLIS = 31556926000;
        for (let i = 0; i < numTokens; i++) {
          await client.createAuthToken(ONE_YEAR_IN_MILLIS, {
            checkServerAcceptsToken: false,
          });
        }

        // attempting to create and use a new, short-lived token should fail
        const wallet = Wallet.fromMnemonic(privateKey);
        client = new MerkleAPIClient(wallet, { logger: testLogger });
        const request = client.fetchCurrentUser();
        await expect(request).to.be.rejectedWith(
          "Warpcast API did not accept the auth token it just created. You may have too many long-lived tokens active at once"
        );

        // revoke all tokens
        await client.revokeAllAuthTokens();

        // things should work once again
        await client.fetchCurrentUser();
      });

      describe("user-supplied auth tokens", function () {
        it("can be used to initialize an API client", async function () {
          const token = await client.getOrCreateValidAuthToken();
          const newClient = new MerkleAPIClient(token);
          await newClient.fetchCurrentUser();
        });

        it("causes an error to be thrown if the token has expired", async function () {
          const token = await client.createAuthToken(1, {
            checkServerAcceptsToken: false,
          });
          const newClient = new MerkleAPIClient(token);
          await expect(newClient.fetchCurrentUser()).to.be.rejectedWith(
            "the AuthToken provided has expired"
          );
        });

        it("causes an error to be thrown if the caller tries to mint new auth tokens", async function () {
          const token = await client.getOrCreateValidAuthToken();
          const newClient = new MerkleAPIClient(token);
          const tokenCopy = await newClient.getOrCreateValidAuthToken();
          expect(tokenCopy.secret).to.eq(token.secret);
          expect(tokenCopy.expiresAt).to.eq(token.expiresAt);
          await expect(newClient.createAuthToken()).to.be.rejected;
        });
      });
    });

    describe("notifications", function () {
      it("can fetch mention and reply notifications", async function () {
        const notifications = await client.fetchMentionAndReplyNotifications();

        let notificationFound = false;
        // eslint-disable-next-line no-unreachable-loop
        for await (const notification of notifications) {
          expectDefined(notification);
          expectDefined(notification.content);
          expectDefined(notification.content.cast);
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
        for await (const v of client.fetchUserVerifications({
          fid: 100,
        })) {
          verificationFound = true;
        }
        expect(verificationFound).to.be.false;
      });
    });

    describe("error parsing", function () {
      it("can parse an error response from the server", async function () {
        let errorThrownAndParsedCorrectly = false;
        try {
          await client.deleteCast("SomeInvalidCastHash");
        } catch (error) {
          if (MerkleAPIClient.isApiErrorResponse(error)) {
            expect(error.response.status).to.eq(400);

            const apiErrors = error.response.data.errors;
            expect(apiErrors).to.not.be.empty;
            const apiError = apiErrors[0];
            expect(apiError.message).to.not.be.empty;
            errorThrownAndParsedCorrectly = true;
          }
        }
        expect(errorThrownAndParsedCorrectly).to.be.true;
      });
    });

    // See issue #653
    describe.skip("signer requests", function () {
      const TOKEN_NAME = "farcaster-js integration tests";
      const TOKEN_PUB_KEY =
        "0x48b0c7a6deff69bad7673357df43274f3a08163a6440b7a7e3b3cb6b6623faa7";
      let signerRequestToken: string;

      it("can create a signer request", async function () {
        const signerRequest = await client.createSignerRequest(
          TOKEN_PUB_KEY,
          TOKEN_NAME
        );
        expectDefined(signerRequest.token);
        expectDefined(signerRequest.deepLinkUrl);
        signerRequestToken = signerRequest.token;
      });

      it("can fetch an existing signer request", async function () {
        const signerRequest = await client.fetchSignerRequest(
          signerRequestToken
        );
        expectDefined(signerRequest);
        expect(signerRequest.token).to.eq(signerRequestToken);
        expect(signerRequest.name).to.eq(TOKEN_NAME);
        expect(signerRequest.publicKey).to.eq(TOKEN_PUB_KEY);
      });

      it("returns undefined when fetching nonexistent signer request", async function () {
        const signerRequest = await client.fetchSignerRequest("noSuchToken");
        expect(signerRequest).to.be.undefined;
      });
    });

    describe("cast embeds", function () {
      it("can publish a cast with URL embeds", async function () {
        const embedURL = "https://www.farcaster.xyz/";
        const text = "this is a cast testing URL embed functionality";
        let publishedCast: Cast | undefined = await client.publishCast(
          text,
          undefined /* replyTo */,
          [embedURL]
        );
        expectDefined(publishedCast);

        // re-fetch the cast again, since the warpcast API might not return it in response to our POST
        await sleep(1000);
        publishedCast = await client.fetchCast(publishedCast);
        expectDefined(publishedCast);

        expectDefined(publishedCast.embeds);
        const urls = publishedCast.embeds.urls;
        expect(urls).to.have.length(1);
        expect(urls[0].type).eq("url");
        expect(urls[0].openGraph.url).eq(embedURL);
        expect(urls[0].openGraph.sourceUrl).eq(embedURL);
      });

      it("can publish a cast with image embeds", async function () {
        const embedURL = "https://i.imgur.com/YPEZebo.png";
        const text = "this is a cast testing image embed functionality";
        let publishedCast: Cast | undefined = await client.publishCast(
          text,
          undefined /* replyTo */,
          [embedURL]
        );
        expectDefined(publishedCast);

        // re-fetch the cast again, since the warpcast API might not return it in response to our POST
        await sleep(1000);
        publishedCast = await client.fetchCast(publishedCast);
        expectDefined(publishedCast);

        expectDefined(publishedCast.embeds);
        const images = publishedCast.embeds.images;
        expect(images).to.have.length(1);
        expect(images[0].type).eq("image");
        expect(images[0].sourceUrl).eq(embedURL);
      });
    });
  });
} else {
  // eslint-disable-next-line no-console
  console.warn(
    "Skipping MerkleAPI integration tests. Env var INTEGRATION_TEST_USER_MNEMONIC is unset."
  );
}
