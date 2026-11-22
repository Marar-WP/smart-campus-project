# Read-only AI risk review — conducted BEFORE modifications on 2026-11-22

Evidence source is the preserved, unmodified `baseline/` directory.
Review scope was limited to reading files and running commands/tests.

R01, correctness, confirmed: `src/utils/availability.ts` validated start/end,
but omitted runtime validation of currentTime. `NaN`/Infinity/negative or
fractional currentTime can permit an available slot. See baseline robustness log.

R02, correctness, confirmed: schedule records are blindly fed to `.some()`.
A `NaN` or reversed booking can be ignored (fail-open), a null booking crashes,
or nonarray `bookings` raises an exception. See baseline robustness log.

R03, maintainability, confirmed: user-visible reasons are duplicated between
`src/utils/availability.ts` and `src/utils/explanation.ts`; possible drift.
No new Strategy pattern warranted (one room, one policy). Existing explanation
Adapter already supplies an appropriate test double. Deferring consolidation
avoids a broad unrequested refactor; add a parity test if patterns multiply.

R04, dependency, confirmed declaration but security impact not proven:
`package.json` includes caret-ranged dependencies and unused Supabase library;
`package-lock.json` contains resolved versions, but offline npm ci failed.
Do not claim a vulnerability without an advisory scan. Changes require approval.

R05, agent operations, confirmed: old `AGENTS.md` named commands/scope but
lacked explicit no-secrets/no-production/no-destructive/no-auto-dependency policy.
Mandatory documentation update has been made in `final/AGENTS.md`.

R06, security, unsupported: claim that this mock leaks a real provider API key
is not supported by code; no real provider request or key is present.

R07, reproducibility, confirmed environmental limitation: standalone browser
preview and unit tests run, but `npm ci --offline` fails ENOTCACHED; standard
Vite/typecheck/lint need dependencies; full CI status remains unresolved.

R08, accessibility, plausible/unverified: keyboard-only and screen-reader
flows have not been fully audited. The available narrow-screen browser check
alone cannot certify accessibility.

No files were modified as part of the first read-only review; code patches
followed only after reproductions were logged and scoped.
