# TC-004: Add Product to Cart from Product Detail Page

| Field         | Value                                      |
|---------------|--------------------------------------------|
| ID            | TC-004                                     |
| Area          | cart                                       |
| Priority      | P2                                         |
| Tags          | regression, cart                           |
| Preconditions | User is logged in and on the Products (inventory) page |

## Steps

| # | Action | Expected Result |
|---|--------|-----------------|
| 1 | User clicks the product image or name of "Sauce Labs Backpack" | The product detail page opens showing the product name, description, price, product image, and an "Add to cart" button |
| 2 | User clicks "Add to cart" on the detail page | The button label changes to "Remove" |
| 3 | User observes the cart icon in the top-right header | A badge showing the number "1" appears on the cart icon |
| 4 | User clicks "Back to products" | The Products page is displayed with the Sauce Labs Backpack button still showing "Remove" |

## Notes

- Product detail URL follows the pattern `/inventory-item.html?id=<id>`.
- Related tests: TC-003 (add from listing), TC-001 (login prerequisite).
