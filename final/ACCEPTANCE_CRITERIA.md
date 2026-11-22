# Assignment 05 — Acceptance Criteria

The existing Practice 11 acceptance rules remain in force; the five criteria
below consolidate them and add integrity/agent-readiness checks.

| ID | Acceptance criterion | Automated and manual evidence |
| --- | --- | --- |
| AC-01 | Valid interval: integer times, 0 ≤ start < end ≤ 1440, start strictly after valid integer currentTime (0..1439); otherwise unavailable | Original T02/T03/T10/T12/T13/T14; new R01-a..e |
| AC-02 | Reject durations > 120 minutes; accept 120 minutes exactly | T04, T11, E06 |
| AC-03 | Reject blocked rooms and real overlaps, accept touching endpoints, never mutate fixtures | T05–T09, T15–T16, E02–E03 |
| AC-04 | Mock explanation never changes status; validates schema and falls back safely on timeout, provider failure and untrusted output | E01–E20; browser smoke |
| AC-05 | Corrupt schedule data cannot produce Available; all old cases remain green and desktop/mobile demo continues working | R02-a..h, 49/49 final; browser checks |

No actual booking creation, real provider, personal data, deployment or backend.
These are classroom criteria, not a production service contract.
