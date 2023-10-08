// import { Modify, WithRequired } from "../common/typeUtils";
import {
  CastAddBody,
  FarcasterNetwork,
  Message,
  MessageType,
  ReactionBody,
} from "./openapi";
import type { OverrideProperties } from "type-fest";
import * as FarcasterEpochTimestamp from "./farcasterEpochTimestamp";

export interface MessageDataCastAdd {
  type: MessageType.CastAdd;
  fid: number;
  timestamp: Date;
  network: FarcasterNetwork;
  castAddBody: CastAddBody;
}

export interface MessageDataReaction {
  type: MessageType.ReactionAdd;
  fid: number;
  timestamp: Date;
  network: FarcasterNetwork;
  reactionBody: ReactionBody;
}

export type CastAdd = OverrideProperties<Message, { data: MessageDataCastAdd }>;

export type Reaction = OverrideProperties<
  Message,
  { data: MessageDataReaction }
>;

export function parseCastAdd(message: Message): CastAdd {
  if (message.data.type !== MessageType.CastAdd) {
    throw new Error(
      `Cast type is ${message.data.type}, not ${MessageType.CastAdd}`
    );
  }
  return {
    ...message,
    data: {
      ...message.data,
      type: MessageType.CastAdd,
      get timestamp() {
        return FarcasterEpochTimestamp.parse(message.data.timestamp);
      },
    },
  };
}

export function parseReaction(message: Message): Reaction {
  if (message.data.type !== MessageType.ReactionAdd) {
    throw new Error(
      `Cast type is ${message.data.type}, not ${MessageType.ReactionAdd}`
    );
  }
  return {
    ...message,
    data: {
      ...message.data,
      type: MessageType.ReactionAdd,
      get timestamp() {
        return FarcasterEpochTimestamp.parse(message.data.timestamp);
      },
    },
  };
}
