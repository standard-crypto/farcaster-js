import { publishCast } from "@standard-crypto/farcaster-js";

const privateKey = "..."; // 64 character hex string
await publishCast(privateKey, "Hello, Farcaster!");
