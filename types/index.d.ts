declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Female" | "Male" | "Non-binary" | "Prefer not to say";
declare type Status = "pending" | "confirmed" | "cancelled" | "rescheduled";

declare interface PatientRegistrationInput {
    fullName: string;
    email: string;
    phone: string;
    birthDate: Date;
    gender: Gender;
    supportNeeds: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    preferredCommunication: string;
    careTeamNotes?: string;
}

declare interface AppointmentBookingInput {
    patientEmail: string;
    provider: string;
    specialty: string;
    sessionType: string;
    focusArea: string;
    scheduledAt: Date;
    durationMinutes: number;
    note?: string;
}

declare interface UpdateAppointmentInput {
    appointmentId: string;
    status: Status;
    scheduledAt?: Date;
    note?: string;
    cancellationReason?: string;
}