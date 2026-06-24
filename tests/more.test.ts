import { test } from "node:test";
import assert from "node:assert/strict";
import { Checking, Savings, Temperature, Counter } from "../src/basics/classes.ts";
import { safeParseInt, mapResult, unwrapOr, all, tryCatch, validateEmail } from "../src/basics/result.ts";
import { sleep, withTimeout, retry, mapLimit, settle, countdown } from "../src/basics/async.ts";
import { maxBy, longest, Stack, Queue, mapValues } from "../src/basics/generics.ts";
import { makeGetters, applyPatch, createTodo } from "../src/basics/utilityTypes.ts";
