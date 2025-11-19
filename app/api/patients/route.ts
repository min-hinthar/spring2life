import { NextRequest, NextResponse } from "next/server"

import { registerPatientProfile } from "@/lib/actions/patient.actions"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const payload: PatientRegistrationInput = {
      ...body,
      birthDate: new Date(body.birthDate),
    }

    const patient = await registerPatientProfile(payload)
    return NextResponse.json(patient)
  } catch (error) {
    console.error("Failed to register patient", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to register" },
      { status: 500 }
    )
  }
}
