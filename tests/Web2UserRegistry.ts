import "mocha";
import { expect } from "chai";
import { UserRegistryReader, Web2UserRegistry } from "../src/userRegistry";
import { expectDefined } from "./utils";

describe("Web2UserRegistry", function () {
  let userRegistry: UserRegistryReader;

  beforeEach("initialize UserRegistry", function () {
    userRegistry = new Web2UserRegistry();
  });

  describe("#lookupByUsername", function () {
    it("should work for existing username", async function () {
      const user = await userRegistry.lookupByUsername("gavi");
      expectDefined(user);
      expect(user.displayName).to.eq("Gavi Galloway");
    });

    it("should return undefined when username not found", async function () {
      const user = await userRegistry.lookupByUsername("zzzzzzzzabcabcab");
      expect(user).to.be.undefined;
    });
  });

  describe("#lookupByAddress", function () {
    it("should work for address that has registered a profile", async function () {
      const knownRegisteredAddress =
        "0xEfCbF0a3C475780A4eD25158E35F528d929C9A23";
      const user = await userRegistry.lookupByAddress(knownRegisteredAddress);
      expectDefined(user);
      expect(user.username).to.eq("gavi");
    });

    it("should return undefined when address not found", async function () {
      const user = await userRegistry.lookupByAddress(
        "0x0000000000000000000000000000000000000000"
      );
      expect(user).to.be.undefined;
    });
  });

  describe("#getAllUsers", function () {
    it("should find at least 100 users", async function () {
      this.timeout(10000);
      const usernamesSeen = new Set();
      for await (const user of userRegistry.getAllUsers()) {
        usernamesSeen.add(user.username);
        if (usernamesSeen.size === 100) {
          return;
        }
      }
      expect.fail(`only saw ${usernamesSeen.size} usernames`);
    });
  });

  describe("#getAllUsernames", function () {
    it("should find at least 100 usernames", async function () {
      this.timeout(10000);
      const usernamesSeen = new Set();
      for await (const username of userRegistry.getAllUsernames()) {
        usernamesSeen.add(username);
        if (usernamesSeen.size === 100) {
          return;
        }
      }
      expect.fail(`only saw ${usernamesSeen.size} usernames`);
    });
  });
});
