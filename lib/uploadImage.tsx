import { ID, storage } from "@/appwrite";
import { AppwriteException } from "appwrite";

const uploadImage = async (file: File, user: string) => {
  try {
    if (!file) return;
    console.log(user);
    if (user === "user") {
      const fileUploaded = await storage.createFile(
        process.env.NEXT_PUBLIC_BUCKET_ID_AVATAR!,
        ID.unique(),
        file
      );
      return fileUploaded;
    } else {
      const fileUploaded = await storage.createFile(
        "650ad2c0247f457bb892",
        ID.unique(),
        file
      );

      return fileUploaded;
    }
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export default uploadImage;
