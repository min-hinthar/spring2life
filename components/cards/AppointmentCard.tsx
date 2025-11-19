import { formatDateTime } from "@/lib/utils"
import StatusBadge from "../StatusBadge"
import { Appointment } from "@/types/database"

interface AppointmentCardProps {
  appointment: Appointment
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const { patient, primaryPhysician, reason, status, schedule } = appointment
  const formatted = formatDateTime(schedule)

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-dark-400 bg-dark-300 p-6 shadow-lg">
      <div className="flex-between gap-4 flex-wrap">
        <div>
          <p className="text-16-semibold text-white">{patient?.name}</p>
          <p className="text-14-regular text-dark-600">{patient?.email}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="flex flex-wrap gap-6 text-14-regular text-dark-600">
        <div>
          <p className="text-white">Physician</p>
          <p>{primaryPhysician}</p>
        </div>
        <div>
          <p className="text-white">Schedule</p>
          <p>{formatted.dateTime}</p>
        </div>
      </div>

      <div>
        <p className="text-14-regular text-dark-600">Reason</p>
        <p className="text-16-semibold text-white">{reason}</p>
      </div>
    </article>
  )
}

export default AppointmentCard
