import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { storage } from "@/firebase";

export type UploadOptions = {
  folderPath: string;
  fileName: string;
  metadata?: { [key: string]: any };
};

export const uploadFile = async (
  file: File,
  options: UploadOptions
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const { folderPath, fileName, metadata } = options;

    const defaultMetadata = {
      contentType: file.type,
      ...metadata,
    };

    const storageRef = ref(storage, `${folderPath}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file, defaultMetadata);

    uploadTask.on(
      "state_changed",
      undefined,
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
};
