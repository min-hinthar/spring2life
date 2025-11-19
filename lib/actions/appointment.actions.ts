"use server"

import { Client, Databases, ID, Query, Models } from "node-appwrite"
import {
  API_KEY,
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  ENDPOINT,
  PROJECT_ID,
} from "../appwrite.config"
import { parseStringify } from "../utils"
import { getPatientById } from "./patient.actions"

const client = new Client()
  .setEndpoint(ENDPOINT!)
  .setProject(PROJECT_ID!)
  .setKey(API_KEY!)

const databases = new Databases(client)

type AppointmentRecord = Models.Document & {
  patientId?: string
  patient?: string
}

const withPatient = async (appointment: AppointmentRecord | null) => {
  if (!appointment) return appointment

  const patientId = appointment.patientId || appointment.patient
  const patient = patientId ? await getPatientById(patientId) : null

  return {
    ...appointment,
    patient,
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
    const appointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        patientId,
        primaryPhysician,
        reason,
        schedule: schedule instanceof Date ? schedule.toISOString() : schedule,
        status,
        note,
        cancellationReason: "",
      }
    )

    const recordWithPatient = await withPatient(appointment)
    return parseStringify(recordWithPatient)
  } catch (error) {
    console.error("Error creating appointment:", error)
    throw error
  }
}

export const getRecentAppointments = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt"), Query.limit(25)]
    )

    const results = await Promise.all(
      appointments.documents.map((appointment) => withPatient(appointment))
    )

    return parseStringify(results)
  } catch (error) {
    console.error("Error fetching appointments:", error)
  }
}

export const getAppointmentsByUser = async (userId: string) => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.equal("userId", [userId]), Query.orderDesc("$createdAt")]
    )

    const results = await Promise.all(
      appointments.documents.map((appointment) => withPatient(appointment))
    )

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
      primaryPhysician: appointment.primaryPhysician,
      schedule:
        appointment.schedule instanceof Date
          ? appointment.schedule.toISOString()
          : appointment.schedule,
      note: appointment.note,
      cancellationReason: appointment.cancellationReason ?? "",
    }

    const updated = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      payload
    )

    const recordWithPatient = await withPatient(updated)
    return parseStringify(recordWithPatient)
  } catch (error) {
    console.error("Error updating appointment:", error)
    throw error
  }
}
