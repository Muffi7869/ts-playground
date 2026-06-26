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

test("settle counts failures", async () => {
  const r = await settle([Promise.resolve(1), Promise.reject(new Error("x")), Promise.resolve(3)]);
  assert.deepEqual(r, { ok: [1, 3], failed: 1 });
});

test("async generator countdown", async () => {
  const seen: number[] = [];
  for await (const n of countdown(3)) seen.push(n);
  assert.deepEqual(seen, [3, 2, 1]);
});

test("generic stack and queue", () => {
  const s = new Stack<number>();
  s.push(1);
  s.push(2);
  assert.equal(s.pop(), 2);
  const q = new Queue<string>();
  q.enqueue("a");
  q.enqueue("b");
  assert.equal(q.dequeue(), "a");
  assert.equal(q.size, 1);
});

test("maxBy, longest, mapValues", () => {
  assert.deepEqual(maxBy([{ s: 1 }, { s: 9 }, { s: 4 }], (x) => x.s), { s: 9 });
  assert.equal(longest("abc", "de"), "abc");
  assert.deepEqual(mapValues({ a: 1, b: 2 }, (v) => v * 10), { a: 10, b: 20 });
});
