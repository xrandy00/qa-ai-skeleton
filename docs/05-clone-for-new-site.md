# Clone For A New Website

## Reusability Principles

- Keep business intent in readable test names and assertions.
- Parameterize target URL with `BASE_URL`.
- Encapsulate reusable interactions in helper functions.

## Steps To Onboard A New Website

1. Configure `BASE_URL` for the new site.
2. Record new journeys with `npm run test:record`.
3. Save specs under `tests/e2e/`.
4. Run smoke tests and stabilize locators.
5. Extend CI matrix for environment-specific runs.

## Recommended Next Evolution

- Introduce page-object or app-action abstractions under `tests/support/`.
- Add tagging filters such as `smoke`, `checkout`, `auth`.
- Add environment profiles (dev/stage/prod) via `.env` files.
- Add test data seeding scripts for reliable runs.
