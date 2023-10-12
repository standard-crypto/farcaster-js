export const START = new Date("01 Jan 2021 00:00:00 UTC");

export function parse(timestamp: number): Date {
  return new Date(START.getTime() + timestamp * 1000);
}

export function serialize(d: Date): number {
  return (d.getTime() - START.getTime()) / 1000;
}
