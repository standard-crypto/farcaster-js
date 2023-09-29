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
  });
} else {
  // eslint-disable-next-line no-console
  console.warn(
    "Skipping NeynarAPI integration tests. Env var INTEGRATION_TEST_NEYNAR_API_KEY is unset."
  );
}
