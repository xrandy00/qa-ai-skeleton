# Execution And Reporting

## Local Execution

1. Set environment URL:

```bash
export BASE_URL="https://example.com"
```

2. Run all generated tests:

```bash
npm run test:e2e
```

3. Run headed mode to watch execution:

```bash
npm run test:e2e:headed
```

4. Run with UI mode when debugging:

```bash
npm run test:e2e:ui
```

5. Run with slower click speed for training/demos:

```bash
CLICK_SPEED_MS=400 npm run test:e2e:headed
```

## CI Execution

Recommended triggers:

- On pull request for smoke tags
- Nightly for broader regression tags

Minimum CI outputs:

- Pass/fail status
- HTML report
- Trace/video/screenshot artifacts on failure

## Triage Flow

1. Reproduce locally with the same `BASE_URL`.
2. Inspect trace and screenshot artifacts.
3. Fix app issue or test logic.
4. Regenerate if source test case changed.
