"use server"

import { revalidatePath } from "next/cache"

import { supabaseRequest } from "../supabase"
import { AppointmentRecord, DashboardStats } from "@/types/database"
import { getPatientByEmail } from "./patient.actions"

const APPOINTMENTS_TABLE = "appointments"

export const bookAppointment = async (payload: AppointmentBookingInput) => {
  const patient = await getPatientByEmail(payload.patientEmail)

  if (!patient) {
    throw new Error("We could not find a patient with that email. Please register first.")
  }

  const [appointment] = await supabaseRequest<AppointmentRecord[]>({
    method: "POST",
    path: APPOINTMENTS_TABLE,
    body: {
      patient_id: patient.id,
      provider: payload.provider,
      specialty: payload.specialty,
      session_type: payload.sessionType,
      focus_area: payload.focusArea,
      scheduled_at: payload.scheduledAt.toISOString(),
      duration_minutes: payload.durationMinutes,
      status: "pending",
      note: payload.note ?? "",
    },
  })

  revalidatePath("/admin")
  return appointment
}

export const getDashboardAppointments = async () => {
  const appointments = await supabaseRequest<AppointmentRecord[]>({
    path: APPOINTMENTS_TABLE,
    query: {
      select: "*,patients(*)",
      order: "created_at.desc",
      limit: "25",
    },
  })

  const stats: DashboardStats = appointments.reduce(
    (acc, appointment) => {
      acc[appointment.status] = (acc[appointment.status as keyof DashboardStats] || 0) + 1
      return acc
    },
    { pending: 0, confirmed: 0, cancelled: 0, rescheduled: 0 }
  )

  return { appointments, stats }
}

export const updateAppointmentStatus = async ({
  appointmentId,
  status,
  scheduledAt,
  note,
  cancellationReason,
}: UpdateAppointmentInput) => {
  const payload: Record<string, unknown> = {
    status,
    note: note ?? "",
  }

  if (scheduledAt) {
    payload.scheduled_at = scheduledAt.toISOString()
  }

  if (status === "cancelled") {
    payload.cancellation_reason = cancellationReason ?? ""
  }

  const [appointment] = await supabaseRequest<AppointmentRecord[]>({
    method: "PATCH",
    path: APPOINTMENTS_TABLE,
    query: {
      id: `eq.${appointmentId}`,
      select: "*,patients(*)",
    },
    body: payload,
  })

  revalidatePath("/admin")
  return appointment
}
