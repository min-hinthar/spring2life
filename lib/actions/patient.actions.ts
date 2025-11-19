"use server"

import { randomUUID } from "node:crypto"
import { Buffer } from "node:buffer"

<<<<<<< HEAD
import { getPublicFileUrl, insertRow, selectRows, SupabaseError, uploadToStorage } from "../supabase"
import { parseStringify } from "../utils"
import { Patient } from "@/types/database"
=======
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
>>>>>>> registration

const { SUPABASE_BUCKET_ID } = process.env

if (!SUPABASE_BUCKET_ID) {
  throw new Error("Missing SUPABASE_BUCKET_ID environment variable")
}

type UserRow = {
  id: string
  name: string
  email: string
  phone: string
}

type PatientRow = {
  id: string
  user_id: string
  name: string
  email: string
  phone: string
  birth_date: string
  gender: Gender
  address: string
  occupation: string
  emergency_contact_name: string
  emergency_contact_number: string
  primary_physician: string
  insurance_provider: string
  insurance_policy_number: string
  allergies: string | null
  current_medication: string | null
  family_medical_history: string | null
  past_medical_history: string | null
  identification_type: string | null
  identification_number: string | null
  identification_document_path: string | null
  identification_document_url: string | null
  treatment_consent: boolean
  disclosure_consent: boolean
  privacy_consent: boolean
  created_at?: string
}

const mapUser = (record: UserRow | null): User | null => {
  if (!record) return null

  return {
    id: record.id,
    name: record.name,
    email: record.email,
    phone: record.phone,
  }
}

const mapPatient = (record: PatientRow | null): Patient | null => {
  if (!record) return null

  return {
    id: record.id,
    userId: record.user_id,
    name: record.name,
    email: record.email,
    phone: record.phone,
    birthDate: record.birth_date,
    gender: record.gender,
    address: record.address,
    occupation: record.occupation,
    emergencyContactName: record.emergency_contact_name,
    emergencyContactNumber: record.emergency_contact_number,
    primaryPhysician: record.primary_physician,
    insuranceProvider: record.insurance_provider,
    insurancePolicyNumber: record.insurance_policy_number,
    allergies: record.allergies ?? undefined,
    currentMedication: record.current_medication ?? undefined,
    familyMedicalHistory: record.family_medical_history ?? undefined,
    pastMedicalHistory: record.past_medical_history ?? undefined,
    identificationType: record.identification_type ?? undefined,
    identificationNumber: record.identification_number ?? undefined,
    identificationDocumentPath: record.identification_document_path,
    identificationDocumentUrl: record.identification_document_url,
    treatmentConsent: record.treatment_consent,
    disclosureConsent: record.disclosure_consent,
    privacyConsent: record.privacy_consent,
    createdAt: record.created_at,
  }
}

export const createUser = async (user: CreateUserParams) => {
  try {
    const created = await insertRow<UserRow>("users", user)
    return parseStringify(mapUser(created?.[0] ?? null))
  } catch (error) {
    if (error instanceof SupabaseError && error.code === "23505") {
      const existing = await selectRows<UserRow>("users", {
        select: "*",
        email: `eq.${user.email}`,
        limit: "1",
      })

<<<<<<< HEAD
      return parseStringify(mapUser(existing?.[0] ?? null))
=======
    return parseStringify(newuser);
  } catch (error) {
    if (error instanceof AppwriteException && error.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
>>>>>>> registration
    }

    console.error("An error occurred while creating a new user:", error)
    throw error
  }
}

export const getUser = async (userId: string) => {
  try {
    const users = await selectRows<UserRow>("users", {
      select: "*",
      id: `eq.${userId}`,
      limit: "1",
    })

    return parseStringify(mapUser(users?.[0] ?? null))
  } catch (error) {
    console.error("An error occurred while retrieving the user details:", error)
  }
}

<<<<<<< HEAD
=======
// REGISTER PATIENT
>>>>>>> registration
export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
  try {
    let documentPath: string | null = null
    let documentUrl: string | null = null

    if (identificationDocument) {
<<<<<<< HEAD
      const blob = identificationDocument.get("blobFile") as Blob | null
      const fileName = identificationDocument.get("fileName") as string | null

      if (blob && fileName) {
        const arrayBuffer = await blob.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const storagePath = `${patient.userId}/${randomUUID()}-${fileName}`

        await uploadToStorage(SUPABASE_BUCKET_ID, storagePath, buffer, blob.type)
        documentPath = storagePath
        documentUrl = getPublicFileUrl(SUPABASE_BUCKET_ID, storagePath)
      }
    }

    const birthDate =
      patient.birthDate instanceof Date
        ? patient.birthDate.toISOString().split("T")[0]
        : new Date(patient.birthDate).toISOString().split("T")[0]
=======
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
>>>>>>> registration

    const payload = {
      user_id: patient.userId,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      birth_date: birthDate,
      gender: patient.gender,
      address: patient.address,
      occupation: patient.occupation,
      emergency_contact_name: patient.emergencyContactName,
      emergency_contact_number: patient.emergencyContactNumber,
      primary_physician: patient.primaryPhysician,
      insurance_provider: patient.insuranceProvider,
      insurance_policy_number: patient.insurancePolicyNumber,
      allergies: patient.allergies ?? null,
      current_medication: patient.currentMedication ?? null,
      family_medical_history: patient.familyMedicalHistory ?? null,
      past_medical_history: patient.pastMedicalHistory ?? null,
      identification_type: patient.identificationType ?? null,
      identification_number: patient.identificationNumber ?? null,
      identification_document_path: documentPath,
      identification_document_url: documentUrl,
      treatment_consent: patient.treatmentConsent,
      disclosure_consent: patient.disclosureConsent,
      privacy_consent: patient.privacyConsent,
    }

    const created = await insertRow<PatientRow>("patients", payload)
    return parseStringify(mapPatient(created?.[0] ?? null))
  } catch (error) {
    console.error("Error registering patient:", error)
    throw error
  }
}

export const getPatientById = async (patientId: string) => {
  try {
    const patients = await selectRows<PatientRow>("patients", {
      select: "*",
      id: `eq.${patientId}`,
      limit: "1",
    })

    return parseStringify(mapPatient(patients?.[0] ?? null))
  } catch (error) {
    console.error("An error occurred while retrieving the patient by id:", error)
  }
}

<<<<<<< HEAD
=======
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
>>>>>>> registration
export const getPatient = async (userId: string) => {
  try {
    const patients = await selectRows<PatientRow>("patients", {
      select: "*",
      user_id: `eq.${userId}`,
      limit: "1",
    })

    return parseStringify(mapPatient(patients?.[0] ?? null))
  } catch (error) {
    console.error("An error occurred while retrieving the patient details:", error)
  }
}
