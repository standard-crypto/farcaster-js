import { Signer } from '@ethersproject/abstract-signer';
import axios, { AxiosInstance } from 'axios';
import { setupCache } from 'axios-cache-adapter';
import { User } from './types';


export interface UserRegistry {
    lookupByUsername(username: string): Promise<User | undefined>;
    lookupByAddress(address: string): Promise<User | undefined>;
    getAllUsers(): AsyncGenerator<User, void, undefined>;
    changeAddress(username: string, newAddress: string, signer: Signer): Promise<void>;
}

export class Web2UserRegistry implements UserRegistry {
    static readonly DEFAULT_HOST = 'guardian.farcaster.xyz';

    readonly axiosInstance: AxiosInstance;

    constructor(axiosInstance?: AxiosInstance) {
        if (!axiosInstance) {
            axiosInstance = axios.create({
                baseURL: `https://${Web2UserRegistry.DEFAULT_HOST}/admin`,
                adapter: setupCache({}).adapter,
                validateStatus: (status) => status >= 200 && status < 300,
            });
        }
        this.axiosInstance = axiosInstance;
    }

    async lookupByUsername(username: string): Promise<User | undefined> {
        const resp = await this.axiosInstance.get<User>(
            `/usernames/${username}`,
            { validateStatus: (status) => status === 200 || status === 404 }
        );
        if (resp.status == 404) {
            return undefined;
        }
        return resp.data;
    }

    async lookupByAddress(address: string): Promise<User | undefined> {
        for await (const user of this.getAllUsers()) {
            if (user.address === address) {
                return user;
            }
        }
        return undefined;
    }

    async changeAddress(username: string, newAddress: string, signer: Signer): Promise<void> {
        throw new Error("changing address not yet implemented");
    }

    async* getAllUsers(): AsyncGenerator<User, void, undefined> {
        const allUsernamesResp = await this.axiosInstance.get<User[]>('usernames');
        yield* allUsernamesResp.data;
    }
}
