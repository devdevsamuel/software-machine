import GearLogo from './GearLogo'

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 text-slate-100">
          <GearLogo className="h-6 w-6 text-indigo-400" />
          <span className="text-sm font-semibold tracking-tight">Software Machine</span>
        </a>

        <nav aria-label="Footer" className="flex items-center gap-6 text-sm text-slate-500">
          <a href="#services" className="transition hover:text-slate-300">
            Services
          </a>
          <a href="#process" className="transition hover:text-slate-300">
            Process
          </a>
          <a href="#contact" className="transition hover:text-slate-300">
            Contact
          </a>
        </nav>

        <p className="text-sm text-slate-600">
          © {new Date().getFullYear()} Software Machine. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
