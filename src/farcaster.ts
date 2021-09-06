import { Signer } from '@ethersproject/abstract-signer';
import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from '@ethersproject/strings';
import { verifyMessage } from '@ethersproject/wallet';
import axios, { AxiosInstance } from 'axios';
import { setupCache } from 'axios-cache-adapter';
import { ContentHost } from './contentHost';
import { AddressActivity, AddressActivityBody, AddressActivityBodyType, Directory, DirectoryBody, TokenCommunity } from './types/api';
import { serializeDirectoryBody, serializeAddressActivityBody } from "./serialization";
import { UserRegistry, Web2UserRegistry } from './userRegistry';

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
    readonly usernameRegistry: UserRegistry;
    readonly axiosInstance: AxiosInstance;
    constructor(usernameRegistry: UserRegistry = new Web2UserRegistry(), axiosInstance?: AxiosInstance) {
        this.usernameRegistry = usernameRegistry;
        if (!axiosInstance) {
            axiosInstance = axios.create({
                adapter: setupCache({}).adapter,
                validateStatus: (status) => status >= 200 && status < 300,
            });
        }
        this.axiosInstance = axiosInstance;
    }

    async updateDirectory(username: string, signer: Signer, contentHost: ContentHost, updates: UpdateDirectoryRequest): Promise<Directory> {
        const user = await this.usernameRegistry.lookupByUsername(username);
        if (!user) {
            throw new Error(`no such user with username ${username}`);
        }
        if (user.address !== await signer.getAddress()) {
            throw new Error(`The registered address ${user.address} for user ${username} does not match the address of the provided signer: ${signer.getAddress()}`)
        }
        const currentDirectory = (await this.axiosInstance.get<Directory>(user.directoryUrl)).data;
        const newDirectoryBody: DirectoryBody = {
            ...currentDirectory.body,
            ...updates,
            timestamp: Date.now(),
        };
        const newDirectory = await Farcaster.signDirectory(newDirectoryBody, signer);
        await contentHost.updateDirectory(user.address, newDirectory);
        return newDirectory;
    }

    static async signDirectory(directoryBody: DirectoryBody, signer: Signer): Promise<Directory> {
        const serializedDirectoryBody = serializeDirectoryBody(directoryBody);
        const merkleRoot = keccak256(toUtf8Bytes(serializedDirectoryBody));
        const signature = await signer.signMessage(merkleRoot);
        return {
            body: directoryBody,
            merkleRoot,
            signature,
        }
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
            const user = await this.usernameRegistry.lookupByUsername(request.fromUsername);
            if (!user) {
                throw new Error(`no such user with username ${request.fromUsername}`);
            }
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

    static async signPost(post: AddressActivityBody, signer: Signer): Promise<SignedPost> {
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

    static async isValidDirectorySignature(address: string, directory: Directory): Promise<boolean> {
        const serializedDirectoryBody = serializeDirectoryBody(directory.body);
        const derivedMerkleRoot = keccak256(toUtf8Bytes(serializedDirectoryBody));
        const signerAddress = verifyMessage(derivedMerkleRoot, directory.signature);
        return signerAddress === address && derivedMerkleRoot === directory.merkleRoot;
    }

    static async isValidAddressActivitySignature(address: string, addressActivity: AddressActivity | SignedPost): Promise<boolean> {
        const serializedPost = serializeAddressActivityBody(addressActivity.body);
        const derivedMerkleRoot = keccak256(toUtf8Bytes(serializedPost));
        const signerAddress = verifyMessage(derivedMerkleRoot, addressActivity.signature);
        return signerAddress === address && derivedMerkleRoot == addressActivity.merkleRoot;
    }

    async getLatestActivityForUser(username: string): Promise<AddressActivity | undefined> {
        for await (const activity of this.getAllActivityForUser(username)) {
            // return first result
            return activity;
        }
        // no activity
        return undefined;
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
        const user = await this.usernameRegistry.lookupByUsername(username);
        if (!user) {
            throw new Error(`no such user with username ${username}`);
        }
        const directoryResp = await this.axiosInstance.get<Directory>(user.directoryUrl);
        return directoryResp.data;
    }
}
