import { defineConfig } from "@playwright/test";

const clickSpeedMs = 50;

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: [["html"], ["list"]],
  use: {
    baseURL: "https://www.saucedemo.com/",
    launchOptions: {
      slowMo: Number.isFinite(clickSpeedMs) && clickSpeedMs > 0 ? clickSpeedMs : 0,
    },
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
});
