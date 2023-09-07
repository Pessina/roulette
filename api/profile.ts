import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { firestore } from "../firebase";
import { uploadFile, UploadOptions } from "./file";
import { ProfileData, Result } from "./types";
import { withUser } from "./user";

export const getProfileData = async (): Promise<Result<ProfileData>> => {
  return withUser<ProfileData>(async (userId) => {
    const docRef = doc(firestore, "users", userId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data() as ProfileData;
    } else {
      throw new Error("DOCUMENT_NOT_EXIST");
    }
  });
};

export const updateProfileData = async (
  profileData: Partial<ProfileData>
): Promise<Result<void>> => {
  return withUser(async (userId) => {
    const docRef = doc(firestore, "users", userId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      await updateDoc(docRef, profileData);
    } else {
      await setDoc(docRef, profileData);
    }
  });
};

export const uploadLogo = async (file: File): Promise<Result<string>> => {
  return withUser<string>(async (userId) => {
    const fileExtension = file.name.split(".").pop();
    const options: UploadOptions = {
      folderPath: `users/${userId}/logo`,
      fileName: `logo.${fileExtension}`,
      metadata: {
        contentType: file.type,
      },
    };

    return await uploadFile(file, options);
  });
};
