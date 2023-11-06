import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { db } from "@app/firebase";
// import useUserStore from "@app/store";
// import { Board } from "../types/Board";

const useFetchBoard = () => {
  const { currentUser } = getAuth();
  // const { setBoards } = useUserStore();

  const fetchBoard = async (boardId: string) => {
    const docRef = doc(db, `users/${currentUser?.uid}/boardsData/${boardId}`);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      }
      return null;
    } catch (err) {
      // TODO: toastr
      console.log(err);
    }
  };

  return fetchBoard;
};

export default useFetchBoard;
