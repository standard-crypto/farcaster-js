import { Ed25519Signer, HubAsyncResult, HubError } from "@farcaster/core";
import { err, ok } from "neverthrow";

/**
 * External Ed25519 signer that allows signatures to be computed by an external service.
 */
export class ExternalEd25519Signer extends Ed25519Signer {

    private _signMessageHash: (messageHash: Uint8Array) => Promise<Uint8Array>;
    private _getSignerKey: () => Promise<Uint8Array>;
  
    /**
     * Creates a new ExternalEd25519Signer. This class allows the signing of Farcaster message hashes to be delegated to an external service
     * such that a private key is not required to be in memory.
     * 
     * @param signMessageHash Proxy function that signs a message hash. Called internally by signMessageHash.
     * @param getSignerKey Proxy function that returns the public key of the signer. Called internally by getSignerKey.
     */
    constructor(signMessageHash: (messageHash: Uint8Array) => Promise<Uint8Array>, getSignerKey: () => Promise<Uint8Array>) {
      super();
      this._signMessageHash = signMessageHash;
      this._getSignerKey = getSignerKey;
    }
  
    /**
     * Returns the public key of the signer as a Uint8Array.
     * 
     * @returns public key of the signer
     */
    public async getSignerKey(): HubAsyncResult<Uint8Array> {
        try {
            return ok(await this._getSignerKey());
        } catch (e) {
            return err(new HubError("unknown", e instanceof Error ? e.message : "Unable to get signer key"));
        }
    }
    
    /**
     * Signs a Farcaster message hash.
     * 
     * @param hash blake3 hash of the Farcaster message to be signed
     * @returns signature of the hash
     */
    public async signMessageHash(hash: Uint8Array): HubAsyncResult<Uint8Array> {
        try {
            const signature = await this._signMessageHash(hash);
            return ok(signature);
        } catch (e) {
            return err(new HubError("unknown", e instanceof Error ? e.message : "Unable to get signer key"));
        }
    }
    
}
