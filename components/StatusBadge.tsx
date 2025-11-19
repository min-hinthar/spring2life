import Image from "next/image"
import { StatusIcon } from "@/constants"

const statusStyles: Record<Status, string> = {
  pending: "bg-yellow-500/10 text-yellow-200",
  scheduled: "bg-green-500/10 text-green-200",
  cancelled: "bg-red-500/10 text-red-200",
}

const StatusBadge = ({ status }: { status: Status }) => (
  <div className={`status-badge ${statusStyles[status]}`}>
    <Image src={StatusIcon[status]} width={16} height={16} alt={status} />
    <span className="text-14-medium capitalize">{status}</span>
  </div>
)

export default StatusBadge
