import { useNavigate } from "react-router-dom"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import type { Job } from "../data"
import StatusBadge from "./StatusBadge"

type JobCardProps = {
  job: Job
}

const JobCard = ({ job }: JobCardProps) => {
  const navigate = useNavigate()

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: job.id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : "auto",
  }
  const handleClick = () => {
  navigate(`/jobs/${job.id}`)
}

  return (
    <div
      ref={setNodeRef}
      onClick={handleClick}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors cursor-grab active:cursor-grabbing"
    >
      <p className="text-xs text-gray-500 mb-1">{job.company}</p>
      <h3 className="text-sm font-medium text-white mb-3">{job.role}</h3>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{job.date}</span>
        <StatusBadge status={job.status} />
      </div>
    </div>
  )
}

export default JobCard