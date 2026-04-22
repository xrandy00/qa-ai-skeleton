# Test Authoring Convention

## Purpose

Keep test creation visual and understandable for manual testers while ensuring repository consistency.

---

## 1. Test Case Files (source of truth)

Test cases live in `test-cases/<area>/<TC-ID>-<short-slug>.md`.

### Schema

```markdown
# <TC-ID>: <Title>

| Field         | Value                                              |
|---------------|----------------------------------------------------|
| ID            | TC-XXX                                             |
| Area          | <feature area, e.g. Homepage, Checkout, Login>     |
| Priority      | P1 / P2 / P3                                       |
| Tags          | comma-separated (smoke, regression, edge-case …)   |
| Preconditions | <what must be true before the test runs, or "None"> |

## Steps

| # | Action | Expected Result |
|---|--------|-----------------|
| 1 | …      | …               |

## Notes

<Optional: edge cases, known issues, related TCs, data requirements>
```

### Field rules

| Field | Rule |
|-------|------|
| ID | Unique, never reused. Assign next available number. |
| Area | Single feature area per file. |
| Priority | P1 = must-pass smoke; P2 = standard regression; P3 = edge case. |
| Tags | At least one of: `smoke`, `regression`, `edge-case`. |
| Steps → Action | User-perspective, one action per row. |
| Steps → Expected Result | Observable UI outcome, not implementation detail. |

---

## 2. Playwright Spec Files

### Naming

- File: `tests/e2e/<area>.<intent>.spec.ts`
- Test title: `[TC-XXX] user-focused description`

### Required structure

- Clear test title with stable TC ID.
- Action steps grouped logically.
- Assertions after every key action.
- `test.beforeEach` for shared setup within a file.

### File locations

- Runnable tests: `tests/e2e/`
- Reusable helpers: `tests/support/`

### Authoring guidelines

- Use `page.goto("/relative-path")` — **never hardcode absolute URLs**.
- Base URL is configured once in `playwright.config.ts` via `BASE_URL` env var.
- Prefer `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText` selectors.
- Avoid brittle CSS selectors and XPath where possible.
- Keep one business intent per test.
- One test case (`test()`) per TC-ID.
