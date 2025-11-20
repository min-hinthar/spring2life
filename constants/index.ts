export const GenderOptions: Gender[] = [
  "Female",
  "Male",
  "Non-binary",
  "Prefer not to say",
]

export const CommunicationPreferences = [
  "Phone call",
  "SMS text",
  "WhatsApp",
  "Email",
]

export const LanguagePreferences = [
  "English",
  "Burmese",
  "Shan",
  "Karen",
  "Mon",
]

export const SessionTypes = [
  "Individual Therapy",
  "Group Processing",
  "Family Session",
  "Crisis Intervention",
]

export const FocusAreas = [
  "Anxiety & grounding",
  "Depression recovery",
  "PTSD processing",
  "Career counseling",
  "Family systems",
  "Trauma-informed yoga",
]

export const ProviderSpecialties = [
  "Trauma therapist",
  "Psychiatrist",
  "Mindfulness coach",
  "Peer supporter",
]

export const CareTeam = [
  {
    image: "/assets/images/dr-green.png",
    name: "Dr. Lar Khine",
    specialty: "Trauma therapist",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Dr. Maya Lwin",
    specialty: "Psychiatrist",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Ko Htet",
    specialty: "Mindfulness coach",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Daw Sar Yu",
    specialty: "Peer supporter",
  },
]

export const PatientRegistrationDefaults = {
  fullName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: GenderOptions[0],
  supportNeeds: "",
  personalStory: "",
  preferredLanguage: LanguagePreferences[0],
  emergencyContactName: "",
  emergencyContactPhone: "",
  preferredCommunication: CommunicationPreferences[0],
  careTeamNotes: "",
}

export const StatusIcon: Record<Status, string> = {
  pending: "/assets/icons/pending.svg",
  confirmed: "/assets/icons/check.svg",
  cancelled: "/assets/icons/cancelled.svg",
  rescheduled: "/assets/icons/calendar.svg",
}

export const FeatureHighlights = [
  {
    title: "Care coordination",
    description:
      "One dashboard to review every request, approve care plans, and keep families informed in real time.",
  },
  {
    title: "Personalized therapy",
    description:
      "Patients register once and build a living profile with support preferences, trusted contacts, and notes for the care team.",
  },
  {
    title: "Appointment autopilot",
    description:
      "Supabase triggers keep requests, confirmations, and cancellations perfectly in sync across devices.",
  },
]

export const JourneySteps = [
  {
    label: "1",
    title: "Register",
    body: "Patients craft a profile that highlights their story, emergency contacts, and preferred communication style.",
  },
  {
    label: "2",
    title: "Book",
    body: "Match with therapists and psychiatrists, select the session style, and reserve multiple dates instantly.",
  },
  {
    label: "3",
    title: "Review",
    body: "The admin portal surfaces every new request so coordinators can confirm, reschedule, or cancel with context.",
  },
  {
    label: "4",
    title: "Care",
    body: "Everyone receives proactive reminders and updates thanks to Supabase webhooks and automation-ready data.",
  },
]
