"use server"

import { parseStringify } from "../utils"
import { getPatientById } from "./patient.actions"
import { insertRow, selectRows, updateRows } from "../supabase"
import { Appointment, Patient } from "@/types/database"

type AppointmentRow = {
  id: string
  user_id: string
  patient_id: string
  primary_physician: string
  reason: string
  schedule: string
  status: Status
  note: string | null
  cancellation_reason: string | null
  created_at: string
  patient?: PatientRow | null
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

const mapPatientFromRow = (record: PatientRow | null | undefined): Patient | null => {
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

const mapAppointment = (record: AppointmentRow | null): Appointment | null => {
  if (!record) return null

  return {
    id: record.id,
    userId: record.user_id,
    patientId: record.patient_id,
    primaryPhysician: record.primary_physician,
    reason: record.reason,
    schedule: record.schedule,
    status: record.status,
    note: record.note,
    cancellationReason: record.cancellation_reason,
    patient: mapPatientFromRow(record.patient),
    createdAt: record.created_at,
  }
}

export const createAppointment = async ({
  userId,
  patientId,
  primaryPhysician,
  reason,
  schedule,
  status,
  note,
}: CreateAppointmentParams) => {
  try {
    const payload = {
      user_id: userId,
      patient_id: patientId,
      primary_physician: primaryPhysician,
      reason,
      schedule: schedule instanceof Date ? schedule.toISOString() : new Date(schedule).toISOString(),
      status,
      note: note ?? null,
      cancellation_reason: null,
    }

    const created = await insertRow<AppointmentRow>("appointments", payload)

    const appointment = created?.[0]
    if (!appointment) return null

    const detailed = await selectRows<AppointmentRow>("appointments", {
      select: "*,patient:patients(*)",
      id: `eq.${appointment.id}`,
      limit: "1",
    })

    return parseStringify(mapAppointment(detailed?.[0] ?? appointment))
  } catch (error) {
    console.error("Error creating appointment:", error)
    throw error
  }
}

export const getRecentAppointments = async () => {
  try {
    const appointments = await selectRows<AppointmentRow>("appointments", {
      select: "*,patient:patients(*)",
      order: "created_at.desc",
      limit: "25",
    })

    const results = appointments?.map((appointment) => mapAppointment(appointment)) ?? []
    return parseStringify(results)
  } catch (error) {
    console.error("Error fetching appointments:", error)
  }
}

export const getAppointmentsByUser = async (userId: string) => {
  try {
    const appointments = await selectRows<AppointmentRow>("appointments", {
      select: "*,patient:patients(*)",
      user_id: `eq.${userId}`,
      order: "created_at.desc",
    })

    const results = appointments?.map((appointment) => mapAppointment(appointment)) ?? []
    return parseStringify(results)
  } catch (error) {
    console.error("Error fetching user appointments:", error)
  }
}

export const updateAppointment = async ({
  appointmentId,
  appointment,
}: Pick<UpdateAppointmentParams, "appointmentId" | "appointment">) => {
  try {
    const payload = {
      status: appointment.status,
      primary_physician: appointment.primaryPhysician,
      schedule:
        appointment.schedule instanceof Date
          ? appointment.schedule.toISOString()
          : new Date(appointment.schedule).toISOString(),
      note: appointment.note ?? null,
      cancellation_reason: appointment.cancellationReason ?? null,
    }

    const updated = await updateRows<AppointmentRow>(
      "appointments",
      {
        id: `eq.${appointmentId}`,
      },
      payload
    )

    const recordWithPatient = updated?.[0]
    if (!recordWithPatient) return null

    if (recordWithPatient.patient) {
      return parseStringify(mapAppointment(recordWithPatient))
    }

    const patient = await getPatientById(recordWithPatient.patient_id)
    return parseStringify({ ...mapAppointment(recordWithPatient), patient })
  } catch (error) {
    console.error("Error updating appointment:", error)
    throw error
  }
}
