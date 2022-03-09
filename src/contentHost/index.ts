import { Directory, AddressActivity } from "../api";

export type SignedCast = Omit<AddressActivity, "meta">;

/**
 * An interface for publishing updates to a user's directory or for publishing new activity for a user.
 * The default content host for all users is guardian.farcaster.xyz. In the case that a user chooses
 * to host their directory and/or their content separately (such as when self-hosting their content),
 * the user will need to use a different implementation of ContentHost, or use a
 * {@link FarcasterGuardianContentHost} with an overridden baseURL if the host implements the same API
 * as guardian.farcaster.xyz
 */
export interface ContentHost {
  publishCast: (cast: SignedCast) => Promise<void>;
  updateDirectory: (newDirectory: Directory) => Promise<void>;
  directoryUrl: () => Promise<string>;
  activityUrl: () => Promise<string>;
}

/**
 * The default {@link ContentHost} for all users. To publish new activity or directory updates, the
 * host enforces JWT auth signed by the user's Ethereum private key.
 */

export * from "./guardian";
export * from "./github";
