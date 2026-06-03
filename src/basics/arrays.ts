// array helpers with proper types

export function chunk<T>(arr: readonly T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function unique<T>(arr: readonly T[]): T[] {
  return [...new Set(arr)];
}

export function groupBy<T, K extends PropertyKey>(arr: readonly T[], key: (item: T) => K): Record<K, T[]> {
  const out = {} as Record<K, T[]>;
  for (const item of arr) (out[key(item)] ??= []).push(item);
  return out;
}

export function partition<T>(arr: readonly T[], pred: (item: T) => boolean): [T[], T[]] {
  const yes: T[] = [];
  const no: T[] = [];
  for (const item of arr) (pred(item) ? yes : no).push(item);
  return [yes, no];
}

export function zip<A, B>(a: readonly A[], b: readonly B[]): [A, B][] {
  return a.slice(0, Math.min(a.length, b.length)).map((x, i) => [x, b[i]]);
}

export function range(start: number, end?: number, step = 1): number[] {
  if (end === undefined) [start, end] = [0, start];
  const out: number[] = [];
  for (let i = start; step > 0 ? i < end : i > end; i += step) out.push(i);
  return out;
}
