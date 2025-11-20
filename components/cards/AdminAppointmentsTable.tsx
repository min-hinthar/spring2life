"use client"

import { Fragment, useState, useTransition } from "react"

import { AppointmentRecord } from "@/types/database"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Props {
  appointments: AppointmentRecord[]
}

const AdminAppointmentsTable = ({ appointments }: Props) => {
  const [openRow, setOpenRow] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [rescheduleAt, setRescheduleAt] = useState<Record<string, string>>({})
  const [cancelReason, setCancelReason] = useState<Record<string, string>>({})
  const [feedback, setFeedback] = useState<string>("")
  const [isPending, startTransition] = useTransition()

  const handleAction = (params: UpdateAppointmentInput) => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/appointments/${params.appointmentId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error?.error || "Unable to update appointment")
        }

        setFeedback(`Appointment updated: ${params.status}`)
      } catch (error) {
        setFeedback(error instanceof Error ? error.message : "Unable to update appointment")
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm text-white">
          <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/60">
            <tr>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Schedule</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Manage</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              const formatted = formatDateTime(appointment.scheduled_at)
              const isOpen = openRow === appointment.id

              return (
                <Fragment key={appointment.id}>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-4">
                      <p className="font-semibold">{appointment.patients?.full_name}</p>
                      <p className="text-xs text-white/60">{appointment.patients?.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p>{appointment.provider}</p>
                      <p className="text-xs text-white/60">{appointment.focus_area}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p>{formatted.dateTime}</p>
                      <p className="text-xs text-white/60">{appointment.session_type}</p>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={appointment.status} />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setOpenRow(isOpen ? null : appointment.id)}
                        className="bg-white/10 text-white hover:bg-white/20"
                      >
                        {isOpen ? "Hide" : "Manage"}
                      </Button>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="border-t border-white/5 bg-white/5">
                      <td className="px-4 py-4" colSpan={5}>
                        <div className="grid gap-4 md:grid-cols-3">
                          <label className="text-xs uppercase tracking-widest text-white/60">
                            Reschedule to
                            <input
                              type="datetime-local"
                              value={rescheduleAt[appointment.id] ?? ""}
                              onChange={(event) =>
                                setRescheduleAt((prev) => ({ ...prev, [appointment.id]: event.target.value }))
                              }
                              className="mt-2 w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-white"
                            />
                          </label>
                          <label className="text-xs uppercase tracking-widest text-white/60">
                            Coordinator note
                            <Textarea
                              value={notes[appointment.id] ?? ""}
                              onChange={(event) =>
                                setNotes((prev) => ({ ...prev, [appointment.id]: event.target.value }))
                              }
                              className="mt-2 bg-transparent"
                              placeholder="Share prep notes or reminders"
                            />
                          </label>
                          <label className="text-xs uppercase tracking-widest text-white/60">
                            Cancellation reason
                            <Textarea
                              value={cancelReason[appointment.id] ?? ""}
                              onChange={(event) =>
                                setCancelReason((prev) => ({ ...prev, [appointment.id]: event.target.value }))
                              }
                              className="mt-2 bg-transparent"
                              placeholder="Let the patient know why"
                            />
                          </label>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <Button
                            className="bg-green-500 text-white hover:bg-green-400"
                            disabled={isPending}
                            onClick={() =>
                              handleAction({
                                appointmentId: appointment.id,
                                status: "confirmed",
                                note: notes[appointment.id],
                              })
                            }
                          >
                            Confirm
                          </Button>
                          <Button
                            className="bg-sky-500 text-white hover:bg-sky-400"
                            disabled={isPending || !rescheduleAt[appointment.id]}
                            onClick={() =>
                              handleAction({
                                appointmentId: appointment.id,
                                status: "rescheduled",
                                scheduledAt: rescheduleAt[appointment.id]
                                  ? new Date(rescheduleAt[appointment.id])
                                  : undefined,
                                note: notes[appointment.id],
                              })
                            }
                          >
                            Reschedule
                          </Button>
                          <Button
                            variant="destructive"
                            disabled={isPending || !cancelReason[appointment.id]}
                            onClick={() =>
                              handleAction({
                                appointmentId: appointment.id,
                                status: "cancelled",
                                cancellationReason: cancelReason[appointment.id],
                              })
                            }
                          >
                            Cancel
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
      {feedback && <p className="text-sm text-green-300">{feedback}</p>}
    </div>
  )
}

export default AdminAppointmentsTable
