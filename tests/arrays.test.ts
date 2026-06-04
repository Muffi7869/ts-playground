import { test } from "node:test";
import assert from "node:assert/strict";
import { chunk, unique, groupBy, partition, zip, range, sortBy, countBy } from "../src/basics/arrays.ts";

test("chunk splits evenly and keeps the remainder", () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});

test("unique keeps first occurrence order", () => {
  assert.deepEqual(unique([3, 1, 3, 2, 1]), [3, 1, 2]);
});

test("groupBy groups words by length", () => {
  assert.deepEqual(groupBy(["a", "bb", "cc", "d"], (w) => w.length), { 1: ["a", "d"], 2: ["bb", "cc"] });
});

test("partition splits by predicate", () => {
  assert.deepEqual(partition([1, 2, 3, 4], (n) => n % 2 === 0), [[2, 4], [1, 3]]);
});

test("zip stops at the shorter array", () => {
  assert.deepEqual(zip([1, 2, 3], ["a", "b"]), [[1, "a"], [2, "b"]]);
});

test("range works like python", () => {
  assert.deepEqual(range(4), [0, 1, 2, 3]);
  assert.deepEqual(range(10, 0, -3), [10, 7, 4, 1]);
});
