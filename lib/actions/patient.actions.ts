'use server'


import {
  AppwriteException,
  Client,
  Storage,
  Databases,
  ID,
  Query,
} from "node-appwrite";
import { API_KEY, BUCKET_ID, DATABASE_ID, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, users } from "../appwrite.config"
import { parseStringify } from "../utils";

const client = new Client()
  .setEndpoint(ENDPOINT!)
  .setProject(PROJECT_ID!)
  .setKey(API_KEY!);

const storage = new Storage(client);
const databases = new Databases(client);

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newuser);
  } catch (error) {
    if (error instanceof AppwriteException && error.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// REGISTER PATIENT
export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const blob = identificationDocument.get('blobFile') as Blob;
      const fileName = identificationDocument.get('fileName') as string;

      if (blob && fileName) {
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const inputFile = InputFile.fromBuffer(buffer, fileName);

        file = await storage.createFile(
          BUCKET_ID!,
          ID.unique(),
          buffer,
          fileName,
        );
      }
    }

    const patientPayload = {
      ...patient,
      birthDate:
        patient.birthDate instanceof Date
          ? patient.birthDate.toISOString()
          : patient.birthDate,
    };

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ?? null,
        identificationDocumentUrl: file
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
        ...patientPayload,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("Error registering patient:", error);
    throw error;
  }
};

export const getPatientById = async (patientId: string) => {
  try {
    const patient = await databases.getDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      patientId
    );

    return parseStringify(patient);
  } catch (error) {
    console.error("An error occurred while retrieving the patient by id:", error);
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};