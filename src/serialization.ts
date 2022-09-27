import { MessageBody } from "./api";

/**
 * Returns the canonical serialization of a {@link MessageBody}.
 * Required for producing and verifying signatures.
 */
export function serializeMessageBody(body: MessageBody): string {
  const canonicalForm: MessageBody = {
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
