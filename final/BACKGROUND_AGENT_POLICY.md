# Background Agent Safeguards — Hypothetical only

No paid/asynchronous agent was run for this assignment. The following is an
operating proposal, not a claim of execution.

## Task
On a newly isolated worktree, propose **one** targeted test for malformed
fixture behavior. Do not alter business rules or deployment settings.

## Isolation, allowed files and time box
- Branch: `agent/a05-fixture-test-proposal`; worktree path `../worktree-a05-agent`.
- Allowed read: `src/utils/*.ts`, `src/data/roomFixture.ts`, `tests/*.mjs`,
  `README.md`, `AGENTS.md`, `ACCEPTANCE_CRITERIA.md`.
- Allowed write: `tests/robustness.test.mjs` **only**. No other edits.
- Suggested time box: 10 minutes wall-clock; stop after 30 shell commands;
  at most one proposed test patch, with no repeat loop after failure.
- Commands: `git status --short`, `git diff --check`, `git diff -- tests/robustness.test.mjs`,
  `npm test`, `npm run typecheck:core` (already-installed tools only).
- Prohibit package installation, network access, background services, secret
  access, production deployment, pushing/merging, external APIs, file deletion,
  dependency changes, changing policy files and destructive Git commands.

## Required artifacts
1. A concise change summary and a full unified diff.
2. Exact command log with exit codes, test totals and build status
   (`not run` when not executed; never mark passed by assumption).
3. Risk notes and explicit unexplored or blocked checks.
4. Files changed and SHA-256 digest of the resulting patch.

## Review gates and failure handling
The agent must stop without merging or deploying. The human reviewer compares
its diff against acceptance criteria, scans for scope violations, reruns tests,
then explicitly approves or rejects. On test failure, timeout, permission error
or scope breach: retain logs, abandon proposed worktree changes (by a human),
return to the untouched baseline branch, and create a fresh review task if needed.
Do not silently retry or conceal failures. Preserve the original baseline.
