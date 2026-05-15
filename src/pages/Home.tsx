import Navbar from "../components/Navbar";

const Home = () => {
  return (
   <div className="min-h-screen w-full ">
      <Navbar />

     <section className="max-w-4xl mx-auto px-8 pt-16 pb-12 text-center">


  <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
    Now in beta — free to use
  </div>

  {/* headline */}
  <h1 className="text-5xl font-bold text-white leading-tight tracking-tight mb-4">
    Track every application,<br />
    <span className="text-blue-400 font-light">land your next role faster</span>
  </h1>

  {/* subtext */}
  <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
    Stop losing track of where you applied. Manage every job application in one clean, visual board.
  </p>

  {/* CTA buttons */}
  <div className="flex gap-4 justify-center mb-12">
    <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors">
      Get started free
    </button>
    <button className="px-6 py-3 border border-white/20 text-gray-300 rounded-lg hover:text-white hover:border-white/40 transition-colors">
      See how it works
    </button>
  </div>

  {/* divider */}
  <div className="border-t border-white/10 mb-12"></div>

  {/* features */}
  <div className="grid grid-cols-3 gap-6 text-left">

    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 text-blue-400 text-xl">
        ⊞
      </div>
      <h3 className="text-white font-semibold mb-2">Kanban board</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        Drag and drop your applications across stages. See your entire job search at a glance.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 text-blue-400 text-xl">
        ◷
      </div>
      <h3 className="text-white font-semibold mb-2">Timeline tracking</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        Log every step from application to offer. Never forget where you left off.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 text-blue-400 text-xl">
        ✎
      </div>
      <h3 className="text-white font-semibold mb-2">Notes per job</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        Add interview notes, contacts, and links. Stay organized at every stage.
      </p>
    </div>

  </div>

</section>
{/* footer */}
<footer className="border-t border-white/10 mt-16">
  <div className="w-full px-12 py-8 flex justify-between items-center">
    
    {/* logo */}
    <div className="flex items-center gap-2">
      <img src="/logo.svg" alt="HireTrackr logo" className="w-7 h-7" />
      <span className="text-sm font-bold text-white tracking-tight">
        Hire<span className="text-blue-400 font-light">Trackr</span>
      </span>
    </div>

    {/* links */}
    <div className="flex gap-6 ml-32">
      <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">About</a>
      <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Privacy</a>
      <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Terms</a>
    </div>

    {/* copyright */}
    <p className="text-sm text-gray-600">© 2026 HireTrackr. All rights reserved.</p>

  </div>
</footer>
    </div>
  );
};

export default Home;