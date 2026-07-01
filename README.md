# ts-playground

typescript practice. everything is strict mode and tested with node's built in test runner (no jest, no build step, node strips the types).

```
npm i
npm test
npm run typecheck
```

## src/basics

types and narrowing, functions (overloads, compose, memoize, curry), array helpers, objects/pick/omit, discriminated unions, generics + a typed stack/queue, classes (abstract, private fields, getters), a `Result` type instead of throwing, async helpers (timeout, retry, mapLimit, async generators), and utility/mapped types.
