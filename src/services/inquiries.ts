import { getDb, isFirebaseConfigured } from '../lib/firebase'
import { inquirySchema, type InquiryInput } from '../lib/validation'

/** Thrown when the form is used before Firebase env vars are configured. */
export class InquiryNotConfiguredError extends Error {
  constructor() {
    super(
      'The contact form is not configured yet. Firebase environment variables are missing — see .env.example.',
    )
    this.name = 'InquiryNotConfiguredError'
  }
}

/**
 * Validates and stores a client inquiry in the `inquiries` Firestore
 * collection. Resolves only after Firestore confirms the write; rejects
 * otherwise (invalid data, missing config, or a Firestore error — e.g. a
 * Security Rules denial).
 */
export async function submitInquiry(input: InquiryInput): Promise<void> {
  if (!isFirebaseConfigured) {
    throw new InquiryNotConfiguredError()
  }

  const data = inquirySchema.parse(input)

  // Loaded lazily together with the SDK chunk (see lib/firebase.ts).
  const [db, { addDoc, collection, serverTimestamp }] = await Promise.all([
    getDb(),
    import('firebase/firestore'),
  ])

  await addDoc(collection(db, 'inquiries'), {
    ...data,
    createdAt: serverTimestamp(),
  })
}
