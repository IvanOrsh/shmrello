import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { db } from "@app/firebase";
import { CreateBoard } from "@features/createBoard";
import useUserStore from "@app/store";

const useCreateBoard = () => {
  const { currentUser } = getAuth();
  const { addBoard, setToaster } = useUserStore();

  const createBoard = async ({ name, color }: CreateBoard) => {
    const boardsColRef = collection(db, `users/${currentUser?.uid}/boards`);
    const boardsDataColRef = collection(
      db,
      `users/${currentUser?.uid}/boardsData`
    );

    try {
      const boardDataDocRef = await addDoc(boardsDataColRef, {
        tabs: {
          todos: [],
          inProgress: [],
          completed: [],
        },
        lastUpdated: serverTimestamp(),
      });

      const boardDocRef = await addDoc(boardsColRef, {
        boardsDataId: boardDataDocRef.id,
        name,
        color,
        createdAt: serverTimestamp(),
      });

      addBoard({
        id: boardDocRef.id,
        boardsDataId: boardDataDocRef.id,
        name,
        color,
        createdAt: new Date().toLocaleString("en-US"),
      });
    } catch (err) {
      const error = err as Error;
      setToaster(`Error creating board: ${error.message}`);
      throw err;
    }
  };

  return createBoard;
};

export default useCreateBoard;
