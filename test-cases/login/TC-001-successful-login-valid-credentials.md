# TC-001: Successful Login with Valid Credentials

| Field         | Value                                      |
|---------------|--------------------------------------------|
| ID            | TC-001                                     |
| Area          | login                                      |
| Priority      | P1                                         |
| Tags          | smoke, regression                          |
| Preconditions | Valid credentials are displayed on the page; user is on the login page |

## Steps

| # | Action | Expected Result |
|---|--------|-----------------|
| 1 | User navigates to the login page | Login form is displayed with username and password fields |
| 2 | User reads the valid credentials displayed on the page | Credentials (username and password) are visible on the page |
| 3 | User enters the valid username into the username field | Username field shows the entered value |
| 4 | User enters the valid password into the password field | Password field accepts the input (characters masked) |
| 5 | User clicks the "Login" / "Sign in" button | Form is submitted |
| 6 | — | User is redirected to the authenticated area (e.g. dashboard or home page) |
| 7 | — | No error message is displayed |

## Notes

- Credentials are intentionally exposed on the page (e.g. a demo/sandbox environment). Steps 2–4 reflect reading and using them.
- Related: TC-001
