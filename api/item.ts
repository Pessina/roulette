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
import { Item, Result } from "./types";
import { withUser } from "./user";

export const addItem = async (item: Item): Promise<Result<Item>> => {
  return withUser(async (userId) => {
    const docRef = await addDoc(
      collection(firestore, "users", userId, "items"),
      {
        ...item,
        createdAt: serverTimestamp(),
      }
    );
    const doc = await getDoc(docRef);

    if (doc.exists()) {
      return { id: docRef.id, ...doc.data() } as Item;
    } else {
      throw new Error("DOCUMENT_NOT_EXIST");
    }
  });
};

export const getItems = async (): Promise<Result<Item[]>> => {
  return withUser(async (userId) => {
    const q = query(
      collection(firestore, "users", userId, "items"),
      orderBy("createdAt")
    );
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
  });
};

export const removeItem = async (id: string): Promise<Result<void>> => {
  return withUser(async (userId) => {
    await deleteDoc(doc(firestore, "users", userId, "items", id));
  });
};

export const updateItem = async (
  id: string,
  updatedItem: Item
): Promise<Result<void>> => {
  return withUser(async (userId) => {
    const itemRef = doc(firestore, "users", userId, "items", id);
    await updateDoc(itemRef, updatedItem);
  });
};
