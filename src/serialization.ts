import { AddressActivityBody, DirectoryBody } from "./api";

/**
 * Returns the canonical serialization of an {@link AddressActivityBody}.
 * Required for producing and verifying signatures.
 */
export function serializeAddressActivityBody(
  body: AddressActivityBody
): string {
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

/**
 * Returns the canonical serialization of a {@link DirectoryBody}.
 * Required for producing and verifying signatures.
 */
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
