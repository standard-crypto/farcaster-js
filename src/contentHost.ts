import { getNetwork, Network, Networkish } from "@ethersproject/networks";
import { Wallet } from "@ethersproject/wallet";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { createJWT, ES256KSigner, Signer as JWTSigner } from "did-jwt";
import { SignedPost } from "./farcaster";
import { Directory } from "./api";

export interface ContentHost {
  publishPost(post: SignedPost): Promise<void>;
  updateDirectory(address: string, newDirectory: Directory): Promise<void>;
}

export class FarcasterGuardianContentHost implements ContentHost {
  readonly jwtSigner: JWTSigner;
  readonly canonicalNetwork: Network;
  readonly address: string;
  readonly axiosInstance: AxiosInstance;

  static readonly HOST = "guardian.farcaster.xyz";

  constructor(
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
      this._axiosIntercepter.bind(this)
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

  private async _axiosIntercepter(
    request: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> {
    const timeinEpochSeconds = Math.floor(Date.now() / 1000);
    const expiry = timeinEpochSeconds + 60;
    const jwt = await createJWT(
      { exp: expiry },
      {
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
