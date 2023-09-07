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

import { auth, firestore } from "../firebase";
import { Item } from "./types";

interface Result<T> {
  data?: T;
  error?: string;
}

const getUserId = (): string => {
  const user = auth.currentUser;
  if (user) {
    return user.uid;
  }
  throw new Error("USER_NOT_AUTHENTICATED");
};

const withUser = async <T>(
  fn: (userId: string) => Promise<T>
): Promise<Result<T>> => {
  try {
    const userId = getUserId();
    const data = await fn(userId);
    return { data };
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: "UNKNOWN_ERROR" };
  }
};

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
