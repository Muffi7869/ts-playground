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

export type Action =
  | { type: "add"; card: Omit<Card, "column"> }
  | { type: "move"; id: string; to: ColumnId }
  | { type: "assign"; id: string; who: string }
  | { type: "remove"; id: string }
  | { type: "undo" };

export const initialBoard = (wipLimit = 3): Board => ({ cards: [], wipLimit, history: [] });

export function countIn(board: Board, col: ColumnId): number {
  return board.cards.filter((c) => c.column === col).length;
}
