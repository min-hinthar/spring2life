export type PatientRecord = {
  id: string
  created_at: string
  full_name: string
  email: string
  phone: string
  birth_date: string | null
  gender: string | null
  support_needs: string | null
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  preferred_communication: string | null
  care_team_notes: string | null
}

export type AppointmentRecord = {
  id: string
  created_at: string
  patient_id: string
  provider: string
  specialty: string
  session_type: string
  status: Status
  focus_area: string | null
  scheduled_at: string
  duration_minutes: number
  note: string | null
  cancellation_reason: string | null
  patients?: PatientRecord
}

export type DashboardStats = {
  pending: number
  confirmed: number
  cancelled: number
  rescheduled: number
}
