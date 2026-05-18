import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { updateProfile, updatePassword, deleteUser } from "firebase/auth"
import { auth } from "../firebase"
import Navbar from "../components/Navbar"

const Settings = () => {
  const navigate = useNavigate()
  const user = auth.currentUser

  const [name, setName] = useState(user?.displayName ?? "")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [nameSuccess, setNameSuccess] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [nameError, setNameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpdateName = async () => {
    if (!name) return
    setNameError("")
    setNameSuccess("")
    try {
      setLoading(true)
      await updateProfile(user!, { displayName: name })
      setNameSuccess("Name updated successfully!")
    } catch {
      setNameError("Failed to update name. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async () => {
    setPasswordError("")
    setPasswordSuccess("")

    if (!newPassword || !confirmPassword) {
      setPasswordError("Please fill in both fields")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return
    }

    try {
      setLoading(true)
      await updatePassword(user!, newPassword)
      setPasswordSuccess("Password updated successfully!")
      setNewPassword("")
      setConfirmPassword("")
    } catch {
      setPasswordError("Failed to update password. Please log out and log back in first.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This cannot be undone.")
    if (!confirmed) return

    try {
      await deleteUser(user!)
      navigate("/")
    } catch {
      alert("Failed to delete account. Please log out and log back in first.")
    }
  }

  return (
    <div className="min-h-screen w-full">
      <Navbar isLoggedIn={true} />

     <div className="w-full px-12 py-10 max-w-2xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
          <p className="text-sm text-gray-400">Manage your account preferences</p>
        </div>

        {/* profile section */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-4">
          <h2 className="text-sm font-medium text-white mb-4">Profile</h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-300">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                value={user?.email ?? ""}
                disabled
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-600">Email cannot be changed</p>
            </div>

            {nameError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">
                {nameError}
              </div>
            )}

            {nameSuccess && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-lg">
                {nameSuccess}
              </div>
            )}

            <button
              onClick={handleUpdateName}
              disabled={loading}
              className="self-start px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Save changes
            </button>
          </div>
        </div>

        {/* password section */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-4">
          <h2 className="text-sm font-medium text-white mb-4">Change password</h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-300">New password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-300">Confirm new password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {passwordError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-lg">
                {passwordSuccess}
              </div>
            )}

            <button
              onClick={handleUpdatePassword}
              disabled={loading}
              className="self-start px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Update password
            </button>
          </div>
        </div>

        {/* danger zone */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
          <h2 className="text-sm font-medium text-red-400 mb-1">Danger zone</h2>
          <p className="text-xs text-gray-500 mb-4">Permanently delete your account and all your data</p>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-medium rounded-lg transition-colors"
          >
            Delete account
          </button>
        </div>

      </div>
    </div>
  )
}

export default Settings