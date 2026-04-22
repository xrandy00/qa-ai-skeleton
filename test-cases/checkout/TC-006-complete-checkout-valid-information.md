# TC-006: Complete Checkout with Valid Customer Information

| Field         | Value                                      |
|---------------|--------------------------------------------|
| ID            | TC-006                                     |
| Area          | checkout                                   |
| Priority      | P1                                         |
| Tags          | smoke, regression, checkout                |
| Preconditions | User is logged in; at least one product has been added to the cart; user is on the Cart page |

## Steps

| # | Action | Expected Result |
|---|--------|-----------------|
| 1 | User reviews items in the cart | Added products are listed with correct names, quantities (1 each), and prices |
| 2 | User clicks "Checkout" | The "Checkout: Your Information" page opens with fields for First Name, Last Name, and Zip/Postal Code |
| 3 | User enters "John" in the First Name field | Field displays "John" |
| 4 | User enters "Doe" in the Last Name field | Field displays "Doe" |
| 5 | User enters "12345" in the Zip/Postal Code field | Field displays "12345" |
| 6 | User clicks "Continue" | The "Checkout: Overview" page is displayed |
| 7 | User verifies the order summary | All added items are listed with correct names and prices; Payment Information shows "SauceCard #31337"; Shipping Information shows "Free Pony Express Delivery!"; Item total, tax, and total are calculated and displayed |
| 8 | User clicks "Finish" | The "Checkout: Complete!" page is displayed with the heading "Thank you for your order!", a confirmation message, and a "Back Home" button |

## Notes

- Item total for Backpack ($29.99) + Bike Light ($9.99) = $39.98; Tax: $3.20; Total: $43.18.
- Clicking "Back Home" should return the user to the Products page with an empty cart.
- Related tests: TC-003, TC-005, TC-007.
