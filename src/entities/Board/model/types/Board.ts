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
    completed: string[];
    inProgress: string[];
    todos: string[];
  };
};
