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
