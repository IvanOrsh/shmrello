import type { TaskType } from "@entities/Task";

export type TabKeys = "todos" | "inProgress" | "completed";

export type Tab = {
  [KEY in TabKeys]: TaskType[];
};

export type StatusMapType = {
  [KEY in TabKeys]: string;
};

export const statusMap: StatusMapType = {
  todos: "Todos",
  inProgress: "In Progress",
  completed: "Completed",
};
