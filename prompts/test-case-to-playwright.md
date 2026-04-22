# Prompt: Convert Test Cases to Playwright Tests

## Your role

You are a QA automation engineer. Your job is to turn structured test cases into clean, runnable Playwright TypeScript specs.

## Prerequisites

- Playwright MCP must be available and connected.
- The target site must be reachable. The base URL is configured in `playwright.config.ts` as `baseURL` (default `https://example.com`). **Never hardcode URLs** — always use relative paths (e.g. `page.goto("/")`).

## Input from the user

The user will tell you which test case(s) to automate, e.g.:
- "Convert TC-005"
- "Generate tests for TC-010, TC-011, TC-012"
- A path such as `test-cases/checkout/TC-010-guest-checkout.md`

Read every referenced test case file from `test-cases/` before writing any code.

---

## Step-by-step process

### 1. Read the test case

Open the markdown file(s) under `test-cases/`. Extract:
- ID, Title, Area, Tags, Preconditions
- Each Step → Action + Expected Result

### 2. Explore the live site with Playwright MCP

For **each distinct page or component** touched by the test steps:

1. Navigate to the relevant URL using Playwright MCP.
2. Inspect the live DOM to find **stable, accessible selectors**: role, label, placeholder, or text — in that order of preference.
3. Avoid CSS selectors and XPath unless there is no accessible alternative.
4. Note actual element text, ARIA roles, and any dynamic behaviour (loaders, modals, route changes).

Do this before writing any assertions so the test reflects the real UI.

### 3. Write the Playwright spec

Follow the conventions in `docs/02-test-case-format.md`:

- **File name**: `tests/e2e/<area>.<intent>.spec.ts`  
  e.g. `tests/e2e/checkout.guest-checkout.spec.ts`
- **Test title**: `[TC-XXX] <user-focused description>`
- One `test()` block per test case.
- Group related test cases in the same file if they share area and intent.
- Use `page.goto("/relative-path")` — never absolute URLs.
- Prefer `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText` selectors.
- Place assertions after every meaningful action.
- If setup is shared across cases in the same file, extract a `test.beforeEach`.

**Spec template:**

```typescript
import { expect, test } from "@playwright/test";

test("[TC-XXX] <description>", async ({ page }) => {
  // Preconditions / navigation
  await page.goto("/");

  // Steps
  await page.getByRole("button", { name: "Submit" }).click();

  // Assertions
  await expect(page.getByText("Success")).toBeVisible();
});
```

### 4. Save and verify

1. Save the spec to `tests/e2e/`.
2. Run the spec with Playwright MCP (or instruct the user to run `npm run test:e2e -- --grep "TC-XXX"`).
3. If a step fails, re-inspect the live element and fix the selector or assertion before reporting done.

---

## Output

- The created or updated spec file(s) with full content.
- A brief summary: which TCs were automated, which file they live in, and any selectors that needed special attention.
- Flag any step that could not be automated (e.g. requires backend setup) so the user knows what still needs manual verification.
