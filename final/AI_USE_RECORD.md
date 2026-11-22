# AI-use record — Assignment 05

**Assistant/model:** OpenAI ChatGPT (GPT-6), 2026-11-22.
**Repository:** Supplied Practice 11 Smart Campus source archive; locally
extracted and inspected. No private code/service connection required.

| Stage | Prompt / instruction summary | Output used | Problems & decision | Verification source |
| --- | --- | --- | --- | --- |
| Read-only audit | Inspect structure, tests, rule-engine edge cases and agent limits without editing files | 8 risk candidates with evidence | Two correctness claims reproducible; other claims classified separately | `src/utils/availability.ts`, `AGENTS.md`, `package.json`, baseline logs |
| Targeted mitigations | Fix only unsafe runtime time-context and booking-schedule inputs; retain old rules | Guards, `invalid_schedule` reason, 13 regression tests | New reason propagated to explanatory mock to avoid inconsistency | baseline probe 4/13 vs final 13/13, existing 36/36 |
| Operational readiness | Check documented setup, safe/forbidden commands and isolation | Revised README/AGENTS, policy, acceptance criteria | No autonomous deployment or dependency modifications | file diff, quality-gate logs |
| Verification | Run tests, core types, offline browser checks; record blocked checks | 49/49 tests, core tsc pass, browser pass | Full typecheck/lint/build NOT verified; npm registry unavailable | `../evidence/` logs, new screenshots |
| Release | Decide without pretending blocked checks ran | CONDITIONAL classroom demo only; no production release | Student must review diff and run standard gates when dependencies available | risk register + verification matrix |

**Source and human verification:** ChatGPT examined and ran commands inside an
isolated copy. The student has not independently approved these AI changes in
this chat. The assignment explicitly requires independent student inspection,
testing and approval; check `STUDENT_REVIEW_CHECKLIST.md` and sign only after
doing these actions. No imaginary review or deployment is asserted.

**Tool-loading disclosure:** ChatGPT was explicitly provided the text of
`AGENTS.md` and the actual source; do not assume any other agent implicitly
loaded these repository instructions.
