import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"
import Navbar from "../components/Navbar"
import KanbanColumn from "../components/KanbanColumn"
import AddJobModal from "../components/AddJobModal"
import { useState } from "react"
import type { JobStatus } from "../data"
import { useJobs } from "../hooks/useJobs"

const columns: JobStatus[] = ["Applied", "Interview", "Offer", "Rejected"]

const Dashboard = () => {
  const { jobs, loading, addJob, updateJobStatus } = useJobs()
  const [showModal, setShowModal] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    const jobId = active.id as string
    const newStatus = over.id as JobStatus
    await updateJobStatus(jobId, newStatus)
  }

  const stats = [
    { label: "Total applied", value: jobs.length },
    { label: "In interview", value: jobs.filter((j) => j.status === "Interview").length },
    { label: "Offers", value: jobs.filter((j) => j.status === "Offer").length },
    { label: "Rejected", value: jobs.filter((j) => j.status === "Rejected").length },
  ]

  if (loading) {
    return (
      <div className="min-h-screen w-full">
        <Navbar isLoggedIn={true} />
        <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
          <p className="text-gray-400 text-sm">Loading your jobs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full">
      <Navbar isLoggedIn={true} />

      <div className="w-full px-12 py-10">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">My applications</h1>
            <p className="text-sm text-gray-400">Track and manage your job search</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            + Add job
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-4 gap-4">
            {columns.map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                jobs={jobs.filter((job) => job.status === status)}
              />
            ))}
          </div>
        </DndContext>

      </div>

      {showModal && (
        <AddJobModal
          onClose={() => setShowModal(false)}
          onAdd={addJob}
        />
      )}

    </div>
  )
}

export default Dashboard