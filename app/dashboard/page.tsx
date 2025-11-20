import AppointmentCard from "@/components/cards/AppointmentCard"
import { getAppointmentsForUser } from "@/lib/actions/appointment.actions"
import { getPatientByEmail } from "@/lib/actions/patient.actions"
import { requireSession } from "@/lib/auth"

const DashboardPage = async () => {
  const session = await requireSession()
  const email = session?.email || ""
  const patient = email ? await getPatientByEmail(email) : null
  const appointments = email ? await getAppointmentsForUser(email) : []

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#030712] via-[#0c1628] to-[#0e1f35] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 lg:px-12">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-green-200">Welcome back</p>
          <h1 className="text-4xl font-semibold">Your care journey at a glance</h1>
          <p className="text-white/70">
            Track appointment statuses, update your profile, and stay aligned with your care team.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {["pending", "confirmed", "rescheduled"].map((status) => {
            const count = appointments.filter((appointment) => appointment.status === status).length
            return (
              <div key={status} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl">
                <p className="text-sm uppercase tracking-widest text-white/70">{status}</p>
                <p className="mt-3 text-3xl font-semibold">{count}</p>
              </div>
            )
          })}
        </section>

        <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-green-200">Upcoming & recent</p>
                <h2 className="text-2xl font-semibold">Appointment updates</h2>
              </div>
            </div>

            <div className="space-y-4">
              {appointments.length === 0 && <p className="text-sm text-white/70">No appointments yet. Book your first request.</p>}
              {appointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-green-200">Profile</p>
            <h2 className="text-2xl font-semibold">Patient context</h2>
            {patient ? (
              <div className="space-y-3 text-sm text-white/80">
                <div>
                  <p className="text-white">{patient.full_name}</p>
                  <p className="text-white/60">{patient.email}</p>
                </div>
                <p className="rounded-2xl bg-white/5 p-3 text-white/80">{patient.support_needs}</p>
                {patient.personal_story && (
                  <p className="rounded-2xl bg-white/5 p-3 text-white/70">{patient.personal_story}</p>
                )}
                <p className="text-white/70">Preferred communication: {patient.preferred_communication}</p>
                <p className="text-white/70">Emergency contact: {patient.emergency_contact_name} ({patient.emergency_contact_phone})</p>
              </div>
            ) : (
              <p className="text-sm text-white/70">Complete your registration so we can personalize every booking.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default DashboardPage
