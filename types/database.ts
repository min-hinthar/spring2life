export interface Patient {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  birthDate: string
  gender: Gender
  address: string
  occupation: string
  emergencyContactName: string
  emergencyContactNumber: string
  primaryPhysician: string
  insuranceProvider: string
  insurancePolicyNumber: string
  allergies?: string
  currentMedication?: string
  familyMedicalHistory?: string
  pastMedicalHistory?: string
  identificationType?: string
  identificationNumber?: string
  identificationDocumentPath: string | null
  identificationDocumentUrl: string | null
  treatmentConsent: boolean
  disclosureConsent: boolean
  privacyConsent: boolean
  createdAt?: string
}

export interface Appointment {
  id: string
  userId: string
  patientId: string
  schedule: string
  status: Status
  primaryPhysician: string
  reason: string
  note?: string | null
  cancellationReason?: string | null
  patient: Patient | null
  createdAt?: string
}
