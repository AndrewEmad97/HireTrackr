export type JobStatus = "Applied" | "Interview" | "Offer" | "Rejected"

export type Job = {
  id: string
  company: string
  role: string
  status: JobStatus
  date: string
  location: string
}

export const mockJobs: Job[] = [
  { id: "1", company: "Vercel", role: "Junior Frontend Engineer", status: "Interview", date: "Apr 20", location: "Remote" },
  { id: "2", company: "Notion", role: "React Developer", status: "Applied", date: "Apr 18", location: "Remote" },
  { id: "3", company: "Linear", role: "UI Engineer", status: "Applied", date: "Apr 15", location: "Hybrid" },
  { id: "4", company: "Supabase", role: "Junior React Dev", status: "Offer", date: "Apr 19", location: "Remote" },
  { id: "5", company: "Stripe", role: "Frontend Engineer", status: "Rejected", date: "Apr 10", location: "On-site" },
  { id: "6", company: "Figma", role: "Frontend Dev", status: "Interview", date: "Apr 14", location: "Remote" },
  { id: "7", company: "Loom", role: "Web Developer", status: "Applied", date: "Apr 12", location: "Remote" },
  { id: "8", company: "Airbnb", role: "UI Developer", status: "Rejected", date: "Apr 7", location: "Hybrid" },
]