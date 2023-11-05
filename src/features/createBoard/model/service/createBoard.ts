import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { db } from "@app/firebase";
import { CreateBoard } from "@features/createBoard";

const useCreateBoard = () => {
  const { currentUser } = getAuth();

  const createBoard = async ({ name, color }: CreateBoard) => {
    const colRef = collection(db, `users/${currentUser?.uid}/boards`);

    try {
      await addDoc(colRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      // TODO: showing the msg in toastr
      console.log(err);
      throw err;
    }
  };

  return { createBoard };
};

export default useCreateBoard;
