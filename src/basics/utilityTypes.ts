// playing with built in + custom utility types

export interface Todo {
  id: number;
  title: string;
  done: boolean;
  due?: string;
}

export type TodoDraft = Omit<Todo, "id">;

export type TodoPatch = Partial<Omit<Todo, "id">>;

export type TodoPreview = Pick<Todo, "id" | "title">;

export type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

export type DeepReadonly<T> = { readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K] };

export type KeysOfType<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T];

export type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };

export function makeGetters<T extends object>(obj: T): Getters<T> {
  const out: Record<string, () => unknown> = {};
  for (const key of Object.keys(obj)) {
    out[`get${key[0].toUpperCase()}${key.slice(1)}`] = () => (obj as Record<string, unknown>)[key];
  }
  return out as Getters<T>;
}

export function applyPatch(todo: Todo, patch: TodoPatch): Todo {
  return { ...todo, ...patch };
}
