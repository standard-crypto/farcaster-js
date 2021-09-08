import { InfuraProvider } from "@ethersproject/providers";
import { Web3UserRegistry } from "farcaster";

const provider = new InfuraProvider("rinkeby");
const userRegistry = new Web3UserRegistry(provider);
console.log(await userRegistry.lookupByUsername("dwr"));
