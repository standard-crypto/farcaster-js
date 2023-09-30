import { NeynarAPIClient } from "../src/neynarAPI";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { Logger, silentLogger } from "../src/merkleAPI/logger";
import { expectDefined } from "./utils";

chai.use(chaiAsPromised);

// const privateKey = process.env.INTEGRATION_TEST_USER_MNEMONIC;
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

const userDwrFid = 3;
const userGaviFid = 69; // @gavi

if (apiKey !== undefined && apiKey !== "") {
  describe("NeynarAPI", function () {
    this.timeout("30000");

    let client: NeynarAPIClient;

    before("create client", function () {
      client = new NeynarAPIClient(apiKey, { logger: testLogger });
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
          expectDefined(cast.cast?.cast_hash);
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

    describe("#fetchCustodyAddress", function () {
      it("can lookup by fid", async function () {
        const expectedCustodyAddr =
          "0x6b0bda3f2ffed5efc83fa8c024acff1dd45793f1";
        const custodyAddr = await client.fetchCustodyAddressForUser(userDwrFid);
        expect(custodyAddr).to.eq(expectedCustodyAddr);
      });
    });
  });
} else {
  // eslint-disable-next-line no-console
  console.warn(
    "Skipping NeynarAPI integration tests. Env var INTEGRATION_TEST_NEYNAR_API_KEY is unset."
  );
}
