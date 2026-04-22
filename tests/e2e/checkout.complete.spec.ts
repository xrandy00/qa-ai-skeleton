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

test("[TC-006] Complete Checkout with Valid Customer Information", async ({ page }) => {
  // Preconditions: Add at least one product to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");

  // User is on the Cart page
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html/);

  // Step 1: User reviews items in the cart
  const cartItems = page.locator('[data-test="inventory-item"]');
  await expect(cartItems).toHaveCount(1);
  await expect(cartItems.nth(0)).toContainText("Sauce Labs Backpack");
  await expect(cartItems.nth(0)).toContainText("$29.99");

  // Step 2: User clicks "Checkout"
  await page.getByRole("button", { name: "Checkout" }).click();

  // Assert the "Checkout: Your Information" page opens
  await expect(page).toHaveURL(/checkout-step-one\.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Your Information");

  // Assert fields are visible
  await expect(page.getByPlaceholder("First Name")).toBeVisible();
  await expect(page.getByPlaceholder("Last Name")).toBeVisible();
  await expect(page.getByPlaceholder("Zip/Postal Code")).toBeVisible();

  // Step 3: User enters "John" in the First Name field
  await page.getByPlaceholder("First Name").fill("John");

  // Step 4: User enters "Doe" in the Last Name field
  await page.getByPlaceholder("Last Name").fill("Doe");

  // Step 5: User enters "12345" in the Zip/Postal Code field
  await page.getByPlaceholder("Zip/Postal Code").fill("12345");

  // Step 6: User clicks "Continue"
  await page.getByRole("button", { name: "Continue" }).click();

  // Assert the "Checkout: Overview" page is displayed
  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Overview");

  // Step 7: User verifies the order summary
  // All added items are listed with correct names and prices
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
  await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText("$29.99");

  // Payment Information shows "SauceCard #31337"
  await expect(page.locator('[data-test="payment-info-value"]')).toContainText("SauceCard #31337");

  // Shipping Information shows "Free Pony Express Delivery!"
  await expect(page.locator('[data-test="shipping-info-value"]')).toContainText("Free Pony Express Delivery!");

  // Item total, tax, and total are calculated and displayed
  await expect(page.locator('[data-test="subtotal-label"]')).toContainText("Item total: $29.99");
  await expect(page.locator('[data-test="tax-label"]')).toContainText("Tax: $2.40");
  await expect(page.locator('[data-test="total-label"]')).toContainText("Total: $32.39");

  // Step 8: User clicks "Finish"
  await page.getByRole("button", { name: "Finish" }).click();

  // Assert the "Checkout: Complete!" page is displayed
  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Complete!");
  await expect(page.locator('[data-test="complete-header"]')).toHaveText("Thank you for your order!");
  await expect(page.getByRole("button", { name: "Back Home" })).toBeVisible();
});

test("[TC-007] Checkout Blocked When Customer Information Is Missing", async ({ page }) => {
  // Preconditions: Add at least one product to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // User is on the "Checkout: Your Information" page
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.getByRole("button", { name: "Checkout" }).click();
  await expect(page).toHaveURL(/checkout-step-one\.html/);

  // Step 1: User leaves all fields empty and clicks "Continue"
  await page.getByRole("button", { name: "Continue" }).click();

  // Assert error message "Error: First Name is required" is displayed
  await expect(page.locator('[data-test="error"]')).toHaveText("Error: First Name is required");

  // Assert user remains on the same page
  await expect(page).toHaveURL(/checkout-step-one\.html/);

  // Step 2: User enters "John" in First Name, leaves Last Name and Zip empty, and clicks "Continue"
  await page.getByPlaceholder("First Name").fill("John");
  await page.getByRole("button", { name: "Continue" }).click();

  // Assert error message "Error: Last Name is required" is displayed
  await expect(page.locator('[data-test="error"]')).toHaveText("Error: Last Name is required");

  // Step 3: User enters "Doe" in Last Name, leaves Zip/Postal Code empty, and clicks "Continue"
  await page.getByPlaceholder("Last Name").fill("Doe");
  await page.getByRole("button", { name: "Continue" }).click();

  // Assert error message "Error: Postal Code is required" is displayed
  await expect(page.locator('[data-test="error"]')).toHaveText("Error: Postal Code is required");

  // Step 4: User enters "12345" in Zip/Postal Code and clicks "Continue"
  await page.getByPlaceholder("Zip/Postal Code").fill("12345");
  await page.getByRole("button", { name: "Continue" }).click();

  // Assert the error message disappears and the user is navigated to the "Checkout: Overview" page
  await expect(page.locator('[data-test="error"]')).not.toBeVisible();
  await expect(page).toHaveURL(/checkout-step-two\.html/);
});