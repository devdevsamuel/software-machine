# Software Machine — Agent Guidelines

## Project
Landing page for Software Machine to present software development services and capture potential clients' inquiries.

## Tech Stack
- React + Vite + TypeScript
- Tailwind CSS (v4, via `@tailwindcss/vite` plugin)
- Firebase Cloud Firestore
- Firebase SDK (lazy-loaded via dynamic import on form submit)
- Zod for data validation
- Vercel for deployment

## Structure
- `src/components/` — landing page sections and the inquiry form
- `src/lib/firebase.ts` — lazy Firebase init (env vars, `VITE_FIREBASE_*` prefix)
- `src/lib/validation.ts` — Zod inquiry schema; limits must stay in sync with `firestore.rules`
- `src/services/inquiries.ts` — inquiry submission (validate → Firestore write)
- `firestore.rules` + `firebase.json` — security rules, deployed via Firebase CLI

## Code Guidelines
- Keep code simple, modular, and maintainable.
- Use TypeScript and avoid `any` whenever possible.
- Prioritize responsive design and accessibility.
- Keep Firebase access logic separate from UI components.
- Validate user input before processing or storing it.
- Never expose private credentials or service-account keys in frontend code.
- Use environment variables for configuration.
- Avoid unnecessary dependencies and premature abstractions.
- Follow existing project conventions and avoid unrelated changes.