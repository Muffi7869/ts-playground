import { test } from "node:test";
import assert from "node:assert/strict";
import { Checking, Savings, Temperature, Counter } from "../src/basics/classes.ts";
import { safeParseInt, mapResult, unwrapOr, all, tryCatch, validateEmail } from "../src/basics/result.ts";
import { sleep, withTimeout, retry, mapLimit, settle, countdown } from "../src/basics/async.ts";
import { maxBy, longest, Stack, Queue, mapValues } from "../src/basics/generics.ts";
import { makeGetters, applyPatch, createTodo } from "../src/basics/utilityTypes.ts";

test("checking allows overdraft, savings doesn't", () => {
  const c = new Checking("muffi", 50, 100);
  const s = new Savings("muffi", 50);
  assert.ok(c.withdraw(120));
  assert.ok(!s.withdraw(120));
});

test("savings interest compounds", () => {
  const s = new Savings("x", 1000, 0.12);
  assert.ok(Math.abs(s.addInterest(12) - 1126.83) < 0.01);
});

test("temperature getters and setters", () => {
  const t = new Temperature();
  t.fahrenheit = 212;
  assert.equal(t.celsius, 100);
});

test("counter chains and ranks", () => {
  assert.deepEqual(new Counter().add("a").add("b", 3).add("a").top(1), [["b", 3]]);
});
