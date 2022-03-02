import { publishCast } from "farcaster";

const privateKey = "..."; // 64 character hex string
await publishCast(privateKey, "Hello, Farcaster!");
