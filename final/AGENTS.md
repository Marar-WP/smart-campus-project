# AGENTS.md — Smart Campus Room Availability Checker (Assignment 05)

## Purpose and permitted scope
This is a **fictional, single-room, read-only** React/TypeScript availability demo.
Room A101 has a sample booking at 10:00–11:00 and simulated current time 09:00.
There is no backend, authentication, database, real LLM, booking creation or payment.
An AI explanation mock is optional; it cannot override the deterministic result.

## Architecture / repository map
- `src/App.tsx` — React form, result banner, mock explanation panel.
- `src/utils/availability.ts` — sole source of availability policy; pure functions.
- `src/utils/time.ts` — converts HH:MM and minutes.
- `src/utils/explanation.ts` — bounded mock Adapter, contract and safe fallback.
- `src/data/roomFixture.ts` — fictional schedule and time.
- `tests/availability.test.mjs` — original 16 acceptance cases.
- `tests/explanation.test.mjs` — original 20 explanation/failure cases.
- `tests/robustness.test.mjs` — 13 Assignment 05 runtime-defensive cases.
- `smart-campus-preview.html` — single-file mock preview from archived runtime;
  rebuilt with `node scripts/rebuild-offline-preview.cjs` (NOT a Vite build).

## Setup and safe commands
1. Use a local/offline workspace with fake data. Never connect real services.
2. Node 22.16+ for `node --experimental-strip-types`, preferably Node 24.
3. `npm ci` requires registry access; failure must be reported, not hidden.
4. Allowed local read-only verification:
   - `npm test`
   - `npm run typecheck:core` (global or local TypeScript)
   - `npm run typecheck`, `npm run lint`, `npm run build` (after `npm ci`)
   - `node scripts/rebuild-offline-preview.cjs` only when explicitly approved to update generated preview
   - `python scripts/browser-check.py` if Playwright/Chromium is available
   - `git diff --check`, `git diff`, `git status`, file inspection
5. Only edit files expressly in the task scope; report every changed file.

## Coding conventions and acceptance gates
- Keep half-open `[start,end)` overlap: `start < b.end && end > b.start`.
- Accept integer input minutes in `0 <= start < end <= 1440` and valid
  `0 <= currentTime < 1440`, with `start > currentTime`.
- Accept exactly 120-minute slots, reject greater duration.
- A blocked room, overlapping interval, or malformed schedule never returns Available.
- Check booking integrity at runtime: integer endpoints, 0 <= start < end <= 1440.
  Report invalid fixture with reason `invalid_schedule` (fail closed).
- Preserve inputs, bookings, fictional sample data and existing tests.
- Mock explanation uses known reason phrases; fallback on timeout, failure,
  malformed output and absent provider. Never change booking status.
- Any edit to a form field invalidates previously shown decisions.
- Standard gate: all tests, typecheck, lint, build and human diff review.
  If checks are blocked, declare CONDITIONAL/NO-GO rather than claim GO.

## FORBIDDEN — no exceptions without explicit human authorization
- DO NOT read, reveal, copy, commit or transmit passwords, `.env` files,
  API keys, credentials, access tokens, student records or personal data.
- DO NOT use real student/booking data or production service endpoints.
- DO NOT deploy to production, publish publicly, merge, push, tag releases,
  alter remotes or create external integrations autonomously.
- DO NOT run destructive commands (`rm -rf`, `git reset --hard`, deleting DBs,
  dropping tables, force pushes, mass rewrites) or bypass safeguards.
- DO NOT change dependencies/lockfiles, run auto-fixers, install services,
  or access network resources without an explicit human review gate.
- DO NOT modify the historical `tests/fixtures/bug-a.ts` or `bug-b.ts`:
  they are deliberate regression examples, not active defects.
- DO NOT fabricate build results, browser tests, logs, screenshots,
  commits, vulnerability scans or human sign-off.

## Review and approval
AI assistants may **propose**, inspect and generate a draft within the agreed
scope, but may not approve their own changes. Review a unified diff and test
logs; require an independent student check and explicit approval before merge,
deployment or classroom submission. AGENTS.md was explicitly supplied as task
context to ChatGPT; do not assume any agent automatically loaded it.

## Background agent
Use the bounded worktree/permissions plan in `BACKGROUND_AGENT_POLICY.md`.
