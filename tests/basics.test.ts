import { test } from "node:test";
import assert from "node:assert/strict";
import { describe as describeValue, distance, swapPair, opposite, clamp } from "../src/basics/types.ts";
import { sum, parse, compose, pipe, memoize, once, curry3 } from "../src/basics/functions.ts";
import { pick, omit, invert, deepEqual, getPath } from "../src/basics/objects.ts";
import { area, render, toArray, formatId } from "../src/basics/unions.ts";

test("describe narrows unknown values", () => {
  assert.equal(describeValue("hey"), "string(3)");
  assert.equal(describeValue(2.5), "float");
  assert.equal(describeValue(null), "null");
});

test("distance and swapPair", () => {
  assert.equal(distance({ x: 0, y: 0 }, { x: 3, y: 4 }), 5);
  assert.deepEqual(swapPair(["a", 1]), [1, "a"]);
});

test("opposite direction and clamp", () => {
  assert.equal(opposite("east"), "west");
  assert.equal(clamp(5, 0, 3), 3);
});

test("sum and parse overloads", () => {
  assert.equal(sum(1, 2, 3), 6);
  assert.deepEqual(parse(["1", "2"]), [1, 2]);
});

test("compose and pipe", () => {
  const inc = (n: number) => n + 1;
  const dbl = (n: number) => n * 2;
  assert.equal(compose(inc, dbl)(5), 11);
  assert.equal(pipe(5, inc, dbl), 12);
});

test("memoize only calls once per input", () => {
  let calls = 0;
  const sq = memoize((n: number) => (calls++, n * n));
  sq(4);
  sq(4);
  assert.equal(calls, 1);
});

test("once and curry3", () => {
  const init = once(() => Math.random());
  assert.equal(init(), init());
  assert.equal(curry3((a: number, b: number, c: number) => a + b * c)(1)(2)(3), 7);
});
