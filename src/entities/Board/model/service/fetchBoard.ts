import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { db } from "@app/firebase";
import useUserStore from "@app/store";

const useFetchBoard = () => {
  const { currentUser } = getAuth();
  const { setToaster } = useUserStore();

  const fetchBoard = async (boardId: string) => {
    const docRef = doc(db, `users/${currentUser?.uid}/boardsData/${boardId}`);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      }
      return null;
    } catch (err) {
      const error = err as Error;
      setToaster(`Error fetching board: ${error.message}`);
      throw err;
    }
  };

  return fetchBoard;
};

export default useFetchBoard;
