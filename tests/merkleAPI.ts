import { MerkleAPIClient } from "../src/merkleAPI";
import { Wallet } from "ethers";
import { expect } from "chai";
import { Logger, dummyLogger } from "../src/merkleAPI/logger";

const privateKey = process.env.MNEMONIC;

const testLogger: Logger = {
  info: dummyLogger.info,
  debug: dummyLogger.debug,
  trace: dummyLogger.trace,

  /* eslint-disable no-console */
  warn: console.warn,
  error: console.error,
  /* eslint-enable no-console */
};

// @gavi
const userGaviFid = 69;

if (privateKey !== undefined && privateKey !== "") {
  describe("MerkleAPI", function () {
    let client: MerkleAPIClient;

    before("create client", function () {
      const wallet = Wallet.fromMnemonic(privateKey);
      client = new MerkleAPIClient(wallet, testLogger);
    });

    it("#fetchCurrentUser", async function () {
      const user = await client.fetchCurrentUser();
      expect(user.displayName).not.empty;
    });

    describe("#fetchCasts", function () {
      it("can fetch at least one cast", async function () {
        let foundCast = false;
        // eslint-disable-next-line no-unreachable-loop
        for await (const cast of client.fetchCastsForUser(
          { fid: userGaviFid },
          false
        )) {
          foundCast = true;
          expect(cast.author.fid).to.eq(userGaviFid);
          break;
        }
        expect(foundCast).to.be.true;
      });

      it("can fetch multiple pages worth of casts", async function () {
        let castCount = 0;
        const fid = 1; // @dwromero
        const castCountBiggerThanPageSize = 150;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const _ of client.fetchCastsForUser({ fid }, false)) {
          castCount++;
          if (castCount >= castCountBiggerThanPageSize) {
            break;
          }
        }
        expect(castCount).to.be.greaterThanOrEqual(castCountBiggerThanPageSize);
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
  });
}
