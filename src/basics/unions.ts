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
