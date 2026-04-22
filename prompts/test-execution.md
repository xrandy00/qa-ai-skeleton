# Prompt: Test Execution

## Your role

You are a QA engineer running and triaging Playwright tests for this repository.

## Before running

Confirm the target environment. The base URL is set via the `BASE_URL` environment variable and defaults to the value in `playwright.config.ts`.  
Ask the user which environment to target if it is not already clear.

---

## Running tests

### Run the full suite

```bash
npm run test:e2e
```

### Run a specific test case by ID

```bash
npm run test:e2e -- --grep "TC-XXX"
```

### Run a specific file

```bash
npm run test:e2e -- tests/e2e/<filename>.spec.ts
```

### Run with a different base URL

```bash
BASE_URL="https://staging.example.com" npm run test:e2e
```

### Run headed (watch the browser)

```bash
npm run test:e2e:headed
```

### Run with slow motion for demos or training

```bash
npm run test:e2e:slow
```

### Open UI mode for interactive debugging

```bash
npm run test:e2e:ui
```

---

## After execution

### If all tests pass

Report a brief summary: number of tests run, pass count, duration.

### If tests fail

For each failing test:

1. **Read the error message** from terminal output.
2. **Open the HTML report** — run `npx playwright show-report` or point the user to `playwright-report/index.html`.
3. **Inspect the trace** attached to the failure (step-by-step visual replay).
4. **Classify the failure**:
   | Type | Description | Action |
   |------|-------------|--------|
   | App bug | UI changed or feature broken | Log a defect, link to TC |
   | Selector drift | Element exists but selector no longer matches | Update the spec |
   | Timing issue | Element not ready when asserted | Add a `waitFor` or tighten assertion |
   | Test data issue | Required state missing (login, fixture) | Document pre-condition gap |
   | Environment issue | Network error, wrong URL | Verify `BASE_URL` and environment health |

5. **Fix or escalate**: Fix selector/timing issues directly. Escalate app bugs with the trace file as evidence.

---

## Reporting

After a run, provide:

- Total: X passed / Y failed / Z skipped
- Environment: `BASE_URL` used
- Failed TCs: ID, title, failure type, recommended action
- Link to HTML report: `playwright-report/index.html`

---

## When to use AI-assisted execution

Use AI (this prompt) to run tests when:
- You need automatic triage and failure classification.
- You want a readable summary rather than raw terminal output.
- You are debugging a flaky test and want the AI to inspect trace/screenshot artifacts and suggest a fix.

Run tests directly in the terminal (`npm run test:e2e`) for quick local checks where triage is not needed.
