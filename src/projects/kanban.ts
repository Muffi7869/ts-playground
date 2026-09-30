// kanban board state as a pure reducer (practice for react-style state management)

export type ColumnId = "todo" | "doing" | "done";

export interface Card {
  id: string;
  title: string;
  column: ColumnId;
  points: number;
  assignee?: string;
}

export interface Board {
  cards: Card[];
  wipLimit: number;
  history: string[];
}
