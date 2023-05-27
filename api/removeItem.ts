import { deleteDoc, doc } from "firebase/firestore";

import { firestore } from "../firebase";

export const removeItem = async (id: string) => {
  try {
    await deleteDoc(doc(firestore, "items", id));
    console.log("Document successfully deleted!");
  } catch (e) {
    console.error("Error removing document: ", e);
  }
};
