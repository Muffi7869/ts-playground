// basic types and type annotations

export const appName: string = "ts-playground";

export function describe(value: unknown): string {
  if (typeof value === "string") return `string(${value.length})`;
  if (typeof value === "number") return Number.isInteger(value) ? "int" : "float";
  if (Array.isArray(value)) return `array(${value.length})`;
  if (value === null) return "null";
  return typeof value;
}

export type Point = { x: number; y: number };

export function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export type Tuple3 = [string, number, boolean];

export function swapPair<A, B>(pair: [A, B]): [B, A] {
  return [pair[1], pair[0]];
}
