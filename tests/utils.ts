import { expect } from "chai";

export function expectDefined<T>(arg: T): asserts arg is NonNullable<T> {
  expect(arg).to.not.be.undefined;
}
