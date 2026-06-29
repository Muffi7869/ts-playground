import { test } from "node:test";
import assert from "node:assert/strict";
import { inline, heading, toBlocks, markdownToHtml, tableOfContents } from "../src/projects/markdown.ts";

test("inline formatting", () => {
  assert.equal(inline("**bold** and *it* and `x<y`"), "<strong>bold</strong> and <em>it</em> and <code>x&lt;y</code>");
});

test("links", () => {
  assert.equal(inline("[site](https://rajkotwala.com)"), '<a href="https://rajkotwala.com">site</a>');
});
