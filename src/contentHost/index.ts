import { Message } from "../api";

export type SignedCast = Omit<Message, "meta">;

export * from "./farcasterHost";
