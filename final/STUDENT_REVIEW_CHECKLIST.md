# Student independent verification — required before submission

Teacher requires individual inspection, testing and approval of every AI
finding. This sign-off is **not** completed automatically.

- [ ] Read `evidence/mitigation_R01_R02_availability.diff` and the new tests.
- [ ] Run `npm test` locally and confirm all 49 tests pass.
- [ ] Check NaN current time and broken booking schedule in a code-level test.
- [ ] Open `smart-campus-preview.html`; check available, overlap, blocked,
      explanation/fallback and narrow-screen behavior.
- [ ] If registry works: run `npm ci`, `npm run typecheck`, `npm run lint`,
      and `npm run build`; attach exact local logs or retain blocked status.
- [ ] Inspect `RISK_REGISTER.csv`, reason statuses, and read release conditions.
- [ ] Ensure no real keys/data appear in any files being shared.
- [ ] Approve or reject the final diff personally.

Student decision: ________________________  Date: ________________________

If any mandatory check fails, do not assert GO. Update report and risk register.
