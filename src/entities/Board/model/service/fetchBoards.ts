import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { db } from "@app/firebase";
import useUserStore from "@app/store";
import { Board } from "../types/Board";

const useFetchBoards = () => {
  const { currentUser } = getAuth();
  const { setBoards, setToaster } = useUserStore();

  const fetchBoards = async (
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const colRef = collection(db, `users/${currentUser?.uid}/boards`);
    try {
      const q = query(colRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleString("en-US"),
      })) as Board[];
      setBoards(boards);
    } catch (err) {
      const error = err as Error;
      setToaster(`Error fetching boards: ${error.message}`);
      // throw err;
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return fetchBoards;
};

export default useFetchBoards;
