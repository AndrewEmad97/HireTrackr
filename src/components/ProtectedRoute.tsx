import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"

type ProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login")
      }
      setChecking(false)
    })

    return () => unsubscribe()
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute