# TC-005: Remove Product from Cart

| Field         | Value                                      |
|---------------|--------------------------------------------|
| ID            | TC-005                                     |
| Area          | cart                                       |
| Priority      | P1                                         |
| Tags          | regression, cart                           |
| Preconditions | User is logged in; "Sauce Labs Backpack" and "Sauce Labs Bike Light" have been added to the cart; user is on the Cart page |

## Steps

| # | Action | Expected Result |
|---|--------|-----------------|
| 1 | User views the Cart page | Both products are listed with their names, descriptions, quantities, and prices; each item has a "Remove" button |
| 2 | User clicks "Remove" next to "Sauce Labs Bike Light" | The Bike Light is removed from the cart list; only the Backpack remains |
| 3 | User observes the cart icon badge | The badge updates to "1" |
| 4 | User clicks "Remove" next to "Sauce Labs Backpack" | The Backpack is removed; the cart list is empty |
| 5 | User observes the cart icon | The cart badge is no longer visible |

## Notes

- Cart is accessible via the shopping cart icon (`[data-test="shopping-cart-link"]`).
- Related tests: TC-003, TC-004.
