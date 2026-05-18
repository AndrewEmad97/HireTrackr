import { useDroppable } from "@dnd-kit/core"
import type { Job, JobStatus } from "../data"
import JobCard from "./JobCard"

type KanbanColumnProps = {
  status: JobStatus
  jobs: Job[]
}

const columnStyles: Record<JobStatus, string> = {
  Applied: "bg-blue-500",
  Interview: "bg-amber-500",
  Offer: "bg-green-500",
  Rejected: "bg-red-500",
}

const KanbanColumn = ({ status, jobs }: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  })

  return (
    <div
      ref={setNodeRef}
      className={`border rounded-xl p-4 flex flex-col gap-3 transition-colors ${
        isOver ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10"
      }`}
    >
      {/* column header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${columnStyles[status]}`}></div>
          <h2 className="text-sm font-medium text-white">{status}</h2>
        </div>
        <span className="text-xs text-gray-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
          {jobs.length}
        </span>
      </div>

      {/* job cards */}
      {jobs.length === 0 ? (
        <div className="text-xs text-gray-600 text-center py-8 border border-dashed border-white/10 rounded-lg">
          No jobs here yet
        </div>
      ) : (
        jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))
      )}
    </div>
  )
}

export default KanbanColumn