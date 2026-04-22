# Tester Platform

This repository uses a visual Playwright workflow where testers can see test creation and execution:

1. Record test creation with Playwright codegen.
2. Save and review generated Playwright tests.
3. Execute tests in headed or UI mode.

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Install browser binaries:

```bash
npm run pw:install
```

3. Set the target website:

```bash
export BASE_URL="https://example.com"
```

4. Record a test interactively:

```bash
npm run test:record
```

5. Save generated test files in `tests/e2e/`.

6. Run tests:

```bash
npm run test:e2e
```

## Visual Execution

- Normal headed run:

```bash
npm run test:e2e:headed
```

- Interactive Playwright UI:

```bash
npm run test:e2e:ui
```

- Slower clicks and actions for demo/training:

```bash
CLICK_SPEED_MS=400 npm run test:e2e:headed
```

## Repository Docs

- See `docs/01-strategy.md` for the rollout strategy.
- See `docs/02-test-case-format.md` for lightweight authoring conventions.
- See `docs/03-conversion-pipeline.md` for recording flow details.
- See `docs/04-execution-and-reporting.md` for local and CI execution.
- See `docs/05-clone-for-new-site.md` for reuse across websites.
