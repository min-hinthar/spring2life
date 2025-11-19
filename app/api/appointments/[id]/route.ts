import { NextRequest, NextResponse } from "next/server"

import { updateAppointmentStatus } from "@/lib/actions/appointment.actions"

type Params = {
  params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const body = await request.json()
    const payload: UpdateAppointmentInput = {
      appointmentId: params.id,
      status: body.status,
      note: body.note,
      cancellationReason: body.cancellationReason,
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : undefined,
    }

    const appointment = await updateAppointmentStatus(payload)
    return NextResponse.json(appointment)
  } catch (error) {
    console.error("Failed to update appointment", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update appointment" },
      { status: 500 }
    )
  }
}
