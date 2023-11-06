import type { TaskType } from "@entities/Task";

export type TabKeys = "todos" | "inProgress" | "completed";

export type Tab = {
  [KEY in TabKeys]: TaskType[];
};
