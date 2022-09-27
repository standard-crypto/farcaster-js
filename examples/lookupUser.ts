import { UserRegistry } from "@standard-crypto/farcaster-js";

const userRegistry = new UserRegistry();

// by username
await userRegistry.lookupByUsername("dwr");

// by address
await userRegistry.lookupByAddress(
  "0xEfCbF0a3C475780A4eD25158E35F528d929C9A23"
);
