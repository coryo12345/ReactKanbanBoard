import create from "zustand";
import { Board, KanbanColumn, WorkItem } from "../models/KanbanBoard";
import { defaultBoard } from "./boardStore.fixtures";

interface BoardState extends Board {
  addColumn: () => void;
  removeColumn: (col: KanbanColumn) => void;
  setColumns: (columns: KanbanColumn[]) => void;
  setItemsForColumn: (columnId: number, items: WorkItem[]) => void;
  removeItem: (columnId: number, itemIdx: number) => void;
  setBoardName: (name: string) => void;
}

export const useBoardStore = create<BoardState>()((set) => ({
  // an initial default state for now
  ...defaultBoard,
  setBoardName: (name) =>
    set((state) => {
      return {
        name,
      };
    }),
  addColumn: () =>
    set((state) => {
      const maxColId = state.columns.reduce((p, c) => Math.max(p, c.id), state.columns[0].id) || 0;
      const newColumns = [...state.columns];
      newColumns.push({
        id: maxColId + 1,
        name: "New Column",
        items: [],
      });
      return {
        columns: newColumns,
      } as Partial<BoardState>;
    }),
  removeColumn: (column: KanbanColumn) =>
    set((state) => {
      const newColumns = state.columns.filter((col) => col.id !== column.id);
      return {
        columns: newColumns,
      } as Partial<BoardState>;
    }),
  setColumns: (columns: KanbanColumn[]) =>
    set((state) => {
      return {
        columns,
      };
    }),
  setItemsForColumn: (columnId: number, items: WorkItem[]) =>
    set((state) => {
      const newColumns = [...state.columns];
      const col = newColumns.find((col) => col.id === columnId);
      if (!col) return {};
      col.items = items;
      return {
        columns: newColumns,
      } as Partial<BoardState>;
    }),
  removeItem: (columnId: number, itemIdx: number) =>
    set((state) => {
      const newColumns = [...state.columns];
      const col = newColumns.find((col) => col.id === columnId);
      if (!col) return {};
      const newItems = [...col.items];
      newItems.splice(itemIdx, 1);
      col.items = newItems;
      return {
        columns: newColumns,
      } as Partial<BoardState>;
    }),
}));
