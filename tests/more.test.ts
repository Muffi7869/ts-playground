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

test("result helpers", () => {
  assert.equal(unwrapOr(mapResult(safeParseInt("21"), (n) => n * 2), 0), 42);
  assert.equal(unwrapOr(safeParseInt("nope"), -1), -1);
  assert.deepEqual(all([safeParseInt("1"), safeParseInt("2")]), { ok: true, value: [1, 2] });
});

test("tryCatch and validateEmail", () => {
  const r = tryCatch(() => JSON.parse("{bad"));
  assert.equal(r.ok, false);
  assert.equal(validateEmail("Muffi@UCSD.edu").ok, true);
  assert.equal(validateEmail("nope").ok, false);
});

test("withTimeout rejects slow promises", async () => {
  await assert.rejects(withTimeout(sleep(50), 5), /timed out/);
  await withTimeout(sleep(1), 50);
});

test("retry eventually succeeds", async () => {
  let n = 0;
  const v = await retry(async () => {
    if (++n < 3) throw new Error("flaky");
    return "ok";
  }, 5, 1);
  assert.equal(v, "ok");
  assert.equal(n, 3);
});

test("mapLimit keeps order", async () => {
  const out = await mapLimit([30, 10, 20], 2, async (ms) => (await sleep(ms), ms));
  assert.deepEqual(out, [30, 10, 20]);
});
