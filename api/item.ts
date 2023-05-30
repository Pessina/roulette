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
import { toast } from "react-toastify";

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
      toast.success("Document successfully created!");
      return { id: docRef.id, ...doc.data() };
    } else {
      throw new Error("Document does not exist");
    }
  } catch (e) {
    toast.error("Error adding document:");
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
    toast.error("Error getting documents:");
    return [];
  }
};

export const removeItem = async (id: string) => {
  try {
    await deleteDoc(doc(firestore, "items", id));
    toast.success("Document successfully deleted!");
  } catch (e) {
    toast.error("Error removing document");
  }
};

export const updateItem = async (id: string, updatedItem: Item) => {
  try {
    const itemRef = doc(firestore, "items", id);

    await updateDoc(itemRef, updatedItem);
    toast.success("Document successfully updated!");
  } catch (e) {
    toast.error("Error updating document");
  }
};
