"use server"

import { revalidatePath } from "next/cache"

import { supabaseRequest } from "../supabase"
import { PatientRecord } from "@/types/database"

const PATIENTS_TABLE = "patients"

export const registerPatientProfile = async (payload: PatientRegistrationInput) => {
  const record = {
    full_name: payload.fullName,
    email: payload.email.toLowerCase(),
    phone: payload.phone,
    birth_date: payload.birthDate.toISOString(),
    gender: payload.gender,
    support_needs: payload.supportNeeds,
    personal_story: payload.personalStory,
    preferred_language: payload.preferredLanguage,
    emergency_contact_name: payload.emergencyContactName,
    emergency_contact_phone: payload.emergencyContactPhone,
    preferred_communication: payload.preferredCommunication,
    care_team_notes: payload.careTeamNotes ?? "",
  }

  const [patient] = await supabaseRequest<PatientRecord[]>({
    method: "POST",
    path: PATIENTS_TABLE,
    body: record,
  })

  revalidatePath("/admin")
  return patient
}

export const getPatientByEmail = async (email: string) => {
  const patients = await supabaseRequest<PatientRecord[]>({
    path: PATIENTS_TABLE,
    query: {
      select: "*",
      email: `eq.${email.toLowerCase()}`,
    },
  })

  return patients?.[0] ?? null
}

export const getPatientsCount = async () => {
  const results = await supabaseRequest<PatientRecord[]>({
    path: PATIENTS_TABLE,
    query: {
      select: "id",
    },
  })

  return results?.length ?? 0
}
