import test from "ava";
import { foo, bar } from "../index";

test("foo()", (t) => {
  t.is(foo(1, 2), 3);
});

test("bar()", (t) => {
  t.is(bar(2, 1), 1);
});
