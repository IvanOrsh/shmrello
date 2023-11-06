import type { TaskType } from "@entities/Task";

export type Tab = {
  id: string;
  status: "todo" | "in progress" | "completed";
  tasks: TaskType[];
};
