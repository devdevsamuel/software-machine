const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'A short, free call to understand your goals. You get a clear scope and a fixed estimate — no surprises later.',
  },
  {
    number: '02',
    title: 'Build',
    description:
      "Weekly demos in small, reviewable increments. You always know what's done, what's next, and what it costs.",
  },
  {
    number: '03',
    title: 'Launch & support',
    description:
      'We ship, monitor, and stick around. Handover documentation included, ongoing support optional.',
  },
]

export default function Process() {
  return (
    <section id="process" className="scroll-mt-20 border-t border-white/5 bg-slate-900/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
            How working with us feels
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            A predictable process, from the first call to long after launch.
          </p>
        </div>

        <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step) => (
            <li key={step.number} className="relative">
              <span
                aria-hidden="true"
                className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-5xl font-bold text-transparent"
              >
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-100">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
