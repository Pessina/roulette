import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { firestore } from "../firebase";

export const addItem = async (item: string) => {
  try {
    const docRef = await addDoc(collection(firestore, "items"), {
      item,
      createdAt: serverTimestamp(),
    });
    const doc = await getDoc(docRef);

    if (doc.exists()) {
      return { id: docRef.id, ...doc.data() };
    } else {
      throw new Error("Document does not exist");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
