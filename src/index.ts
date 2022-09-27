import { Wallet } from "@ethersproject/wallet";
import { FarcasterContentHost, SignedCast } from "./contentHost";
import { Farcaster } from "./farcaster";
import { Message } from "./api";

const _defaultFarcaster = new Farcaster();

/**
 * Signs and publishes a simple text string.
 * The cast will be attributed to the username currently registered
 * to the given private key's address.
 */
export async function publishCast(
  wallet: Wallet,
  text: string,
  replyTo?: Message | string
): Promise<SignedCast> {
  const contentHost = new FarcasterContentHost();

  const address = wallet.address;
  const user = await _defaultFarcaster.userRegistry.lookupByAddress(address);
  if (user == null) {
    throw new Error(`no username registered for address ${address}`);
  }
  const unsignedCast = await _defaultFarcaster.prepareCast({
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
