import { Wallet } from "@ethersproject/wallet";
import { FarcasterGuardianContentHost, SignedCast } from "./contentHost";
import { Farcaster } from "./farcaster";
import { AddressActivity } from "./api";

const _defaultFarcaster = new Farcaster();

/**
 * Signs and publishes a simple text string.
 * The cast will be attributed to the username currently registered
 * to the given private key's address.
 */
export async function publishCast(
  privateKey: string,
  text: string,
  replyTo?: AddressActivity | string
): Promise<SignedCast> {
  const contentHost = new FarcasterGuardianContentHost(privateKey);
  const signer = new Wallet(privateKey);
  const address = await signer.getAddress();
  const user = await _defaultFarcaster.usernameRegistry.lookupByAddress(
    address
  );
  if (user == null) {
    throw new Error(`no username registered for address ${address}`);
  }
  const unsignedCast = await _defaultFarcaster.prepareCast({
    fromUsername: user.username,
    text,
    replyTo,
  });
  const signedCast = await Farcaster.signCast(unsignedCast, signer);
  await contentHost.publishCast(signedCast);
  return signedCast;
}

export * from "./api";
export * from "./farcaster";
export * from "./contentHost";
export * from "./contracts";
export * from "./serialization";
export * from "./userRegistry";
