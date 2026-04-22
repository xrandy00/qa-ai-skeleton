# TC-007: Checkout Blocked When Customer Information Is Missing

| Field         | Value                                      |
|---------------|--------------------------------------------|
| ID            | TC-007                                     |
| Area          | checkout                                   |
| Priority      | P1                                         |
| Tags          | regression, edge-case, checkout            |
| Preconditions | User is logged in; at least one product has been added to the cart; user is on the "Checkout: Your Information" page |

## Steps

| # | Action | Expected Result |
|---|--------|-----------------|
| 1 | User leaves all fields empty and clicks "Continue" | An error message "Error: First Name is required" is displayed; the user remains on the same page |
| 2 | User enters "John" in First Name, leaves Last Name and Zip empty, and clicks "Continue" | An error message "Error: Last Name is required" is displayed |
| 3 | User enters "Doe" in Last Name, leaves Zip/Postal Code empty, and clicks "Continue" | An error message "Error: Postal Code is required" is displayed |
| 4 | User enters "12345" in Zip/Postal Code and clicks "Continue" | The error message disappears and the user is navigated to the "Checkout: Overview" page |

## Notes

- Validation is sequential: First Name → Last Name → Postal Code.
- Related tests: TC-006 (happy path checkout).
