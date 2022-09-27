import { Farcaster } from "@standard-crypto/farcaster-js";
import { AlchemyProvider } from "@ethersproject/providers";

const farcaster = new Farcaster(new AlchemyProvider("goerli"));
for await (const activity of farcaster.getAllActivityForUser("dwr", {
  includeRecasts: false,
})) {
  console.log(activity.body.data.text);
}
