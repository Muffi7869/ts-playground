// objects, interfaces, readonly, index signatures

export interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
  tags: string[];
}

export function createUser(id: number, name: string, email: string): User {
  return { id, name, email, tags: [] };
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const out = {} as Pick<T, K>;
  for (const k of keys) out[k] = obj[k];
  return out;
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const out = { ...obj };
  for (const k of keys) delete out[k];
  return out;
}

export function invert<K extends PropertyKey, V extends PropertyKey>(obj: Record<K, V>): Record<V, K> {
  const out = {} as Record<V, K>;
  for (const [k, v] of Object.entries(obj) as [K, V][]) out[v] = k;
  return out;
}

export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
}

export function deepFreeze<T extends object>(obj: T): Readonly<T> {
  for (const v of Object.values(obj)) if (typeof v === "object" && v !== null) deepFreeze(v);
  return Object.freeze(obj);
}

export function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((cur, key) => (cur == null ? undefined : (cur as Record<string, unknown>)[key]), obj);
}
