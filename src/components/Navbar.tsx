import { Link, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useState, useEffect, useRef } from "react"
import { onAuthStateChanged } from "firebase/auth"
import type { User } from "firebase/auth"


type NavbarProps = {
  isLoggedIn?: boolean
}

function Navbar({ isLoggedIn = false }: NavbarProps) {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
    })
    return () => unsubscribe()
  }, [])

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/")
  }

  // get initials from email or display name
  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    }
    return user?.email?.[0].toUpperCase() ?? "U"
  }

  const getDisplayName = () => {
    if (user?.displayName) return user.displayName
    return user?.email ?? "User"
  }

  return (
    <nav className="w-full border-b border-white/10 py-5 bg-[#0b1020]">
      <div className="w-full px-12 flex justify-between items-center">

        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="HireTrackr logo" className="w-8 h-8" />
          <span className="text-lg font-bold text-white tracking-tight">
            Hire<span className="text-blue-400 font-light">Trackr</span>
          </span>
        </Link>

        {isLoggedIn ? (
          <div className="flex gap-4 items-center">


            {/* user dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-medium flex items-center justify-center">
                  {getInitials()}
                </div>
                <span className="text-sm text-gray-300">{getDisplayName()}</span>
                <span className="text-gray-500 text-xs">{dropdownOpen ? "▲" : "▼"}</span>
              </button>

              {/* dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-56 bg-[#0f1628] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">

                  {/* user info */}
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-medium text-white">{getDisplayName()}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>

                  {/* menu items */}
                  <div className="py-1">
                    <Link
                      to="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      ⚙ Settings
                    </Link>

                  </div>

                  <div className="border-t border-white/10 py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                    >
                      → Log out
                    </button>
                  </div>

                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            <Link to="/login" className="text-sm px-4 py-2 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:border-white/40 transition-colors">
              Log in
            </Link>
            <Link to="/signup" className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
              Get started
            </Link>
          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar