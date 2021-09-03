import { Signer } from '@ethersproject/abstract-signer';
import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from '@ethersproject/strings';
import axios, { AxiosInstance } from 'axios';
import { setupCache } from 'axios-cache-adapter';
import { AddressActivity, AddressActivityBody, AddressActivityBodyType, Directory, TokenCommunity, User } from './types';

export const POST_CHARACTER_LIMIT = 280;

export interface PostRequest {
    text: string
    fromUsername: string
    sequence?: number
    replyTo?: AddressActivity | string
    tokenCommunities?: TokenCommunity[]
}

export type SignedPost = Omit<AddressActivity, 'meta'>;

export class Farcaster {
    usernameRegistry: UsernameRegistry;
    axiosInstance: AxiosInstance;
    constructor(usernameRegistry: UsernameRegistry = new Web2UsernameRegistry(), axiosInstance?: AxiosInstance) {
        this.usernameRegistry = usernameRegistry;
        if (!axiosInstance) {
            axiosInstance = axios.create({
                adapter: setupCache({}).adapter
            });
        }
        this.axiosInstance = axiosInstance;
    }

    // async createSignedPostSimple(text: string, replyTo?: AddressActivity | string): Promise<AddressActivity> {

    // }

    // async createSignedPost(signer: Signer, options: PostRequest): Promise<AddressActivity> {

    // }

    async preparePost(request: PostRequest): Promise<AddressActivityBody> {
        if (request.text.length >= POST_CHARACTER_LIMIT) {
            throw new Error(`Text length must be fewer than ${POST_CHARACTER_LIMIT} characters`);
        }

        let replyParentMerkleRoot: string | undefined;
        if (request.replyTo) {
            if (typeof request.replyTo === "string") {
                replyParentMerkleRoot = request.replyTo;
            } else {
                replyParentMerkleRoot = request.replyTo.merkleRoot;
            }
        }

        let prevMerkleRoot: string
        let address: string
        let sequence: number

        // lookup the latest activity from this user to populate the sequence number and continue the merkle tree
        const userActivity = await this.getLatestActivityForUser(request.fromUsername);
        if (!userActivity) {
            const user = await this.usernameRegistry.lookupUsername(request.fromUsername);
            address = user.address;
            prevMerkleRoot = keccak256(toUtf8Bytes(''));
            sequence = 0;
        } else {
            address = userActivity.body.address;
            prevMerkleRoot = userActivity.merkleRoot;
            sequence = userActivity.body.sequence + 1;
        }

        return {
            type: AddressActivityBodyType.TextShort,
            publishedAt: Date.now(),
            sequence,
            username: request.fromUsername,
            address,
            data: {
                text: request.text,
                replyParentMerkleRoot,
            },
            prevMerkleRoot,
            tokenCommunities: request.tokenCommunities,
        }
    }

    // async signPost(post: AddressActivityBody, signer: Signer): SignedPost {
    //     const merkleRoot = keccak256(utils.toUtf8Bytes(stringToHash));
    //     return {
    //         body: post,

    //     }
    // }

    async getLatestActivityForUser(username: string): Promise<AddressActivity | undefined> {
        let lastActivity: AddressActivity | undefined;
        for await (lastActivity of this.getAllActivityForUser(username)) { continue; }
        return lastActivity;
    }

    async* getAllActivityForUser(username: string, pageSize = 1000): AsyncGenerator<AddressActivity, void, undefined> {
        const user = await this.usernameRegistry.lookupUsername(username);
        const directoryResp = await this.axiosInstance.get<Directory>(user.directoryUrl);
        let currentPage: AddressActivity[] = [];
        let currentPageIdx = 1;
        do {
            const pageResp = await this.axiosInstance.get<AddressActivity[]>(
                directoryResp.data.body.addressActivityUrl,
                {
                    params: {
                        per_page: pageSize,
                        page: currentPageIdx,
                    }
                },
            )
            currentPage = pageResp.data;
            currentPageIdx++;
            yield* currentPage;
        } while (currentPage);
    }
}

export interface UsernameRegistry {
    lookupUsername(username: string): Promise<User>
}

export class Web2UsernameRegistry implements UsernameRegistry {
    static readonly DEFAULT_HOST = 'guardian.farcaster.xyz'
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
}
