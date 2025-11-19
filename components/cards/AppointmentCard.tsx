import { formatDateTime } from "@/lib/utils"
import StatusBadge from "../StatusBadge"
import { AppointmentRecord } from "@/types/database"

interface AppointmentCardProps {
  appointment: AppointmentRecord
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const { patients, provider, status, scheduled_at, focus_area } = appointment
  const formatted = formatDateTime(scheduled_at)

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-dark-400 bg-dark-300 p-6 shadow-lg">
      <div className="flex-between gap-4 flex-wrap">
        <div>
          <p className="text-16-semibold text-white">{patients?.full_name}</p>
          <p className="text-14-regular text-dark-600">{patients?.email}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="flex flex-wrap gap-6 text-14-regular text-dark-600">
        <div>
          <p className="text-white">Provider</p>
          <p>{provider}</p>
        </div>
        <div>
          <p className="text-white">Schedule</p>
          <p>{formatted.dateTime}</p>
        </div>
      </div>

      <div>
        <p className="text-14-regular text-dark-600">Focus</p>
        <p className="text-16-semibold text-white">{focus_area}</p>
      </div>
    </article>
  )
}

export default AppointmentCard
