import { doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { db } from "@app/firebase";
import useUserStore from "@app/store";

const useDeleteBoard = () => {
  const { currentUser } = getAuth();
  const {
    setToaster,
    setBoards,
    userQuery: { boards },
  } = useUserStore();
  const navigate = useNavigate();

  const deleteBoard = async (boardId: string) => {
    try {
      // delete the doc from the DB
      const docRef = doc(db, `users/${currentUser?.uid}/boards/${boardId}`);
      await deleteDoc(docRef);

      // update the boards in the store
      const tempBoards = boards.filter((b) => b.id !== boardId);
      setBoards(tempBoards);

      // navigate to the boards screen
      navigate("/boards");
    } catch (err) {
      const error = err as Error;
      setToaster(`Error deleting board: ${error.message}`);
      throw err;
    }
  };

  return deleteBoard;
};

export default useDeleteBoard;
