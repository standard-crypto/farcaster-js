import { publishPost } from "farcaster";

const privateKey = "..."; // 64 character hex string
await publishPost(privateKey, "Hello, Farcaster!");
