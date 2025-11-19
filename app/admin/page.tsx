import { getDashboardAppointments } from "@/lib/actions/appointment.actions"
import { AppointmentRecord, DashboardStats } from "@/types/database"
import AdminAppointmentsTable from "@/components/cards/AdminAppointmentsTable"

const AdminPage = async () => {
  const { appointments, stats } = await getDashboardAppointments()

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 lg:px-12">
        <header className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.3em] text-green-200">Admin control room</p>
          <h1 className="text-4xl font-semibold">Confirm, cancel, or reschedule every mental health appointment.</h1>
          <p className="text-white/70">
            This dashboard pulls data directly from Supabase tables so every update is instantly reflected for coordinators, therapists, and patients.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-4">
          {Object.entries(stats as DashboardStats).map(([key, value]) => (
            <div key={key} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-sm uppercase tracking-widest text-white/70">{key}</p>
              <p className="mt-2 text-3xl font-semibold">{value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#0a1020]/90 p-6 shadow-2xl">
          <AdminAppointmentsTable appointments={appointments as AppointmentRecord[]} />
        </section>
      </div>
    </main>
  )
}

export default AdminPage
