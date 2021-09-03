import { AxiosRequestConfig } from 'axios';
import { ES256KSigner, createJWT } from 'did-jwt';
import { Networkish, getNetwork } from '@ethersproject/networks';
import { Wallet } from '@ethersproject/wallet';

export interface ActivityHostAuth {
    (value: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig>
}

export function FarcasterGuardianAuth(privateKey: string | Uint8Array, network: Networkish = 'rinkeby'): ActivityHostAuth {
    const signer = ES256KSigner(privateKey);
    const canonicalNetwork = getNetwork(network);
    const address = new Wallet(privateKey).address;
    return async (request: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        const timeinEpochSeconds = Math.floor(Date.now() / 1000);
        const expiry = timeinEpochSeconds + 60;
        const jwt = await createJWT(
            { exp: expiry },
            { issuer: `did:ethr:${canonicalNetwork.name}:${address}`, signer },
            { alg: 'ES256K' }
        );
        request.headers = {
            ...request.headers,
            authorization: `Bearer ${jwt}`,
        };
        return request;
    }
}

export function ReadonlyActivityHostAuth(): ActivityHostAuth {
    return async (request: AxiosRequestConfig): Promise<AxiosRequestConfig> => request;
}
