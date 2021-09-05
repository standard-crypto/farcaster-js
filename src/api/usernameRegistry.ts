import { Signer } from '@ethersproject/abstract-signer';
import axios, { AxiosInstance } from 'axios';
import { setupCache } from 'axios-cache-adapter';
import { User } from './types';


export interface UsernameRegistry {
    lookupUsername(username: string): Promise<User>;
    changeAddress(username: string, newAddress: string, signer: Signer): Promise<void>;
}

export class Web2UsernameRegistry implements UsernameRegistry {
    static readonly DEFAULT_HOST = 'guardian.farcaster.xyz';
    axiosInstance: AxiosInstance;
    constructor(axiosInstance?: AxiosInstance) {
        if (!axiosInstance) {
            axiosInstance = axios.create({
                baseURL: `https://${Web2UsernameRegistry.DEFAULT_HOST}/admin`,
                adapter: setupCache({}).adapter,
            });
        }
        this.axiosInstance = axiosInstance;
    }
    async lookupUsername(username: string): Promise<User> {
        const resp = await this.axiosInstance.get<User>(`/usernames/${username}`);
        return resp.data;
    }
    async changeAddress(username: string, newAddress: string, signer: Signer): Promise<void> {
        throw new Error("changing address not yet implemented");
    }
}
