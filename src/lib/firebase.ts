import type { Firestore } from 'firebase/firestore'

/**
 * Firebase initialization module.
 *
 * All configuration comes from Vite environment variables (see `.env.example`).
 * The web API key is not a secret — Firestore access is controlled by
 * Security Rules (`firestore.rules`), not by hiding this config.
 *
 * The Firebase SDK is loaded lazily (`getDb`) so the landing page's initial
 * bundle stays small; it is only fetched when a form submission needs it.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const missingKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key)

export const isFirebaseConfigured = missingKeys.length === 0

if (!isFirebaseConfigured && import.meta.env.DEV) {
  console.warn(
    `[firebase] Missing environment variables: ${missingKeys.join(', ')}. ` +
      'Copy .env.example to .env and fill in your Firebase web app config.',
  )
}

let cachedDb: Firestore | undefined

/**
 * Lazily loads the Firebase SDK, initializes the app on first call, and
 * returns the shared Firestore instance.
 */
export async function getDb(): Promise<Firestore> {
  if (cachedDb) return cachedDb

  const [{ initializeApp }, { getFirestore }] = await Promise.all([
    import('firebase/app'),
    import('firebase/firestore'),
  ])

  cachedDb = getFirestore(initializeApp(firebaseConfig))
  return cachedDb
}
