/**
 * Utilities for interacting with serialized timestamps in the
 * Farcaster protocol. See [Farcaster docs](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#timestamps)
 * for more information.
 * @module
 */

export const START = new Date("01 Jan 2021 00:00:00 UTC");

/**
 * Parses a Farcaster timestamp
 * @param timestamp seconds since Jan 1, 2021 00:00:00UTC
 * @returns 
 */
export function parse(timestamp: number): Date {
  return new Date(START.getTime() + timestamp * 1000);
}

/**
 * Serialized a timestamp to seconds since the Farcaster epoch
 * @param d timestamp as a Date instance
 * @returns 
 */
export function serialize(d: Date): number {
  return (d.getTime() - START.getTime()) / 1000;
}
