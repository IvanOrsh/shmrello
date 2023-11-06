import type { TaskType } from "@entities/Task";

export type Board = {
  id: string;
  name: string;
  color: string;
  createdAt: string;
};

export type BoardData = {
  id: string;
  lastUpdated: string;
  tabs: {
    completed: TaskType[];
    inProgress: TaskType[];
    todos: TaskType[];
  };
};
