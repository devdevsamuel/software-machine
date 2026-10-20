import { useState, type FormEvent } from 'react'
import { z } from 'zod'
import { inquirySchema, INQUIRY_LIMITS, type InquiryInput } from '../lib/validation'
import { InquiryNotConfiguredError, submitInquiry } from '../services/inquiries'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

type FieldErrors = Partial<Record<keyof InquiryInput, string>>

const emptyFields: InquiryInput = { name: '', email: '', message: '' }

const inputBase =
  'mt-1.5 block w-full rounded-lg border bg-slate-900/70 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:ring-2'
const inputOk = 'border-slate-700 focus:border-indigo-400 focus:ring-indigo-500/30'
const inputInvalid = 'border-red-500/70 focus:border-red-400 focus:ring-red-500/30'

function inputClass(hasError: boolean) {
  return `${inputBase} ${hasError ? inputInvalid : inputOk}`
}

export default function InquiryForm() {
  const [fields, setFields] = useState<InquiryInput>(emptyFields)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [submitError, setSubmitError] = useState<string>('')

  const isSubmitting = status === 'submitting'

  function updateField(field: keyof InquiryInput, value: string) {
    setFields((prev) => ({ ...prev, [field]: value }))
    // Clear a field's error as soon as the user starts fixing it.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Guard against duplicate submissions while a request is in flight.
    if (isSubmitting) return

    const result = inquirySchema.safeParse(fields)
    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error)
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      })
      setStatus('idle')
      return
    }

    setErrors({})
    setSubmitError('')
    setStatus('submitting')

    try {
      await submitInquiry(result.data)
      // Only reached after Firestore confirms the write succeeded.
      setStatus('success')
      setFields(emptyFields)
    } catch (error) {
      console.error('Inquiry submission failed:', error)
      setStatus('error')
      setSubmitError(
        error instanceof InquiryNotConfiguredError
          ? error.message
          : 'Something went wrong while sending your inquiry. Your message was not saved — please try again in a moment.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-6 py-16 text-center"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-12 w-12 text-emerald-400"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h3 className="mt-4 text-xl font-semibold text-slate-50">Inquiry sent</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
          Thanks for reaching out — your inquiry has been saved. We'll get back to you within one
          business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 rounded-lg border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          Send another inquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {status === 'error' && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-300"
        >
          {submitError}
        </div>
      )}

      <div>
        <label htmlFor="inquiry-name" className="block text-sm font-medium text-slate-300">
          Name
        </label>
        <input
          id="inquiry-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Doe"
          value={fields.name}
          onChange={(event) => updateField('name', event.target.value)}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
          className={inputClass(Boolean(errors.name))}
        />
        {errors.name && (
          <p id="inquiry-name-error" className="mt-1.5 text-sm text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="inquiry-email" className="block text-sm font-medium text-slate-300">
          Email
        </label>
        <input
          id="inquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@company.com"
          value={fields.email}
          onChange={(event) => updateField('email', event.target.value)}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
          className={inputClass(Boolean(errors.email))}
        />
        {errors.email && (
          <p id="inquiry-email-error" className="mt-1.5 text-sm text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="inquiry-message" className="block text-sm font-medium text-slate-300">
            Project description
          </label>
          <span className="text-xs text-slate-500" aria-hidden="true">
            {fields.message.length}/{INQUIRY_LIMITS.messageMax}
          </span>
        </div>
        <textarea
          id="inquiry-message"
          name="message"
          rows={5}
          placeholder="What are you building, what problem does it solve, and when do you need it?"
          value={fields.message}
          onChange={(event) => updateField('message', event.target.value)}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
          className={`${inputClass(Boolean(errors.message))} resize-y`}
        />
        {errors.message && (
          <p id="inquiry-message-error" className="mt-1.5 text-sm text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-indigo-500"
      >
        {isSubmitting && (
          <svg
            className="h-5 w-5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"
            />
          </svg>
        )}
        {isSubmitting ? 'Sending…' : 'Send inquiry'}
      </button>

      <p className="text-center text-xs leading-relaxed text-slate-500">
        We'll only use your details to reply to this inquiry. No newsletters, no spam.
      </p>
    </form>
  )
}
