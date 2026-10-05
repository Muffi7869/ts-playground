# ts-playground

typescript practice. everything is strict mode and tested with node's built in test runner (no jest, no build step, node strips the types).

```
npm i
npm test
npm run typecheck
```

## src/basics

types and narrowing, functions (overloads, compose, memoize, curry), array helpers, objects/pick/omit, discriminated unions, generics + a typed stack/queue, classes (abstract, private fields, getters), a `Result` type instead of throwing, async helpers (timeout, retry, mapLimit, async generators), and utility/mapped types.

## src/projects

- `markdown.ts` - tiny markdown to html converter (headings, lists, code blocks, links, toc)
- `kanban.ts` - kanban board as a pure reducer with wip limits and undo

## src/utils

- `emitter.ts` - type safe event emitter (event names and payloads checked at compile time)
- `schema.ts` - mini zod clone, infers the ts type from the validator
- `collections.ts` - LRU cache, priority queue, dijkstra, trie
