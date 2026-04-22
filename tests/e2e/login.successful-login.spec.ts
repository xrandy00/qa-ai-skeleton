import { expect, test } from "@playwright/test";

test("[TC-001] Successful Login with Valid Credentials", async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto("/");

  // Assert login form is displayed
  await expect(page.getByPlaceholder("Username")).toBeVisible();
  await expect(page.getByPlaceholder("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();

  // Step 2: Assert credentials are visible on the page
  const credentialsBlock = page.locator('[data-test="login-credentials"]');
  const passwordBlock = page.locator('[data-test="login-password"]');
  await expect(credentialsBlock).toBeVisible();
  await expect(passwordBlock).toBeVisible();

  // Read the first valid username and shared password displayed on the page
  const credText = await credentialsBlock.innerText();
  const pwdText = await passwordBlock.innerText();
  const username = credText.split("\n").map((l) => l.trim()).filter(Boolean)[1];
  const password = pwdText.split("\n").map((l) => l.trim()).filter(Boolean)[1];

  // Steps 3–4: Enter the credentials read from the page
  await page.getByPlaceholder("Username").fill(username);
  await page.getByPlaceholder("Password").fill(password);

  // Step 5: Click the Login button
  await page.getByRole("button", { name: "Login" }).click();

  // Step 6: User is redirected to the authenticated area
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText("Products", { exact: true })).toBeVisible();

  // Step 7: No error message is displayed
  await expect(page.locator('[data-test="error"]')).not.toBeVisible();
});
