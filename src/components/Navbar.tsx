type NavbarProps = {
  isLoggedIn?: boolean
}

function Navbar({ isLoggedIn = false }: NavbarProps) {
  return (
<nav className="w-full border-b border-white/10  bg-[#0b1020]">
  <div className="w-full px-12 py-5 flex justify-between items-center">
    <div className="flex items-center gap-2">
  <img src="/logo.svg" alt="HireTrackr logo" className="w-8 h-8" />
  <span className="text-lg font-bold text-white tracking-tight">
    Hire<span className="text-blue-400 font-light">Trackr</span>
  </span>
</div>

    <div className="flex gap-3 items-center">
      <button className="text-sm px-4 py-2 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:border-white/40 transition-colors">
        Log in
      </button>
      <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
        Get started
      </button>
    </div>
  </div>
</nav>
  )
}

export default Navbar