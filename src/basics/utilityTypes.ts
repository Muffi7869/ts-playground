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
