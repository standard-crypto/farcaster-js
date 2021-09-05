
/**
 * Representation of a Farcaster user
 * @property username The user's username (without the leading '@')
 * @property directoryUrl The location of this user's {@link Directory}
 * @property createdAt Timestamp in epoch seconds
 * @property modifiedAt Timestamp in epoch seconds
 * @property address The user's currently registered Ethereum address, ex: `0x9B7A28F509C47A65bA44d2C08123334083f87a49`
 */
export interface User {
    username: string
    directoryUrl: string
    createdAt: string // epoch seconds
    modifiedAt: string // epoch seconds
    address: string
}

export interface Directory {
    body: DirectoryBody
    merkleRoot: string
    signature: string
}

/**
 * Details of a {@link User}'s {@link Directory}
 * 
 * @property addressActivityUrl Location of the record of this {@link User}'s activity
 * @property avatarUrl Location of this {@link User}'s avatar image
 * @property displayName {@link User}'s display name
 * @property proofUrl Location of the merkle proof for this {@link User}'s {@link Directory}
 * @property timestamp Timestamp in epoch milliseconds
 * @property version Directory version
 */
export interface DirectoryBody {
    addressActivityUrl: string
    avatarUrl: string
    displayName: string
    proofUrl: string
    timestamp: number
    version: number
}

export enum AddressActivityBodyType {
    TextShort = "text-short"
}

export interface AddressActivity {
    body: AddressActivityBody
    merkleRoot: string
    signature: string
    meta: Meta
}

/**
 * @property publishedAt Timestamp in epoch milliseconds
 */
export interface AddressActivityBody {
    type: AddressActivityBodyType
    publishedAt: number
    sequence: number
    username: string
    address: string
    data: {
        text: string
        replyParentMerkleRoot?: string
    }
    prevMerkleRoot: string
    tokenCommunities?: TokenCommunity[]
}

export interface TokenCommunity {
    token: string;
}

export interface Meta {
    displayName: string
    avatar: string
    isVerifiedAvatar: boolean
    numReplyChildren: number
    reactions: Reactions
    mentions?: ReplyParentUsername[]
    replyParentUsername?: ReplyParentUsername
}

export interface ReplyParentUsername {
    address: string;
    username: string;
}

export interface Reactions {
    count: number;
    type: ReactionType;
    self: boolean;
}

export enum ReactionType {
    Like = "Like",
}

export function serializeAddressActivityBody(body: AddressActivityBody): string {
    const canonicalForm: AddressActivityBody = {
        type: body.type,
        publishedAt: body.publishedAt,
        sequence: body.sequence,
        username: body.username,
        address: body.address,
        data: {
            text: body.data.text,
            replyParentMerkleRoot: body.data.replyParentMerkleRoot,
        },
        prevMerkleRoot: body.prevMerkleRoot,
        tokenCommunities: body.tokenCommunities,
    };
    return JSON.stringify(canonicalForm);
}

export function serializeDirectoryBody(body: DirectoryBody): string {
    const canonicalForm: DirectoryBody = {
        addressActivityUrl: body.addressActivityUrl,
        avatarUrl: body.avatarUrl,
        displayName: body.displayName,
        proofUrl: body.proofUrl,
        timestamp: body.timestamp,
        version: body.version,
    };
    return JSON.stringify(canonicalForm);
}
