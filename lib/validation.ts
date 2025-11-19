import { z } from "zod"
import { CommunicationPreferences, FocusAreas, GenderOptions, ProviderSpecialties, SessionTypes } from "@/constants"

const phoneRegex = /^\+?[0-9]{10,15}$/

export const PatientRegistrationSchema = z.object({
  fullName: z.string().min(2, "Name must include at least two characters"),
  email: z.string().email("Please use a valid email address"),
  phone: z.string().regex(phoneRegex, "Use an international phone number"),
  birthDate: z.coerce.date({ message: "Select your date of birth" }),
  gender: z.enum(GenderOptions as [Gender, ...Gender[]]),
  supportNeeds: z
    .string()
    .min(10, "Tell us how we can support you best")
    .max(600, "Keep support notes under 600 characters"),
  personalStory: z
    .string()
    .min(20, "Share a short version of your story so we can match you well")
    .max(800, "Keep your story under 800 characters"),
  preferredLanguage: z.string().min(2, "Select a preferred language"),
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactPhone: z
    .string()
    .regex(phoneRegex, "Emergency contact phone number is invalid"),
  preferredCommunication: z.enum(
    CommunicationPreferences as [string, ...string[]],
    { errorMap: () => ({ message: "Select a communication channel" }) }
  ),
  careTeamNotes: z
    .string()
    .max(600, "Care team notes must be under 600 characters")
    .optional()
    .or(z.literal("")),
  consentToShare: z
    .boolean()
    .refine((value) => value === true, "Consent is required before continuing"),
})

export const AppointmentBookingSchema = z.object({
  patientEmail: z.string().email("Use the email connected to the patient profile"),
  provider: z.string().min(2, "Choose a provider"),
  specialty: z.enum(ProviderSpecialties as [string, ...string[]]),
  sessionType: z.enum(SessionTypes as [string, ...string[]]),
  focusArea: z.enum(FocusAreas as [string, ...string[]]),
  scheduledAt: z.coerce.date({ message: "Select a date and time" }),
  durationMinutes: z.coerce.number().min(30).max(120),
  note: z
    .string()
    .max(600, "Keep notes short and clear")
    .optional()
    .or(z.literal("")),
})

export const AdminUpdateAppointmentSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "rescheduled"] as const satisfies Status[]),
  scheduledAt: z.coerce.date().optional(),
  note: z.string().max(600).optional(),
  cancellationReason: z.string().max(600).optional(),
})
