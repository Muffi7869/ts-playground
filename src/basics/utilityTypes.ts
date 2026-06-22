// playing with built in + custom utility types

export interface Todo {
  id: number;
  title: string;
  done: boolean;
  due?: string;
}

export type TodoDraft = Omit<Todo, "id">;

export type TodoPatch = Partial<Omit<Todo, "id">>;
