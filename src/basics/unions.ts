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

export function toArray<T>(v: T | T[] | undefined): T[] {
  if (v === undefined) return [];
  return Array.isArray(v) ? v : [v];
}

export type Fish = { swim: () => string };

export type Bird = { fly: () => string };

export function move(animal: Fish | Bird): string {
  return "swim" in animal ? animal.swim() : animal.fly();
}

export function formatId(id: string | number): string {
  return typeof id === "number" ? `#${id.toString().padStart(5, "0")}` : id.toUpperCase();
}
