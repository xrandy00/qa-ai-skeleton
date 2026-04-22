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

test("[TC-002] Sort options displayed and functional on Products page", async ({ page }) => {
  const sortDropdown = page.locator('[data-test="product-sort-container"]');

  // Step 1: All 4 sort options are visible in the dropdown
  await expect(sortDropdown).toBeVisible();
  const options = sortDropdown.locator("option");
  await expect(options).toHaveCount(4);
  await expect(options.nth(0)).toHaveText("Name (A to Z)");
  await expect(options.nth(1)).toHaveText("Name (Z to A)");
  await expect(options.nth(2)).toHaveText("Price (low to high)");
  await expect(options.nth(3)).toHaveText("Price (high to low)");

  const itemNames = page.locator('[data-test="inventory-item-name"]');
  const itemPrices = page.locator('[data-test="inventory-item-price"]');

  // Step 2: Name (A to Z) — alphabetical ascending
  await sortDropdown.selectOption("az");
  const namesAZ = await itemNames.allInnerTexts();
  expect(namesAZ).toEqual([...namesAZ].sort());

  // Step 3: Name (Z to A) — alphabetical descending
  await sortDropdown.selectOption("za");
  const namesZA = await itemNames.allInnerTexts();
  expect(namesZA).toEqual([...namesZA].sort().reverse());

  // Step 4: Price (low to high) — price ascending
  await sortDropdown.selectOption("lohi");
  const pricesLowHigh = (await itemPrices.allInnerTexts()).map((p) =>
    parseFloat(p.replace("$", ""))
  );
  expect(pricesLowHigh).toEqual([...pricesLowHigh].sort((a, b) => a - b));

  // Step 5: Price (high to low) — price descending
  await sortDropdown.selectOption("hilo");
  const pricesHighLow = (await itemPrices.allInnerTexts()).map((p) =>
    parseFloat(p.replace("$", ""))
  );
  expect(pricesHighLow).toEqual([...pricesHighLow].sort((a, b) => b - a));
});
