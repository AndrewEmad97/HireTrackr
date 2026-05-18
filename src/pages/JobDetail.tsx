import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { db } from "../firebase"
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore"
import Navbar from "../components/Navbar"
import StatusBadge from "../components/StatusBadge"
import type { Job } from "../data"
import EditJobModal from "../components/EditJobModal"

const JobDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleDelete = async () => {
    if (!id) return
    await deleteDoc(doc(db, "jobs", id))
    navigate("/dashboard")
  }

  const handleEdit = async (updatedJob: Omit<Job, "id">) => {
    if (!id) return
    await updateDoc(doc(db, "jobs", id), { ...updatedJob })
    setJob((prev) => prev ? { ...prev, ...updatedJob } : prev)
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!id) return
    await updateDoc(doc(db, "jobs", id), { status: newStatus })
    setJob((prev) => prev ? { ...prev, status: newStatus as any } : prev)
  }

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return
      const docRef = doc(db, "jobs", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setJob({ id: docSnap.id, ...docSnap.data() } as Job)
      }
      setLoading(false)
    }
    fetchJob()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen w-full">
        <Navbar isLoggedIn={true} />
        <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen w-full">
        <Navbar isLoggedIn={true} />
        <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
          <div className="text-center">
            <p className="text-gray-400 mb-4">Job not found</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Back to dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full">
      <Navbar isLoggedIn={true} />

      <div className="w-full px-4 md:px-12 py-6 md:py-10">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          ← Back to dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">{job.company}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{job.role}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={job.status} />
              <span className="text-xs text-gray-500 border border-white/10 px-2.5 py-1 rounded-full">{job.location}</span>
              <span className="text-xs text-gray-500 border border-white/10 px-2.5 py-1 rounded-full">Applied {job.date}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowEditModal(true)}
              className="text-sm px-4 py-2 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-white/20 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-sm px-4 py-2 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-sm font-medium text-white mb-4">Notes</h2>
            <textarea
              placeholder="Add notes about this role, interview prep, contacts..."
              rows={10}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-4">

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-sm font-medium text-white mb-4">Status</h2>
              <select
                value={job.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full bg-[#0b1020] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="Applied" className="bg-[#0b1020]">Applied</option>
                <option value="Interview" className="bg-[#0b1020]">Interview</option>
                <option value="Offer" className="bg-[#0b1020]">Offer</option>
                <option value="Rejected" className="bg-[#0b1020]">Rejected</option>
              </select>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-sm font-medium text-white mb-4">Timeline</h2>

              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-sm text-white">Applied</p>
                    <p className="text-xs text-gray-500">{job.date}</p>
                  </div>
                </div>

                {(job.status === "Interview" || job.status === "Offer" || job.status === "Rejected") && (
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                    <div>
                      <p className="text-sm text-white">Interview</p>
                      <p className="text-xs text-gray-500">Scheduled</p>
                    </div>
                  </div>
                )}

                {job.status === "Offer" && (
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                    <div>
                      <p className="text-sm text-white">Offer received</p>
                      <p className="text-xs text-gray-500">Congratulations!</p>
                    </div>
                  </div>
                )}

                {job.status === "Rejected" && (
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                    <div>
                      <p className="text-sm text-white">Rejected</p>
                      <p className="text-xs text-gray-500">Keep going!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {showEditModal && job && (
        <EditJobModal
          job={job}
          onClose={() => setShowEditModal(false)}
          onSave={handleEdit}
        />
      )}
    </div>
  )
}

export default JobDetail