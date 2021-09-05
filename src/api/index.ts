import { Signer } from '@ethersproject/abstract-signer';
import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from '@ethersproject/strings';
import axios, { AxiosInstance } from 'axios';
import { setupCache } from 'axios-cache-adapter';
import { ContentHost } from './contentHost';
import { AddressActivity, AddressActivityBody, AddressActivityBodyType, Directory, DirectoryBody, serializeAddressActivityBody, TokenCommunity, serializeDirectoryBody } from './types';
import { UsernameRegistry, Web2UsernameRegistry } from './usernameRegistry';

export const POST_CHARACTER_LIMIT = 280;

export interface PostRequest {
    text: string
    fromUsername: string
    sequence?: number
    replyTo?: AddressActivity | string
    tokenCommunities?: TokenCommunity[]
}

export type UpdateDirectoryRequest = Omit<Partial<DirectoryBody>, 'timestamp' | 'version'>

export type SignedPost = Omit<AddressActivity, 'meta'>;

export class Farcaster {
    readonly usernameRegistry: UsernameRegistry;
    readonly axiosInstance: AxiosInstance;
    constructor(usernameRegistry: UsernameRegistry = new Web2UsernameRegistry(), axiosInstance?: AxiosInstance) {
        this.usernameRegistry = usernameRegistry;
        if (!axiosInstance) {
            axiosInstance = axios.create({
                adapter: setupCache({}).adapter
            });
        }
        this.axiosInstance = axiosInstance;
    }

    // async postSimple(text: string, replyTo?: AddressActivity | string): Promise<SignedPost> {
    //     const preparedPost = 
    // }

    async updateDirectory(username: string, signer: Signer, contentHost: ContentHost, updates: UpdateDirectoryRequest): Promise<Directory> {
        const user = await this.usernameRegistry.lookupUsername(username);
        if (user.address !== await signer.getAddress()) {
            throw new Error(`The registered address ${user.address} for user ${username} does not match the address of the provided signer: ${signer.getAddress()}`)
        }
        const currentDirectory = (await this.axiosInstance.get<Directory>(user.directoryUrl)).data;
        const newDirectoryBody: DirectoryBody = {
            ...currentDirectory.body,
            ...updates,
            timestamp: Date.now(),
        };
        const serializedDirectoryBody = serializeDirectoryBody(newDirectoryBody);
        const merkleRoot = keccak256(toUtf8Bytes(serializedDirectoryBody));
        const signature = await signer.signMessage(merkleRoot);
        const newDirectory: Directory = {
            body: newDirectoryBody,
            merkleRoot,
            signature,
        }
        await contentHost.updateDirectory(user.address, newDirectory);
        return newDirectory;
    }

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

    async signPost(post: AddressActivityBody, signer: Signer): Promise<SignedPost> {
        if (post.address !== await signer.getAddress()) {
            throw new Error(`The address ${post.address} for user ${post.username} does not match the address of the provided signer: ${signer.getAddress()}`)
        }
        const serializedPost = serializeAddressActivityBody(post);
        const merkleRoot = keccak256(toUtf8Bytes(serializedPost));
        const signature = await signer.signMessage(merkleRoot);
        return {
            body: post,
            merkleRoot,
            signature,
        };
    }

    async getLatestActivityForUser(username: string): Promise<AddressActivity | undefined> {
        let lastActivity: AddressActivity | undefined;
        for await (lastActivity of this.getAllActivityForUser(username)) { continue; }
        return lastActivity;
    }

    async* getAllActivityForUser(username: string, pageSize = 1000): AsyncGenerator<AddressActivity, void, undefined> {
        const directory = await this.getDirectory(username);
        let currentPage: AddressActivity[] = [];
        let currentPageIdx = 1;
        do {
            const pageResp = await this.axiosInstance.get<AddressActivity[]>(
                directory.body.addressActivityUrl,
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

    async getDirectory(username: string): Promise<Directory> {
        const user = await this.usernameRegistry.lookupUsername(username);
        const directoryResp = await this.axiosInstance.get<Directory>(user.directoryUrl);
        return directoryResp.data;
    }
}
