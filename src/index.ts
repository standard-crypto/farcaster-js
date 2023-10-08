import { Wallet } from "ethers";
import { MerkleAPIClient } from "./merkleAPI";
import { Cast } from "./merkleAPI/swagger";

/**
 * Publishes a cast with a simple text body.
 *
 * The cast will be attributed to the username currently registered
 * to the given wallet's address.
 *
 * This function provided as a shorthand to skip initialization of a MerkleAPIClient instance.
 *
 * Note that by doing so, this function circumvents any efficient reuse of auth tokens and any
 * caching or rate limit behaviors that may be implemented by MerkleAPIClient.
 *
 * @param wallet A Wallet derived from a private key or mnemonic phrase
 * @param text The text to be cast
 * @param replyTo A complete Cast (or its hash and author fid) that this cast will reply to. Omit if not replying.
 */
export async function publishCast(
  wallet: Wallet,
  text: string,
  replyTo?: Cast | { fid: number; hash: string },
  embeds?: string[]
): Promise<Cast> {
  const merkleAPI = new MerkleAPIClient(wallet);
  return await merkleAPI.publishCast(text, replyTo, embeds);
}

export * from "./merkleAPI";
export * from "./hub-rest-client";
