import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="text-center px-4">

        <h1 className="text-8xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-2">Page not found</h2>
        <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
          Looks like this page doesn't exist or has been moved.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 border border-white/20 text-gray-300 hover:text-white hover:border-white/40 text-sm rounded-lg transition-colors"
          >
            ← Go back
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Go home
          </button>
        </div>

      </div>
    </div>
  )
}

export default NotFound