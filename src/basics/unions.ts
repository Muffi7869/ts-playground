// unions, narrowing, discriminated unions

export type Shape =
  | { kind: "circle"; r: number }
  | { kind: "rect"; w: number; h: number }
  | { kind: "triangle"; base: number; height: number };

export function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.r ** 2;
    case "rect":
      return s.w * s.h;
    case "triangle":
      return 0.5 * s.base * s.height;
    default: {
      const never: never = s;
      return never;
    }
  }
}

export type ApiState<T> = { status: "idle" } | { status: "loading" } | { status: "ok"; data: T } | { status: "error"; message: string };

export function render<T>(state: ApiState<T>, show: (d: T) => string): string {
  if (state.status === "ok") return show(state.data);
  if (state.status === "error") return `error: ${state.message}`;
  return state.status === "loading" ? "loading..." : "";
}

export function isString(v: unknown): v is string {
  return typeof v === "string";
}
