# TC-008: Continue Shopping from Cart Preserves Cart State

| Field         | Value                                      |
|---------------|--------------------------------------------|
| ID            | TC-008                                     |
| Area          | cart                                       |
| Priority      | P2                                         |
| Tags          | regression, cart                           |
| Preconditions | User is logged in; "Sauce Labs Backpack" has been added to the cart; user is on the Cart page |

## Steps

| # | Action | Expected Result |
|---|--------|-----------------|
| 1 | User views the Cart page | The Sauce Labs Backpack is listed; cart badge shows "1" |
| 2 | User clicks "Continue Shopping" | The user is returned to the Products (inventory) page |
| 3 | User observes the cart icon | The cart badge still shows "1" |
| 4 | User observes the "Add to cart" button for Sauce Labs Backpack | The button shows "Remove", confirming the item is still in the cart |

## Notes

- Cart state must persist when navigating back to the product listing.
- Related tests: TC-003, TC-006.
