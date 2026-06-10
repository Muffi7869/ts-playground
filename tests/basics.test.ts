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
