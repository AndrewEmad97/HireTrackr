import { useState } from "react"
import type { Job, JobStatus } from "../data"

type EditJobModalProps = {
  job: Job
  onClose: () => void
  onSave: (updatedJob: Omit<Job, "id">) => void
}

const EditJobModal = ({ job, onClose, onSave }: EditJobModalProps) => {
  const [company, setCompany] = useState(job.company)
  const [role, setRole] = useState(job.role)
  const [status, setStatus] = useState<JobStatus>(job.status)
  const [location, setLocation] = useState(job.location)

  const handleSave = () => {
    if (!company || !role) return

    onSave({
      company,
      role,
      status,
      location,
      date: job.date,
    })

    onClose()
  }

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      />

      {/* modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <div className="bg-[#0f1628] border border-white/10 rounded-2xl p-6">

          {/* header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white">Edit job</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors text-xl"
            >
              ✕
            </button>
          </div>

          {/* fields */}
          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-300">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-300">Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-300">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-300">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as JobStatus)}
                className="bg-[#0b1020] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

          </div>

          {/* buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm text-white font-medium transition-colors"
            >
              Save changes
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default EditJobModal