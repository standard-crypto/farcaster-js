/**
 * Representation of a Farcaster user
 */
export interface User {
  /** The user's username (without the leading '@') */
  username: string;
  /** The location of this user's {@link Directory} */
  directoryUrl: string;
  /** Timestamp in epoch seconds */
  createdAt: string;
  /** Timestamp in epoch seconds */
  modifiedAt: string;
  /** The user's currently registered Ethereum address */
  address: string;
}

export interface Directory {
  body: DirectoryBody;
  /** keccak256 hash of the JSON serialized `body` */
  merkleRoot: string;
  signature: string;
}

/**
 * Details of a {@link User}'s {@link Directory}
 */
export interface DirectoryBody {
  /** Location of the record of this {@link User}'s activity */
  addressActivityUrl: string;
  /** Location of this {@link User}'s avatar image */
  avatarUrl: string;
  /** {@link User}'s display name */
  displayName: string;
  /** Location of the merkle proof for this {@link User}'s {@link Directory} */
  proofUrl: string;
  /** Timestamp in epoch milliseconds */
  timestamp: number;
  version: number;
}

export enum AddressActivityBodyType {
  TextShort = "text-short",
}

export interface AddressActivity {
  body: AddressActivityBody;
  merkleRoot: string;
  signature: string;
  meta: Meta;
}

/**
 * Some activity published by a user, such as a short text cast.
 */
export interface AddressActivityBody {
  /** The type of activity this represents */
  type: AddressActivityBodyType;
  /** Timestamp in epoch milliseconds */
  publishedAt: number;
  /** The index of this action in the sequence of all activity by this user. Zero-indexed. */
  sequence: number;
  username: string;
  /** The address owning the user at the time this was published */
  address: string;
  data: {
    text: string;
    replyParentMerkleRoot?: string;
  };
  /** The `merkleRoot` value of the previous action by this user */
  prevMerkleRoot: string;
  tokenCommunities?: TokenCommunity[];
}

export interface TokenCommunity {
  token: string;
}

export interface Meta {
  displayName: string;
  avatar: string;
  isVerifiedAvatar: boolean;
  numReplyChildren: number;
  reactions: Reactions;
  mentions?: ReplyParentUsername[];
  replyParentUsername?: ReplyParentUsername;
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
