# Smart Campus Room Availability Checker — Assignment 05

Small, fictional, client-only React + TypeScript + Vite project, continued from
Practice 11. One room (A101), existing booking 10:00–11:00 and simulated time
09:00. This application **checks availability only**: it never creates a
booking, stores user information or invokes a real AI provider.

## Architecture

| Location | Responsibility |
| --- | --- |
| `src/App.tsx` | Form, confirmed result, optional mock explanation |
| `src/utils/availability.ts` | Pure availability rule engine and runtime fail-closed guards |
| `src/utils/time.ts` | HH:MM <-> minutes conversion |
| `src/utils/explanation.ts` | Input/output validator, Adapter and timeout/fallback |
| `src/data/roomFixture.ts` | Public fictional room fixture |
| `tests/` | 16 original rule tests, 20 original explanation tests, 13 new risk tests |
| `AGENTS.md` | Agent scope, safe commands and hard prohibitions |
| `ACCEPTANCE_CRITERIA.md` | Five verified functional acceptance criteria |
| `BACKGROUND_AGENT_POLICY.md` | Hypothetical isolated agent protocol |

## Reproduce

Requirements: Node.js 22.16+ (24 recommended), npm; Python 3, Playwright and
Chromium only if running optional browser checks.

```sh
npm ci
npm test                    # 49 tests, all passed here
npm run typecheck:core      # core-only strict TS check (passed here)
npm run typecheck           # requires node_modules; environment blocked
npm run lint                # requires node_modules; environment blocked
npm run build               # requires node_modules; environment blocked
npm run dev                 # regular Vite preview after npm ci
```

For an offline demonstration, open `smart-campus-preview.html` in a browser.
It is bundled from the original Practice 11 offline runtime and transpiled
current source (NOT an official Vite production build). To refresh it after
modifying source, use `node scripts/rebuild-offline-preview.cjs`; `typescript`
must be available locally or globally. No real keys or network calls are used.

## Business rules

- Start and end must be integer minutes, `0 <= start < end <= 1440`.
- Simulated current time must be an integer in `0 <= currentTime < 1440`;
  a request must start strictly after that current time.
- Duration cannot exceed 120 minutes; exactly 120 is acceptable.
- Blocked rooms and actual overlaps reject the request. Endpoints only
  touching an existing booking are allowed.
- Malformed schedule data fail closed with `invalid_schedule`. Existing
  booking objects are never mutated.
- Explanation is informational, optional, mocked and cannot change the result.

## Verification status (2026-11-22)

- Original baseline `npm test`: 16/16 rule + 20/20 explanation = **36 passed**.
- Extra Assignment 05 tests against baseline: **4 passed, 9 failed**;
  these reproduce two previously missed input-integrity risks.
- Final `npm test`: 16/16 + 20/20 + 13/13 = **49 passed, 0 failed**.
- Core strict TypeScript check: passed (exit 0).
- Browser smoke: passed in offline browser mock; desktop and mobile.
- `npm ci --offline` failed (`ENOTCACHED`), online attempt failed (`npm` error).
  Without installed dependencies, full `npm run typecheck`, `npm run lint`, and
  `npm run build` could not be completed. **No production-ready claim**.

Evidence, original/final source exports, risk register and report live in the
parent submission package. Any release beyond an isolated classroom demo
requires dependencies installed and full quality gates rerun.
