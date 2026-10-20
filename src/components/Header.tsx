import GearLogo from './GearLogo'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 text-slate-100">
          <GearLogo className="h-7 w-7 text-indigo-400" />
          <span className="text-base font-semibold tracking-tight">Software Machine</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm md:flex">
          <a href="#services" className="text-slate-400 transition hover:text-slate-100">
            Services
          </a>
          <a href="#process" className="text-slate-400 transition hover:text-slate-100">
            Process
          </a>
          <a href="#contact" className="text-slate-400 transition hover:text-slate-100">
            Contact
          </a>
        </nav>

        <a
          href="#contact"
          className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
        >
          Start a project
        </a>
      </div>
    </header>
  )
}
