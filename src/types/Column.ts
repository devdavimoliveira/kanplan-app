import type { Task } from "./Task";

export type Column = {
  id: string;
  title: string;
  position: number;
  boardId: string;
  createdAt: string | null;
};

export type ColumnWithTasks = Column & {
  tasks: Task[];
};
