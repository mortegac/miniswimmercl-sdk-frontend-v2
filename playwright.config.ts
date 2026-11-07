import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  timeout: 90000,
  use: { baseURL: "http://localhost:5197", headless: true, screenshot: "only-on-failure" },
  projects: [{ name: "chromium", use: { channel: "chromium" } }],
});
