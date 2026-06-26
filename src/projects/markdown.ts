// tiny markdown -> html converter. supports headings, bold/italic, code, links, lists, paragraphs

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
