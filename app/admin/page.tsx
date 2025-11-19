import AppointmentCard from "@/components/cards/AppointmentCard"
import { getRecentAppointments } from "@/lib/actions/appointment.actions"
import { Appointment } from "@/types/database"
import Image from "next/image"

const AdminPage = async () => {
  const appointments = await getRecentAppointments()

  return (
    <div className="flex min-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container space-y-10">
          <header className="space-y-2">
            <p className="text-14-regular text-dark-600 uppercase tracking-wide">
              Admin Control Center
            </p>
            <h1 className="header">Appointments overview</h1>
            <p className="text-dark-700">
              Track patient requests, upcoming visits, and confirmations in real time.
            </p>
          </header>

          <div className="space-y-6">
            {appointments && appointments.length > 0 ? (
              appointments.map((appointment: Appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="rounded-2xl border border-dark-400 bg-dark-200 p-8 text-center text-dark-600">
                No appointments yet. Encourage patients to request care from the home page.
              </div>
            )}
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/admin.png"
        width={1000}
        height={1000}
        alt="admin"
        className="side-img max-w-[45%]"
      />
    </div>
  )
}

export default AdminPage
