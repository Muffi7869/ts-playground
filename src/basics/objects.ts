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
