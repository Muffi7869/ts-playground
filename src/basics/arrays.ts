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
