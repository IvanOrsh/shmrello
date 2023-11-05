import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { db } from "@app/firebase";
import useUserStore from "@app/store";
import { Board } from "../types/Board";

const useFetchBoards = () => {
  const { currentUser } = getAuth();
  const { setBoards } = useUserStore();

  const fetchBoards = async (
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const colRef = collection(db, `users/${currentUser?.uid}/boards`);
    try {
      const querySnapshot = await getDocs(colRef);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleDateString(),
      })) as Board[];
      setBoards(boards);
    } catch (err) {
      console.log(err);
      // throw err;
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return fetchBoards;
};

export default useFetchBoards;
