import * as sdk from "node-appwrite";

export const {
  APPWRITE_PROJECT_ID: PROJECT_ID,
  APPWRITE_API_KEY: API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  APPWRITE_ENDPOINT: ENDPOINT, // 👈 use server-side var
} = process.env;

const client = new sdk.Client();

client
  .setEndpoint(ENDPOINT!) // must be defined
  .setProject(PROJECT_ID!)
  .setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
