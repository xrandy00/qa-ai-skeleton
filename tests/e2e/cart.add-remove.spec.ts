import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  const credentialsBlock = page.locator('[data-test="login-credentials"]');
  const passwordBlock = page.locator('[data-test="login-password"]');
  const credText = await credentialsBlock.innerText();
  const pwdText = await passwordBlock.innerText();
  const username = credText.split("\n").map((l) => l.trim()).filter(Boolean)[1];
  const password = pwdText.split("\n").map((l) => l.trim()).filter(Boolean)[1];

  await page.getByPlaceholder("Username").fill(username);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/inventory\.html/);
});

test("[TC-003] Add Product to Cart from Product Listing Page", async ({ page }) => {
  // Step 1: User views the Products page
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);

  // Step 2: User clicks "Add to cart" on the Sauce Labs Backpack
  const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  await expect(addButton).toBeVisible();
  await addButton.click();

  // Assert the button label changes to "Remove"
  const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
  await expect(removeButton).toBeVisible();

  // Step 3: User observes the cart icon in the top-right header
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).toHaveText("1");
});

test("[TC-004] Add Product to Cart from Product Detail Page", async ({ page }) => {
  // Step 1: User clicks the product image or name of "Sauce Labs Backpack"
  await page.locator('[data-test="inventory-item-name"]').filter({ hasText: "Sauce Labs Backpack" }).click();

  // Assert on product detail page
  await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");

  // Assert "Add to cart" button is visible
  const addButton = page.locator('[data-test="add-to-cart"]');
  await expect(addButton).toBeVisible();

  // Step 2: User clicks "Add to cart" on the detail page
  await addButton.click();

  // Assert the button label changes to "Remove"
  const removeButton = page.locator('[data-test="remove"]');
  await expect(removeButton).toBeVisible();

  // Step 3: User observes the cart icon in the top-right header
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).toHaveText("1");

  // Step 4: User clicks "Back to products"
  await page.getByRole("button", { name: "Back to products" }).click();

  // Assert back to Products page
  await expect(page).toHaveURL(/inventory\.html/);

  // Assert the Sauce Labs Backpack button still shows "Remove"
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
});

test("[TC-005] Remove Product from Cart", async ({ page }) => {
  // Preconditions: Add Sauce Labs Backpack and Sauce Labs Bike Light to cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  // Verify cart badge shows 2
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("2");

  // User is on the Cart page
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html/);

  // Step 1: User views the Cart page
  const cartItems = page.locator('[data-test="inventory-item"]');
  await expect(cartItems).toHaveCount(2);
  await expect(cartItems.nth(0)).toContainText("Sauce Labs Backpack");
  await expect(cartItems.nth(1)).toContainText("Sauce Labs Bike Light");

  // Step 2: User clicks "Remove" next to "Sauce Labs Bike Light"
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

  // Assert the Bike Light is removed from the cart list; only the Backpack remains
  await expect(cartItems).toHaveCount(1);
  await expect(cartItems.nth(0)).toContainText("Sauce Labs Backpack");

  // Step 3: User observes the cart icon badge
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");

  // Step 4: User clicks "Remove" next to "Sauce Labs Backpack"
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

  // Assert the Backpack is removed; the cart list is empty
  await expect(cartItems).toHaveCount(0);

  // Step 5: User observes the cart icon
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).not.toBeVisible();
});

test("[TC-008] Continue Shopping from Cart Preserves Cart State", async ({ page }) => {
  // Preconditions: Add Sauce Labs Backpack to cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");

  // User is on the Cart page
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html/);

  // Step 1: User views the Cart page
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
  await expect(page.locator('[data-test="inventory-item"]')).toContainText("Sauce Labs Backpack");

  // Step 2: User clicks "Continue Shopping"
  await page.getByRole("button", { name: "Continue Shopping" }).click();

  // Assert user is returned to the Products (inventory) page
  await expect(page).toHaveURL(/inventory\.html/);

  // Step 3: User observes the cart icon
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");

  // Step 4: User observes the "Add to cart" button for Sauce Labs Backpack
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
});