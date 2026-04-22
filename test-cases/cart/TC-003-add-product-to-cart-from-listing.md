# TC-003: Add Product to Cart from Product Listing Page

| Field         | Value                                      |
|---------------|--------------------------------------------|
| ID            | TC-003                                     |
| Area          | cart                                       |
| Priority      | P1                                         |
| Tags          | smoke, regression, cart                    |
| Preconditions | User is logged in and on the Products (inventory) page |

## Steps

| # | Action | Expected Result |
|---|--------|-----------------|
| 1 | User views the Products page | At least one product card is displayed with name, description, price, and an "Add to cart" button |
| 2 | User clicks "Add to cart" on the Sauce Labs Backpack | The button label changes to "Remove" |
| 3 | User observes the cart icon in the top-right header | A badge showing the number "1" appears on the cart icon |

## Notes

- The cart badge count must increment for each unique product added.
- Related tests: TC-001 (login prerequisite), TC-004 (add from detail page).
