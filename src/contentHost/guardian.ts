import { getNetwork, Network, Networkish } from "@ethersproject/networks";
import { Wallet } from "@ethersproject/wallet";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { createJWT, ES256KSigner, Signer as JWTSigner } from "did-jwt";
import { ContentHost, SignedCast, Directory } from "..";

export class FarcasterGuardianContentHost implements ContentHost {
  readonly jwtSigner: JWTSigner;
  readonly canonicalNetwork: Network;
  readonly address: string;

  private readonly axiosInstance: AxiosInstance;

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
    if (axiosInstance == null) {
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

  async directoryUrl(): Promise<string> {
    return `https://${FarcasterGuardianContentHost.HOST}/origin/directory/${this.address}`;
  }

  async activityUrl(): Promise<string> {
    return `https://${FarcasterGuardianContentHost.HOST}/origin/address_activity/${this.address}`;
  }

  async publishCast(cast: SignedCast): Promise<void> {
    return await this.axiosInstance.post("/indexer/activity", cast);
  }

  async updateDirectory(newDirectory: Directory): Promise<void> {
    return await this.axiosInstance.post(`/indexer/directory/${this.address}`, {
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
