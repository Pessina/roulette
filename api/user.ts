import {
  deleteUser,
  reauthenticateWithCredential,
  signOut,
} from "@firebase/auth";
import { EmailAuthProvider } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

import { auth, firestore } from "@/firebase";

import { Result } from "./types";

export const getUserId = (): string => {
  const user = auth.currentUser;
  if (user) {
    return user.uid;
  }
  throw new Error("USER_NOT_AUTHENTICATED");
};

export const withUser = async <T>(
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

export const deleteUserDataFromFirestore = async (
  userId: string
): Promise<Result<void>> => {
  try {
    const itemsQuerySnapshot = await getDocs(
      collection(firestore, "users", userId, "items")
    );

    const batchDeletes = itemsQuerySnapshot.docs.map((docSnapshot) =>
      deleteDoc(doc(firestore, "users", userId, "items", docSnapshot.id))
    );

    await Promise.all(batchDeletes);
    return { data: undefined };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "UNKNOWN_ERROR" };
  }
};

export const deleteUserCascade = async (password: string) => {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("USER_NOT_AUTHENTICATED");
  }

  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);

  await deleteUserDataFromFirestore(user.uid);
  await deleteUser(user);
  signOut(auth);
};
