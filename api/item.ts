import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { firestore } from "../firebase";
import { Item } from "./types";

export const addItem = async (item: Item) => {
  try {
    const docRef = await addDoc(collection(firestore, "items"), {
      ...item,
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

export const getItems = async () => {
  try {
    const q = query(collection(firestore, "items"), orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    const items: Item[] = [];
    querySnapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        item: doc.data().item,
        probability: doc.data().probability,
      });
    });
    return items;
  } catch (e) {
    console.error("Error getting documents: ", e);
    return [];
  }
};

export const removeItem = async (id: string) => {
  try {
    await deleteDoc(doc(firestore, "items", id));
    console.log("Document successfully deleted!");
  } catch (e) {
    console.error("Error removing document: ", e);
  }
};

export const updateItem = async (id: string, updatedItem: Item) => {
  try {
    const itemRef = doc(firestore, "items", id);

    await updateDoc(itemRef, updatedItem);
    console.log("Document successfully updated!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
