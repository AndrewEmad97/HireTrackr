import type { JobStatus } from "../data"

type StatusBadgeProps = {
  status: JobStatus
}

const statusStyles: Record<JobStatus, string> = {
  Applied: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Interview: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Offer: "bg-green-500/10 text-green-400 border border-green-500/20",
  Rejected: "bg-red-500/10 text-red-400 border border-red-500/20",
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  )
}

export default StatusBadge