import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { AddBoardData } from "../types/AddBoardData";
import { db } from "@app/firebase";

const useUpdateBoardData = () => {
  const { currentUser } = getAuth();

  const updateBoardData = async (boardId: string, data: AddBoardData) => {
    const docRef = doc(db, `users/${currentUser?.uid}/boardsData/${boardId}`);
    try {
      await updateDoc(docRef, { ...data, lastUpdated: serverTimestamp() });
    } catch (err) {
      // TODO: toastr
      console.log(err);
    }
  };

  return updateBoardData;
};

export default useUpdateBoardData;
