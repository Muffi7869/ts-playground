// generics and constraints

export function first<T>(arr: readonly T[]): T | undefined {
  return arr[0];
}

export function last<T>(arr: readonly T[]): T | undefined {
  return arr[arr.length - 1];
}

export function maxBy<T>(arr: readonly T[], score: (item: T) => number): T | undefined {
  let best: T | undefined;
  let bestScore = -Infinity;
  for (const item of arr) {
    const s = score(item);
    if (s > bestScore) {
      best = item;
      bestScore = s;
    }
  }
  return best;
}
