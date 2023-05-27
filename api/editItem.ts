import { doc, setDoc } from "firebase/firestore";

import { firestore } from "../firebase";

export const editItem = async (id: string, newItem: string) => {
  try {
    await setDoc(doc(firestore, "items", id), { item: newItem });
    console.log("Document successfully edited!");
  } catch (e) {
    console.error("Error editing document: ", e);
  }
};
