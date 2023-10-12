import { expect } from "chai";

export function expectDefinedNonNull<T>(arg: T): asserts arg is NonNullable<T> {
  expect(arg).to.not.be.undefined;
  expect(arg).to.not.be.null;
}
