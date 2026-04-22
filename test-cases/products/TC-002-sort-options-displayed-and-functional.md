# TC-002: Sort Options Displayed and Functional on Products Page

| Field         | Value                                      |
|---------------|--------------------------------------------|
| ID            | TC-002                                     |
| Area          | products                                   |
| Priority      | P2                                         |
| Tags          | regression, sort, products                 |
| Preconditions | User is logged in and on the Products page |

## Steps

| # | Action | Expected Result |
|---|--------|-----------------|
| 1 | User observes the sort dropdown on the Products page | Dropdown is visible and contains exactly 4 options: "Name (A to Z)", "Name (Z to A)", "Price (low to high)", "Price (high to low)" |
| 2 | User selects "Name (A to Z)" from the sort dropdown | Products are sorted alphabetically ascending by name (first product name comes before last product name alphabetically) |
| 3 | User selects "Name (Z to A)" from the sort dropdown | Products are sorted alphabetically descending by name (first product name comes after last product name alphabetically) |
| 4 | User selects "Price (low to high)" from the sort dropdown | Products are sorted by price ascending (first product price is lower than or equal to last product price) |
| 5 | User selects "Price (high to low)" from the sort dropdown | Products are sorted by price descending (first product price is higher than or equal to last product price) |

## Notes

- Tested against the Sauce Demo products page (`/inventory.html`).
- Sort option labels should match exactly as displayed in the UI.
- Price comparison should use numeric values, ignoring the currency symbol.
- Related test: TC-001 (login must succeed before reaching the products page).
