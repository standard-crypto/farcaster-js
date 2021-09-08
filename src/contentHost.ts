import { getNetwork, Network, Networkish } from "@ethersproject/networks";
import { Wallet } from "@ethersproject/wallet";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { createJWT, ES256KSigner, Signer as JWTSigner } from "did-jwt";
import { Directory, AddressActivity } from "./api";

export type SignedPost = Omit<AddressActivity, "meta">;

/**
 * An interface for publishing updates to a user's directory or for publishing new activity for a user.
 * The default content host for all users is guardian.farcaster.xyz. In the case that a user chooses
 * to host their directory and/or their content separately (such as when self-hosting their content),
 * the user will need to use a different implementation of ContentHost, or use a
 * {@link FarcasterGuardianContentHost} with an overridden baseURL if the host implements the same API
 * as guardian.farcaster.xyz
 */
export interface ContentHost {
  publishPost(post: SignedPost): Promise<void>;
  updateDirectory(address: string, newDirectory: Directory): Promise<void>;
}

/**
 * The default {@link ContentHost} for all users. To publish new activity or directory updates, the
 * host enforces JWT auth signed by the user's Ethereum private key.
 */
export class FarcasterGuardianContentHost implements ContentHost {
  readonly jwtSigner: JWTSigner;
  readonly canonicalNetwork: Network;
  readonly address: string;
  readonly axiosInstance: AxiosInstance;

  static readonly HOST = "guardian.farcaster.xyz";

  constructor(
    /** 64 character hex string or 32 byte array */
    privateKey: string | Uint8Array,
    network: Networkish = "rinkeby",
    axiosInstance?: AxiosInstance
  ) {
    this.jwtSigner = ES256KSigner(privateKey);
    this.canonicalNetwork = getNetwork(network);
    this.address = new Wallet(privateKey).address;
    if (!axiosInstance) {
      axiosInstance = axios.create({
        baseURL: `https://${FarcasterGuardianContentHost.HOST}`,
        validateStatus: (status) => status >= 200 && status < 300,
      });
    }
    this.axiosInstance = axiosInstance;
    this.axiosInstance.interceptors.request.use(
      this._axiosInterceptor.bind(this)
    );
  }

  async publishPost(post: SignedPost): Promise<void> {
    return this.axiosInstance.post("/indexer/activity", post);
  }

  async updateDirectory(
    address: string,
    newDirectory: Directory
  ): Promise<void> {
    return this.axiosInstance.post(`/indexer/directory/${address}`, {
      directory: newDirectory,
    });
  }

  private async _axiosInterceptor(
    request: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> {
    const timeInEpochSeconds = Math.floor(Date.now() / 1000);
    const expiry = timeInEpochSeconds + 60;
    const jwt = await createJWT(
      { exp: expiry },
      {
        // cspell:disable-next-line
        issuer: `did:ethr:${this.canonicalNetwork.name}:${this.address}`,
        signer: this.jwtSigner,
      },
      { alg: "ES256K" }
    );
    request.headers = {
      ...request.headers,
      authorization: `Bearer ${jwt}`,
    };
    return request;
  }
}
