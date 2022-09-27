import { Wallet } from "@ethersproject/wallet";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { createJWT, ES256KSigner, Signer as JWTSigner } from "did-jwt";
import { utils } from "ethers";
import { Message, SignedCast } from "..";
import { APIResult, User } from "../api";

/**
 * The default Web2 endpoint where all users casts and metadata are recorded.
 * To publish new activity, the host enforces JWT auth signed by the user's
 * Ethereum private key.
 */
export class FarcasterContentHost {
  readonly jwtSigner?: JWTSigner;

  private readonly axiosInstance: AxiosInstance;

  static readonly HOST = "api.farcaster.xyz";

  /**
   * @param axiosInstance Override for custom caching, rate limiting, etcetera
   */
  constructor(axiosInstance?: AxiosInstance) {
    if (axiosInstance == null) {
      axiosInstance = axios.create({
        baseURL: `https://${FarcasterContentHost.HOST}`,
        validateStatus: (status) => status >= 200 && status < 300,
      });
    }
    this.axiosInstance = axiosInstance;
  }

  /**
   * @param userOrAddress A full {@link User} object or an address hex string
   * @returns The most recent {@link Message} posted by this user, if any
   */
  async getLatestActivityForUser(
    userOrAddress: User | string
  ): Promise<Message | undefined> {
    // eslint-disable-next-line no-unreachable-loop
    for await (const activity of this.getAllActivityForUser(userOrAddress, {
      includeRecasts: true,
    })) {
      // return first result
      return activity;
    }
    // no activity
    return undefined;
  }

  /**
   * Yields all {@link Message Messages} from the given username, in order from most to least recent.
   * @param userOrAddress
   * @param __namedParameters.includeRecasts True if recasts should be returned, which will be presented as casts from other users
   */
  async *getAllActivityForUser(
    userOrAddress: User | string,
    { includeRecasts = false }: { includeRecasts?: boolean } = {}
  ): AsyncGenerator<Message, void, undefined> {
    const address =
      typeof userOrAddress === "string" ? userOrAddress : userOrAddress.address;

    utils.getAddress(address); // throw early if invalid address

    let nextPageURL: string | undefined = `/v1/profiles/${address}/casts`;

    while (nextPageURL !== undefined) {
      const pageResp: AxiosResponse<APIResult<{ casts: Message[] }>> =
        await this.axiosInstance.get(nextPageURL);
      for (const cast of pageResp.data.result.casts) {
        if (cast.meta.recast === true && !includeRecasts) continue;
        yield cast;
      }
      nextPageURL = pageResp.data.meta?.next;
    }
  }

  /**
   * @param cast A signed cast. @see {@link Farcaster.signCast} for building this parameter
   * @param wallet The same wallet used to sign the cast
   */
  async publishCast(cast: SignedCast, wallet: Wallet): Promise<void> {
    const authHeader = await this._authHeader(wallet);
    return await this.axiosInstance.post("/indexer/activity", cast, {
      headers: { authorization: authHeader },
      validateStatus: (status: number) => true,
    });
  }

  private async _authHeader(wallet: Wallet): Promise<string> {
    const address = wallet.address;
    const timeInEpochSeconds = Math.floor(Date.now() / 1000);
    const expiry = timeInEpochSeconds + 60;
    const jwtSigner = ES256KSigner(wallet.privateKey);
    const jwt = await createJWT(
      { exp: expiry },
      {
        // cspell:disable-next-line
        issuer: `did:ethr:rinkeby:${address}`, // still 'rinkeby' not 'goerli,' despite the migration
        signer: jwtSigner,
      },
      { alg: "ES256K" }
    );
    return `Bearer ${jwt}`;
  }
}
