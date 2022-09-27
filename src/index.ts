import { Wallet } from "@ethersproject/wallet";
import { SignedCast } from "./contentHost";
import { Farcaster } from "./farcaster";
import { Message } from "./api";
import { Provider } from "@ethersproject/providers";

/**
 * Signs and publishes a simple text string.
 * The cast will be attributed to the username currently registered
 * to the given private key's address.
 * @param wallet A Wallet derived from a private key or mnemonic phrase
 * @param web3Provider A Provider instance (Infura/Alchemy/etc)
 * @param text The text to be cast
 * @param replyTo A complete {@link Message}, or the {@link Message.merkleRoot} of a message, that this cast will reply to. Omit if not replying to any casts.
 */
export async function publishCast(
  wallet: Wallet,
  web3Provider: Provider,
  text: string,
  replyTo?: Message | string
): Promise<SignedCast> {
  const farcaster = new Farcaster(web3Provider);
  const contentHost = farcaster.contentHost;

  const address = wallet.address;
  const user = await farcaster.userRegistry.lookupByAddress(address);
  if (user == null) {
    throw new Error(`no username registered for address ${address}`);
  }
  const unsignedCast = await farcaster.prepareCast({
    fromUsername: user.username,
    text,
    replyTo,
  });
  const signedCast = await Farcaster.signCast(unsignedCast, wallet);
  await contentHost.publishCast(signedCast, wallet);
  return signedCast;
}

export * from "./api";
export * from "./farcaster";
export * from "./contentHost";
export * from "./contracts";
export * from "./serialization";
export * from "./userRegistry";
