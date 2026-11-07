import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 90000,
  workers: 1,
  use: { baseURL: "http://localhost:5197", headless: true, screenshot: "only-on-failure" },
  projects: [
    { name: "setup", testMatch: /auth\.setup\.ts/, use: { channel: "chromium" } },
    {
      name: "chromium",
      testIgnore: /auth\.setup\.ts/,
      use: { channel: "chromium", storageState: "e2e/.auth/state.json" },
      dependencies: ["setup"],
    },
  ],
});
