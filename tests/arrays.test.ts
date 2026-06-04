import { test } from "node:test";
import assert from "node:assert/strict";
import { chunk, unique, groupBy, partition, zip, range, sortBy, countBy } from "../src/basics/arrays.ts";

test("chunk splits evenly and keeps the remainder", () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});
