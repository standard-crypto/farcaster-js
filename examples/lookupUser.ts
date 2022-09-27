import { UserRegistry } from "@standard-crypto/farcaster-js";
import { AlchemyProvider } from "@ethersproject/providers";

const userRegistry = new UserRegistry(new AlchemyProvider("goerli"));

// by username
await userRegistry.lookupByUsername("dwr");

// by address
await userRegistry.lookupByAddress(
  "0xEfCbF0a3C475780A4eD25158E35F528d929C9A23"
);
