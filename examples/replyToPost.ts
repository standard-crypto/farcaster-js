import Farcaster, { publishPost } from "farcaster";

const farcaster = new Farcaster();
const latestPost = await farcaster.getLatestActivityForUser("dwr");
const privateKey = "..."; // 64 character hex string
publishPost(privateKey, "Replying to your post!", latestPost);
