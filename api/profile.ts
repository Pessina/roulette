import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { firestore, storage } from "../firebase";
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
    const metadata = {
      contentType: file.type,
    };

    const fileExtension = file.name.split(".").pop();
    const storageRef = ref(
      storage,
      `users/${userId}/logo/logo.${fileExtension}`
    );

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              reject("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              reject("User canceled the upload");
              break;
            case "storage/unknown":
              reject("Unknown error occurred, inspect error.serverResponse");
              break;
            default:
              reject(error);
          }
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  });
};
