import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { db } from "@app/firebase";
import { CreateBoard } from "@features/createBoard";
import useUserStore from "@app/store";

const useCreateBoard = () => {
  const { currentUser } = getAuth();
  const { addBoard, setToaster } = useUserStore();

  const createBoard = async ({ name, color }: CreateBoard) => {
    const colRef = collection(db, `users/${currentUser?.uid}/boards`);

    try {
      const docRef = await addDoc(colRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });
      addBoard({
        id: docRef.id,
        name,
        color,
        createdAt: new Date().toLocaleString("en-US"),
      });
    } catch (err) {
      const error = err as Error;
      // TODO: showing the msg in toastr
      setToaster(error.message);
      console.log(err);
      throw err;
    }
  };

  return createBoard;
};

export default useCreateBoard;
