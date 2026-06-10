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

export interface HasLength {
  length: number;
}

export function longest<T extends HasLength>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

export class Stack<T> {
  private items: T[] = [];
  push(item: T): void {
    this.items.push(item);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
  get size(): number {
    return this.items.length;
  }
}
