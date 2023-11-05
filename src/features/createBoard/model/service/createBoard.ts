import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { db } from "@app/firebase";
import { CreateBoard } from "@features/createBoard";
import useUserStore from "@app/store";

const useCreateBoard = () => {
  const { currentUser } = getAuth();
  const { addBoard } = useUserStore();

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
        createdAt: new Date().toLocaleDateString(),
      });
    } catch (err) {
      // TODO: showing the msg in toastr
      console.log(err);
      throw err;
    }
  };

  return createBoard;
};

export default useCreateBoard;
