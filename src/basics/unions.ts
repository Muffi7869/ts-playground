// unions, narrowing, discriminated unions

export type Shape =
  | { kind: "circle"; r: number }
  | { kind: "rect"; w: number; h: number }
  | { kind: "triangle"; base: number; height: number };
