export type WorkItem = {
  name: string;
  description: string;
};

export type KanbanColumn = {
  name: string;
  id: number;
  items: WorkItem[];
};

export interface Board {
  name: string;
  id: number;
  columns: KanbanColumn[];
}
