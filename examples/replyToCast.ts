import { Farcaster, publishCast } from "@standard-crypto/farcaster-js";

const farcaster = new Farcaster();
const latestCast = await farcaster.getLatestActivityForUser("dwr");
const privateKey = "..."; // 64 character hex string
publishCast(privateKey, "Replying to your cast!", latestCast);
