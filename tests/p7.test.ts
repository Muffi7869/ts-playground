import { test } from "node:test";
import assert from "node:assert/strict";
import { Emitter, onceEvent, waitFor } from "../src/utils/emitter.ts";
import { string, number, boolean, optional, array, object, oneOf, type Infer } from "../src/utils/schema.ts";
import { reducer, initialBoard, velocity, byAssignee, countIn } from "../src/projects/kanban.ts";
import { LRU, PriorityQueue, dijkstra, Trie } from "../src/utils/collections.ts";

type Events = { login: { user: string }; logout: undefined };

test("emitter delivers typed payloads", () => {
  const em = new Emitter<Events>();
  const seen: string[] = [];
  const off = em.on("login", (p) => seen.push(p.user));
  em.emit("login", { user: "muffi" });
  off();
  assert.equal(em.emit("login", { user: "sam" }), 0);
  assert.deepEqual(seen, ["muffi"]);
});

test("onceEvent fires a single time", () => {
  const em = new Emitter<Events>();
  let n = 0;
  onceEvent(em, "logout", () => n++);
  em.emit("logout", undefined);
  em.emit("logout", undefined);
  assert.equal(n, 1);
});

test("waitFor resolves with the payload", async () => {
  const em = new Emitter<Events>();
  setTimeout(() => em.emit("login", { user: "late" }), 1);
  assert.deepEqual(await waitFor(em, "login"), { user: "late" });
});

const signup = object({
  email: string({ email: true }),
  age: number({ int: true, min: 13 }),
  role: oneOf(["student", "admin"] as const),
  newsletter: optional(boolean()),
  tags: array(string({ min: 1 })),
});

type Signup = Infer<typeof signup>;

test("schema accepts valid input and infers types", () => {
  const r = signup.parse({ email: "m@ucsd.edu", age: 19, role: "student", tags: ["cs"] });
  assert.equal(r.success, true);
  if (r.success) {
    const s: Signup = r.data;
    assert.equal(s.role, "student");
  }
});

test("schema reports every issue with paths", () => {
  const r = signup.parse({ email: "bad", age: 12.5, role: "ceo", tags: ["ok", ""] });
  assert.equal(r.success, false);
  if (!r.success) assert.deepEqual(r.issues.map((i) => i.path), ["email", "age", "role", "tags[1]"]);
});

test("kanban add, move and wip limit", () => {
  let b = initialBoard(1);
  b = reducer(b, { type: "add", card: { id: "1", title: "login page", points: 3 } });
  b = reducer(b, { type: "add", card: { id: "2", title: "api", points: 5 } });
  b = reducer(b, { type: "move", id: "1", to: "doing" });
  b = reducer(b, { type: "move", id: "2", to: "doing" });
  assert.equal(countIn(b, "doing"), 1);
});

test("kanban undo, velocity, assignee points", () => {
  let b = initialBoard();
  b = reducer(b, { type: "add", card: { id: "a", title: "x", points: 2 } });
  b = reducer(b, { type: "assign", id: "a", who: "muffi" });
  b = reducer(b, { type: "move", id: "a", to: "done" });
  assert.equal(velocity(b), 2);
  assert.deepEqual(byAssignee(b), { muffi: 2 });
  b = reducer(b, { type: "undo" });
  assert.equal(velocity(b), 0);
});
