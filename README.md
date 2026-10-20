# Software Machine — Landing Page

Landing page for Software Machine: presents software development services and collects
potential clients' inquiries through a contact form backed by Cloud Firestore.

## Tech Stack

- **React 19 + Vite + TypeScript** — UI and build tooling
- **Tailwind CSS 4** — styling, via the official `@tailwindcss/vite` plugin
- **Firebase (Cloud Firestore)** — stores form inquiries; loaded lazily so the
  initial page bundle stays small
- **Zod** — client-side validation, mirrored by Firestore Security Rules
- **Vercel** — hosting

## Project Structure

```
src/
  components/     Landing page sections (Header, Hero, Services, Process, Contact, Footer, InquiryForm)
  lib/
    firebase.ts   Lazy Firebase app/Firestore initialization (env-driven)
    validation.ts Zod schema + field limits (kept in sync with firestore.rules)
  services/
    inquiries.ts  Inquiry submission: validate -> write to Firestore
firestore.rules   Security Rules for the `inquiries` collection
firebase.json     Points the Firebase CLI at the rules file
```

## Local Setup

```bash
npm install        # install dependencies
npm run dev        # start the dev server (http://localhost:5173)
```

Other scripts:

```bash
npm run build      # type-check (tsc -b) + production build into dist/
npm run preview    # serve the production build locally
npm run lint       # ESLint over all TS/TSX files
```

## Firebase Configuration

The contact form writes inquiries to a Firestore `inquiries` collection. You need a
Firebase project (the free Spark plan is enough).

### 1. Create the project and a web app

1. Go to the [Firebase console](https://console.firebase.google.com/) → **Add project**
   (Google Analytics can be skipped).
2. In **Project settings → General → Your apps**, click the **web icon (`</>`)** to
   register a web app. Copy the `firebaseConfig` values shown.
3. In **Build → Firestore Database**, click **Create database** → start in
   **production mode** and pick a region.

### 2. Provide the config as environment variables

```bash
cp .env.example .env
```

Fill `.env` with the values from step 1:

| Variable                            | Where to find it                    |
| ----------------------------------- | ----------------------------------- |
| `VITE_FIREBASE_API_KEY`             | `firebaseConfig.apiKey`             |
| `VITE_FIREBASE_AUTH_DOMAIN`         | `firebaseConfig.authDomain`         |
| `VITE_FIREBASE_PROJECT_ID`          | `firebaseConfig.projectId`          |
| `VITE_FIREBASE_STORAGE_BUCKET`      | `firebaseConfig.storageBucket`      |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `firebaseConfig.messagingSenderId`  |
| `VITE_FIREBASE_APP_ID`              | `firebaseConfig.appId`              |

Notes:

- `.env` is git-ignored — never commit it. Only `.env.example` (placeholders) is committed.
- The web API key is **not a secret**; it identifies the project to Google. Access
  control is enforced by Firestore Security Rules below, so deploying them is required.
- Without these variables the page still renders, but the form shows a
  "not configured" error instead of submitting.

### 3. Deploy the Firestore Security Rules

`firestore.rules` allows unauthenticated visitors to **create** inquiry documents
only when the fields match the expected shape (types, lengths, email format,
`createdAt` equal to the request time, no extra fields), and **denies all public
reads, updates, and deletes**.

Deploy them with the Firebase CLI:

```bash
npm install -g firebase-tools   # once
firebase login                  # once — opens a browser to authenticate
firebase use --add              # once — select your project (creates .firebaserc)
firebase deploy --only firestore:rules
```

You can review the rules anytime in the console under
**Firestore Database → Rules**, and test them with the
[Rules Playground / local emulator](https://firebase.google.com/docs/emulator-suite).

### Remaining abuse-prevention limitations

Security Rules validate **shape, not intent**. They cannot stop a bot from
submitting many individually-valid inquiries, so the collection can still be
spammed. If that becomes a problem, options include: adding a CAPTCHA (e.g.
reCAPTCHA / hCaptcha) verified by a Cloud Function, Firebase App Check, or
rate-limiting via a Cloud Function trigger. None of these are included in this MVP.

## Deployment (Vercel)

No `vercel.json` is needed: the site is a single page with no client-side routing,
and Vercel auto-detects Vite (build command `vite build`, output directory `dist`).

1. Push the code to a Git provider (GitHub/GitLab/Bitbucket):

   ```bash
   git init && git add . && git commit -m "Initial landing page"
   # create an empty repo on your provider, then:
   git remote add origin <your-repo-url> && git push -u origin main
   ```

2. In [Vercel](https://vercel.com) → **Add New… → Project**, import the repository.
   The **Vite** framework preset is detected automatically — keep the defaults.

3. In **Project Settings → Environment Variables**, add every `VITE_FIREBASE_*`
   variable from `.env` (for the Production and Preview environments). Vite inlines
   `VITE_*` variables at build time, so the build fails to submit inquiries without them.

4. Click **Deploy**. Subsequent pushes to the default branch deploy automatically;
   pull requests get preview deployments.

5. Make sure the Firestore Security Rules are deployed to the same Firebase project
   (previous section), or submissions will be denied.

## How It Works (form flow)

1. The form validates input with Zod (`src/lib/validation.ts`) and shows inline
   field errors before anything is sent.
2. `submitInquiry` (`src/services/inquiries.ts`) re-validates, lazily loads the
   Firebase SDK, and writes `{ name, email, message, createdAt }` to `inquiries`
   with a server timestamp.
3. The UI disables inputs while submitting (preventing duplicates), shows a success
   panel **only after Firestore confirms the write**, and shows an explicit error —
   stating the message was *not* saved — on any failure.
