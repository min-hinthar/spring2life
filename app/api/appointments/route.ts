import { NextRequest, NextResponse } from "next/server"

import { bookAppointment } from "@/lib/actions/appointment.actions"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const payload: AppointmentBookingInput = {
      ...body,
      scheduledAt: new Date(body.scheduledAt),
      durationMinutes: Number(body.durationMinutes),
    }

    const appointment = await bookAppointment(payload)
    return NextResponse.json(appointment)
  } catch (error) {
    console.error("Failed to create appointment", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create appointment" },
      { status: 500 }
    )
  }
}
