import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { firestore } from "../firebase";
import { Item } from "./types";

export const getItems = async () => {
  try {
    const q = query(collection(firestore, "items"), orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    const items: Item[] = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, item: doc.data().item });
    });
    return items;
  } catch (e) {
    console.error("Error getting documents: ", e);
    return [];
  }
};
