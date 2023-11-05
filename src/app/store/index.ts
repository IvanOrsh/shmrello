import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

import type { Board } from "@entities/Board";

export type UserQuery = {
  loader: boolean;
  isLoggedIn: boolean;
  boards: Board[];
  areBoardsFetched: boolean;
};

interface UserQueryStore {
  userQuery: UserQuery;
  setLoginStatus: (status: boolean) => void;
  setBoards: (boards: Board[]) => void;
  addBoard: (board: Board) => void;
}

const useUserStore = create<UserQueryStore>((set) => ({
  userQuery: {
    loader: true,
    isLoggedIn: false,
    boards: [],
    areBoardsFetched: false,
  },

  setLoginStatus: (status) =>
    set((store) => ({
      userQuery: {
        ...store.userQuery,
        isLoggedIn: status,
        loader: false,
      },
    })),

  setBoards: (boards) =>
    set((store) => ({
      userQuery: {
        ...store.userQuery,
        boards,
        areBoardsFetched: true,
      },
    })),

  addBoard: (board) =>
    set((store) => ({
      userQuery: {
        ...store.userQuery,
        boards: [...store.userQuery.boards.concat(board)],
      },
    })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("UserQuery Store", useUserStore);
}

export default useUserStore;
