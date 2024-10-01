import { initializeApp, getApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_CONFIG_API_KEY,
  authDomain: process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_CONFIG_PROJECT_ID,
  storageBucket: process.env.FIREBASE_CONFIG_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_CONFIG_APP_ID,
};

interface Response {
  statusCode: number;
  message: string;
  file_id?: number;
  file_name?: string;
  full_path?: string;
}

const app = initializeApp(firebaseConfig);

export async function uploadFileFirebase(file: File): Promise<Response | null> {
  try {
    const storage = getStorage(getApp());
    const file_id = Date.now();
    const storage_ref = ref(
      storage,
      `${process.env.FIREBASE_STORAGE_LOCATION}${
        file_id.toString() + "." + file.name.split(".").pop()?.toLowerCase()
      }`
    );
    uploadBytes(storage_ref, file);

    return {
      statusCode: 200,
      message: "File uploaded successfully",
      file_id: file_id,
      file_name: storage_ref.name,
      full_path: storage_ref.fullPath,
    };
  } catch (error: any) {
    console.log(error);
    console.error("Error uploading file:", error);
    return {
      statusCode: error.code === "storage/unauthorized" ? 403 : 500,
      message: "An error occurred: " + error.message,
    };
  }
}
