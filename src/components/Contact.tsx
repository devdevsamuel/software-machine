import InquiryForm from './InquiryForm'

const nextSteps = [
  'We reply within one business day.',
  'A free 30-minute scoping call — you talk, we listen.',
  'You get a clear, no-obligation estimate.',
]

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
              Tell us about your project
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              A few sentences are enough. Whether it's a new product, an internal tool, or software
              that needs rescuing — this is the fastest way to find out if we're a good fit.
            </p>

            <h3 className="mt-10 text-sm font-semibold tracking-wide text-slate-200 uppercase">
              What happens next
            </h3>
            <ul className="mt-4 space-y-3">
              {nextSteps.map((step) => (
                <li key={step} className="flex items-start gap-3 text-sm text-slate-400">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 sm:p-8">
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  )
}
