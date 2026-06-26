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
