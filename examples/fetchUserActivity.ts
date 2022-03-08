import Farcaster from "@standard-crypto/farcaster-js";

const farcaster = new Farcaster();
for await (const activity of farcaster.getAllActivityForUser("dwr")) {
  console.log(activity.body.data.text);
}
