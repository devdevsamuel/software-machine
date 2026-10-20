import type { ReactElement } from 'react'

interface Service {
  title: string
  description: string
  icon: ReactElement
}

const services: Service[] = [
  {
    title: 'Custom Web Applications',
    description:
      'Internal tools, dashboards, and customer portals built around how your team actually works — not the other way around.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
      />
    ),
  },
  {
    title: 'APIs & Integrations',
    description:
      'Connect the systems you already use and automate the busywork between them: payments, CRMs, inventory, email, and more.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
      />
    ),
  },
  {
    title: 'MVP Development',
    description:
      'From idea to a working product your first users can touch. Small scope, fast feedback, no wasted budget.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.63 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      />
    ),
  },
  {
    title: 'Maintenance & Support',
    description:
      'Monitoring, fixes, and steady improvements — so the software your business depends on never quietly becomes legacy.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.586 8.668c.24.24.629.24.87 0l1.518-1.519a.615.615 0 0 0 0-.87l-1.52-1.518a.615.615 0 0 0-.868 0l-1.519 1.519a.615.615 0 0 0 0 .869l1.519 1.518Z"
      />
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
            What we build
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Every engagement is scoped to a concrete business outcome. No bloat, no mystery hours —
            just software that earns its keep.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-2xl border border-white/10 bg-slate-900/50 p-6 transition hover:border-indigo-400/40 hover:bg-slate-900 sm:p-8"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-400/30 transition group-hover:bg-indigo-500/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  {service.icon}
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-100">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
