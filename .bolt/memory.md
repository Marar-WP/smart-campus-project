# Project memory

## Product intent & audience

- One-page responsive web prototype for checking university room availability, with deterministic client-side rule engine and optional explanation feature.
- Continues a graded "Practice" series (currently Practice 11, built on Practice 09 export); demo/academic context, not production booking system.
- Single fictional room A101; simulated current time 09:00; existing booking 10:00–11:00. No booking creation, login, database, real API calls, or real student data.

## Brand personality & voice

- Functional, transparent, trustworthy. Deterministic results clearly separated from any explanation output.
- Explanations are constrained: at most two respectful sentences, only supplied facts, never invent booking details or change availability status.

## Visual design & UX direction

- Single-page React + Tailwind layout, responsive for desktop and narrow/mobile.
- Check Availability button → structured result display; optional Explain availability button → separately labeled explanation panel.
- Mock mode selector demonstrates timeout, API failure, and missing key adapter states.
- Any changed form field (time, room label, etc.) must clear previous result and explanation to avoid stale displays.

## Decisions, constraints & rationale

- Stack: Vite + React + TypeScript + Tailwind + lucide-react; `@/` path alias maps to `src/`. No extra UI/icon packages.
- Availability logic lives in `checkAvailability` (pure, immutable); tests assert it is unchanged by explanation feature.
- Explanation uses validated mock adapter; output schema requires JSON with exactly one `explanation` string. Response validation rejects: malformed/missing, over-length, contradictory, invented booking details, extra fields, or wrong availability — falling back to a fixed approved phrase.
- No real LLM provider integrated; any future provider must be server-side with keys kept on the server.
- Tests: 16 availability + 20 explanation cases; run via `node --experimental-strip-types`. All passing; typecheck, lint, build all clean (Vite 5.4.21).

## Open questions & assumptions

- No new public URL created yet; publishing requires importing updated sources into publishing workspace.
- Offline `smart-campus-preview.html` standalone demo exists alongside Vite workflow.
- Environment note: sandbox may have newer dependencies than `package.json` pins; `npm install` used to sync lockfile when `npm ci` failed.