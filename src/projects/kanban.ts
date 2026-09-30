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

export function reducer(board: Board, action: Action): Board {
  const snapshot = JSON.stringify(board.cards);
  switch (action.type) {
    case "add":
      return { ...board, cards: [...board.cards, { ...action.card, column: "todo" }], history: [...board.history, snapshot] };
    case "move": {
      if (action.to === "doing" && countIn(board, "doing") >= board.wipLimit) return board;
      const cards = board.cards.map((c) => (c.id === action.id ? { ...c, column: action.to } : c));
      return { ...board, cards, history: [...board.history, snapshot] };
    }
    case "assign":
      return { ...board, cards: board.cards.map((c) => (c.id === action.id ? { ...c, assignee: action.who } : c)), history: [...board.history, snapshot] };
    case "remove":
      return { ...board, cards: board.cards.filter((c) => c.id !== action.id), history: [...board.history, snapshot] };
    case "undo": {
      const prev = board.history.at(-1);
      return prev ? { ...board, cards: JSON.parse(prev) as Card[], history: board.history.slice(0, -1) } : board;
    }
  }
}
