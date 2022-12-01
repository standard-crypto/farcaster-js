import { NotificationCastMention } from "./NotificationCastMention";
import { NotificationCastReaction } from "./NotificationCastReaction";
import { NotificationCastReply } from "./NotificationCastReply";
import { NotificationFollow } from "./NotificationFollow";
import { NotificationRecast } from "./NotificationRecast";
import { NotificationWatchedCastReply } from "./NotificationWatchedCastReply";

export type Notification =
  | NotificationCastMention
  | NotificationCastReaction
  | NotificationCastReply
  | NotificationFollow
  | NotificationRecast
  | NotificationWatchedCastReply;
