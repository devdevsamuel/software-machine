export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-96 w-[64rem] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-32 pb-20 text-center sm:px-6 sm:pt-40 sm:pb-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-indigo-300">
          Custom software development studio
        </span>

        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
          Software that runs your business like a{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
            well-oiled machine
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          Software Machine designs, builds, and maintains custom web applications, APIs, and
          integrations — so your team can stop fighting spreadsheets and manual work, and focus on
          growing the business.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="w-full rounded-xl bg-indigo-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 sm:w-auto"
          >
            Start your project
          </a>
          <a
            href="#services"
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-8 py-3.5 text-base font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 sm:w-auto"
          >
            Explore services
          </a>
        </div>

        <p className="mt-12 text-sm text-slate-500">
          Web applications · APIs &amp; integrations · MVPs · Maintenance &amp; support
        </p>
      </div>
    </section>
  )
}
