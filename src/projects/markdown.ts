// tiny markdown -> html converter. supports headings, bold/italic, code, links, lists, paragraphs

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function inline(text: string): string {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

export function heading(line: string): string | null {
  const m = /^(#{1,6})\s+(.*)$/.exec(line);
  return m ? `<h${m[1].length}>${inline(m[2])}</h${m[1].length}>` : null;
}

export type Block = { type: "p" | "ul" | "ol" | "code" | "h"; lines: string[] };

export function toBlocks(md: string): Block[] {
  const blocks: Block[] = [];
  let cur: Block | null = null;
  let inCode = false;
  for (const line of md.split("\n")) {
    if (line.startsWith("```")) {
      if (inCode) {
        blocks.push(cur!);
        cur = null;
      } else {
        if (cur) blocks.push(cur);
        cur = { type: "code", lines: [] };
      }
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      cur!.lines.push(line);
      continue;
    }
    const type: Block["type"] | null = line.trim() === "" ? null : /^#{1,6}\s/.test(line) ? "h" : /^[-*]\s/.test(line) ? "ul" : /^\d+\.\s/.test(line) ? "ol" : "p";
    if (cur && (type !== cur.type || type === "h")) {
      blocks.push(cur);
      cur = null;
    }
    if (type) (cur ??= { type, lines: [] }).lines.push(line);
  }
  if (cur) blocks.push(cur);
  return blocks;
}
