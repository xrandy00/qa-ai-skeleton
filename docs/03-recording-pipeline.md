# Recording Pipeline

## Purpose

Create tests with visual recording so testers can watch how tests are built.

## Command

```bash
npm run test:record
```

## Flow

1. Run recording command.
2. Playwright opens an inspector and browser.
3. Tester clicks through the scenario.
4. Generated code appears in real time.
5. Save the output as a spec in `tests/e2e/`.
6. Refine selectors/assertions before commit.

## Stability Checklist

- Replace weak selectors with role/label selectors.
- Add explicit assertions for expected outcomes.
- Avoid coupling tests to unstable timing.
