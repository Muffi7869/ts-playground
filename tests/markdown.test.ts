import { test } from "node:test";
import assert from "node:assert/strict";
import { inline, heading, toBlocks, markdownToHtml, tableOfContents } from "../src/projects/markdown.ts";

test("inline formatting", () => {
  assert.equal(inline("**bold** and *it* and `x<y`"), "<strong>bold</strong> and <em>it</em> and <code>x&lt;y</code>");
});

test("links", () => {
  assert.equal(inline("[site](https://rajkotwala.com)"), '<a href="https://rajkotwala.com">site</a>');
});

test("headings", () => {
  assert.equal(heading("## hello"), "<h2>hello</h2>");
  assert.equal(heading("not a heading"), null);
});

test("blocks group consecutive list items", () => {
  const blocks = toBlocks("# t\n\n- a\n- b\n\npara one\npara two");
  assert.deepEqual(blocks.map((b) => b.type), ["h", "ul", "p"]);
});

test("code blocks keep content raw", () => {
  assert.equal(markdownToHtml("```\n<b>\n```"), "<pre><code>&lt;b&gt;</code></pre>");
});
