import { useState, useEffect } from "react"
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../firebase"
import type { Job, JobStatus } from "../data"

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // get current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!userId) return

    const q = query(
      collection(db, "jobs"),
      where("userId", "==", userId)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Job[]

      setJobs(jobsData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [userId])

  // add job
  const addJob = async (job: Omit<Job, "id">) => {
    if (!userId) return
    await addDoc(collection(db, "jobs"), {
      ...job,
      userId,
    })
  }

  // update job status
  const updateJobStatus = async (jobId: string, status: JobStatus) => {
    await updateDoc(doc(db, "jobs", jobId), { status })
  }

  // delete job
  const deleteJob = async (jobId: string) => {
    await deleteDoc(doc(db, "jobs", jobId))
  }

  return { jobs, loading, addJob, updateJobStatus, deleteJob }
}