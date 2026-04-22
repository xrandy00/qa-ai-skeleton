# Strategy

## Goal

Move from manual click testing to visible, tester-friendly, version-controlled Playwright E2E testing.

## Phased Plan

1. Start with visual recording.
- Use Playwright codegen so testers can see every step being created.
- Focus first on smoke paths and high-risk user journeys.

2. Standardize review and storage.
- Save recorded files in `tests/e2e/`.
- Review selectors and assertions before merge.

3. Execute reliably.
- Run on pull requests and nightly schedules.
- Publish HTML reports and failure artifacts.

4. Scale.
- Add tags, ownership, and priorities.
- Introduce environments and data setup patterns.
- Move common interactions into reusable support helpers.

## Definition Of Done (per flow)

- Test flow is recorded and saved as Playwright spec.
- Playwright spec is reviewed and cleaned for stable selectors.
- Test passes on target environments.
- Failure artifacts are available in CI.
