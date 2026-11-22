# Assignment 05 — scope and diffs

Baseline is the supplied Practice 11 source snapshot. This submission does NOT
modify any production account, Git remote, external repo or published Bolt site.

## Exactly TWO functional mitigations
1. R01: input validation for currentTime in `final/src/utils/availability.ts`.
2. R02: schedule-data integrity validation and a fail-closed reason in
   `final/src/utils/availability.ts`; reason phrase propagated into
   `final/src/utils/explanation.ts`.

## Test, documentation and safe demo changes
- `final/tests/robustness.test.mjs`: 13 tests for R01, R02 and reason consistency.
- `final/package.json`: `npm test` includes these tests; new core-only tsc script.
- `final/scripts/rebuild-offline-preview.cjs`: rebuilds a standalone offline mock
  using archived runtime and current source; does not claim a Vite build.
- `final/smart-campus-preview.html`: regenerated from final source, browser tested.
- `final/README.md`, `final/AGENTS.md`, `final/ACCEPTANCE_CRITERIA.md`,
  `final/BACKGROUND_AGENT_POLICY.md`, `final/AI_USE_RECORD.md`,
  `final/STUDENT_REVIEW_CHECKLIST.md`.
- `Assignment_05_Report.docx`, `.pdf`, `RISK_REGISTER.csv`, `evidence/` logs.

Two source diffs are retained as `evidence/mitigation_R01_R02_availability.diff`
and `evidence/mitigation_R02_explanation.diff`.

No design pattern was added (see Section 4 of report). The existing explanation
Adapter already matches the single mock provider use case.
