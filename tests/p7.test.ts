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
