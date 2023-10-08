import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import OpenAPIResponseValidator from "openapi-response-validator";
import { promises as fs } from "fs";
import yaml from "yaml";

import { HubRestAPIClient } from "../src/hub-rest-client";
import { Logger, silentLogger } from "../src/common/logger";
import { expectDefinedNonNull } from "./utils";
import { ReactionType } from "../src/hub-rest-client/openapi";

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

describe.only("HubWebClient", function () {
  let client: HubRestAPIClient;
  let apiSpec: any;

  before("setup", async function () {
    client = new HubRestAPIClient({
      server: "http://nemes.farcaster.xyz:2281",
      logger: testLogger,
    });

    const apiSpecYaml = await fs.readFile(
      "./src/hub-rest-client/openapi/spec.yaml",
      "utf8"
    );
    apiSpec = yaml.parse(apiSpecYaml);
  });

  describe("Farcaster epoch timestamps", function () {
    // TODO
  });

  describe("Info API", function () {
    it("validates against swagger spec", async function () {
      const info = await client.apis.info.getInfo({ dbstats: true });
      const validator = new OpenAPIResponseValidator({
        responses: apiSpec.paths["/v1/info"].get.responses,
        components: apiSpec.components,
      });
      const errors = validator.validateResponse(200, info.data);
      expect(errors, JSON.stringify(errors)).is.undefined;
    });

    it("can fetch info with/without dbstats", async function () {
      const withDbStats = await client.getHubInfo({ includeDbStats: true });
      const withoutDbStats = await client.getHubInfo({ includeDbStats: false });
      expect(withDbStats.dbStats).to.not.be.undefined;
      expect(withoutDbStats.dbStats).to.be.undefined;
    });
  });

  describe("Casts API", function () {
    describe("#getCastById", function () {
      it("validates against swagger spec", async function () {
        const response = await client.apis.casts.getCastById({
          fid: 2,
          hash: "0xd2b1ddc6c88e865a33cb1a565e0058d757042974",
        });
        const validator = new OpenAPIResponseValidator({
          responses: apiSpec.paths["/v1/castById"].get.responses,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it("can fetch an existing cast", async function () {
        const cast = await client.getCastById({
          fid: 2,
          hash: "0xd2b1ddc6c88e865a33cb1a565e0058d757042974",
        });
        expectDefinedNonNull(cast);
      });

      it("returns null for nonexistent cast", async function () {
        const cast = await client.getCastById({
          fid: 2,
          hash: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        });
        expect(cast).to.be.null;
      });
    });

    describe("#getCastsByFid", function () {
      it("validates against swagger spec", async function () {
        const response = await client.apis.casts.getCastsByFid({
          fid: userGaviFid,
        });
        const validator = new OpenAPIResponseValidator({
          responses: apiSpec.paths["/v1/castsByFid"].get.responses,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it("can paginate", async function () {
        const pageSize = 1;
        const castHashesSeen = new Set<string>();

        let castCount = 0;
        for await (const cast of client.getCastsByFid(userGaviFid, {
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
    });

    describe("#getCastsByParent", function () {
      it("validates against swagger spec", async function () {
        const response = await client.apis.casts.getCastsByParent({
          fid: 226,
          hash: "0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9",
        });
        const validator = new OpenAPIResponseValidator({
          responses: apiSpec.paths["/v1/castsByParent"].get.responses,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it("can fetch by parent Cast ID", async function () {
        const pageSize = 1;
        const casts = client.getCastsByParent(
          { fid: 226, hash: "0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9" },
          {
            pageSize,
          }
        );
        const cast = await casts.next();
        expectDefinedNonNull(cast.value);
      });

      it("can fetch by parent URL", async function () {
        const pageSize = 1;
        const casts = client.getCastsByParent(
          {
            url: "chain://eip155:1/erc721:0x39d89b649ffa044383333d297e325d42d31329b2",
          },
          {
            pageSize,
          }
        );
        const cast = await casts.next();
        expectDefinedNonNull(cast.value);
      });
    });

    describe("#getCastsByMention", function () {
      it("validates against swagger spec", async function () {
        const response = await client.apis.casts.getCastsByMention({
          fid: 6833,
        });
        const validator = new OpenAPIResponseValidator({
          responses: apiSpec.paths["/v1/castsByMention"].get.responses,
          components: apiSpec.components,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it("can fetch a cast by mention", async function () {
        const pageSize = 1;
        const casts = client.getCastsByMention(6833, {
          pageSize,
        });
        const cast = await casts.next();
        expectDefinedNonNull(cast.value);
      });
    });
  });

  describe("Reactions API", function () {
    describe("#getReactionById", function () {
      it("validates against swagger spec", async function () {
        const response = await client.apis.reactions.getReactionById({
          fid: 2,
          targetFid: 1795,
          targetHash: "0x7363f449bfb0e7f01c5a1cc0054768ed5146abc0",
          reactionType: ReactionType.Like,
        });
        const validator = new OpenAPIResponseValidator({
          components: apiSpec.components,
          responses: apiSpec.paths["/v1/reactionById"].get.responses,
        });
        const errors = validator.validateResponse(200, response.data);
        expect(errors, JSON.stringify(errors)).is.undefined;
      });

      it("can fetch an existing reaction", async function () {
        const reaction = await client.getReactionById({
          fid: 2,
          targetFid: 1795,
          targetHash: "0x7363f449bfb0e7f01c5a1cc0054768ed5146abc0",
          reactionType: ReactionType.Like,
        });
        expectDefinedNonNull(reaction);
      });

      it("returns null for nonexistent cast", async function () {
        const reaction = await client.getReactionById({
          fid: 1,
          targetFid: 2,
          targetHash: "0x0000000000000000000000000000000000000000",
          reactionType: ReactionType.Like,
        });
        expect(reaction).to.be.null;
      });
    });
  });
});
