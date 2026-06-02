// functions: overloads, optional params, higher order

export function greet(name: string, excited?: boolean): string {
  return `hey ${name}${excited ? "!" : "."}`;
}

export function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

export function parse(input: string): number;
export function parse(input: string[]): number[];
export function parse(input: string | string[]): number | number[] {
  return Array.isArray(input) ? input.map(Number) : Number(input);
}

export function compose<A, B, C>(f: (b: B) => C, g: (a: A) => B): (a: A) => C {
  return (a) => f(g(a));
}

export function pipe<T>(value: T, ...fns: Array<(v: T) => T>): T {
  return fns.reduce((acc, fn) => fn(acc), value);
}

export function memoize<A extends string | number, R>(fn: (a: A) => R): (a: A) => R {
  const cache = new Map<A, R>();
  return (a) => {
    if (!cache.has(a)) cache.set(a, fn(a));
    return cache.get(a)!;
  };
}

export function once<T extends unknown[], R>(fn: (...args: T) => R): (...args: T) => R {
  let called = false;
  let result: R;
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}
