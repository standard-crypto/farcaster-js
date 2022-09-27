import { BigNumber } from "@ethersproject/bignumber";

/**
 * Generic response type returned by requests to api.farcaster.xyz
 */
export interface APIResult<DataType> {
  result: DataType;
  meta?: {
    next?: string;
  };
}

/**
 * Rich representation of a Farcaster user, including metadata
 */
export interface User {
  /** The user's registered Ethereum address */
  address: string;
  /** The user's currently assigned username (without the leading '@') */
  username: string;
  /** The user's full display name */
  displayName: string;
  /**
   * The permanent ID associated with a user
   * (as opposed to usernames, which can be transferred and changed)
   */
  farcasterId: BigNumber;
  /** Details for the user's avatar */
  avatar: {
    url: string;
    isVerified: boolean;
  };
  followerCount: number;
  followingCount: number;
  isViewerFollowing: boolean;
  isFollowingViewer: boolean;
  profile: {
    bio: {
      text: string;
      mentions: string[];
    };
    directMessageTargets?: {
      telegram?: string; // format is https://t.me/USERNAME
    };
  };
  referrerUsername: string;
  viewerCanSendDirectCasts: boolean;
}

export enum MessageBodyType {
  TextShort = "text-short",
}

export interface Message {
  body: MessageBody;
  merkleRoot: string;
  signature: string;
  meta: Meta;
}

/**
 * A message published by a user, such as a short text cast.
 */
export interface MessageBody {
  /** The type of message this represents */
  type: MessageBodyType;
  /** Timestamp in epoch milliseconds */
  publishedAt: number;
  /** The index of this action in the sequence of all messages by this user. Zero-indexed. */
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
  recasters?: Omit<User, "farcasterId">;
  recasts?: {
    count: number;
    self: boolean;
  };
  watches?: {
    count: number;
    self: boolean;
  };
  recast?: boolean;
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
