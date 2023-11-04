import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

export type UserQuery = {
  loader: boolean;
  isLoggedIn: boolean;
};

interface UserQueryStore {
  userQuery: UserQuery;
  setLoginStatus: (status: boolean) => void;
}

const useUserStore = create<UserQueryStore>((set) => ({
  userQuery: {
    loader: true,
    isLoggedIn: false,
  },
  setLoginStatus: (status) =>
    set((store) => ({
      userQuery: {
        ...store.userQuery,
        isLoggedIn: status,
        loader: false,
      },
    })),
  // setLoginStatus: (status: boolean) =>
  //   set({
  //     userQuery: {
  //       isLoggedIn: status,
  //       loader: false,
  //     },
  //   }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("UserQuery Store", useUserStore);
}

export default useUserStore;
