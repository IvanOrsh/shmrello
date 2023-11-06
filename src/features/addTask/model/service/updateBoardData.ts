import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { AddBoardData } from "../types/AddBoardData";
import { db } from "@app/firebase";
import useUserStore from "@app/store";

const useUpdateBoardData = () => {
  const { currentUser } = getAuth();
  const { setToaster } = useUserStore();

  const updateBoardData = async (boardId: string, data: AddBoardData) => {
    const docRef = doc(db, `users/${currentUser?.uid}/boardsData/${boardId}`);
    try {
      await updateDoc(docRef, { ...data, lastUpdated: serverTimestamp() });
    } catch (err) {
      const error = err as Error;
      setToaster(`Error updating board: ${error.message}`);
      throw err;
    }
  };

  return updateBoardData;
};

export default useUpdateBoardData;
