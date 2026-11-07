import { test as setup, expect } from "@playwright/test";

const E2E_USER = process.env.E2E_USER || "";
const E2E_PASSWORD = process.env.E2E_PASSWORD || "";

setup("login", async ({ page }) => {
  setup.skip(!E2E_USER || !E2E_PASSWORD, "Definir E2E_USER y E2E_PASSWORD");
  await page.goto("/");
  await page.locator('input[name="email"]').fill(E2E_USER);
  await page.locator('input[name="password"]').fill(E2E_PASSWORD);
  await page.locator('button[type="submit"], button:has-text("Ingresar")').first().click();
  await expect(page.locator('input[name="email"]')).toBeHidden({ timeout: 40000 });
  await page.waitForTimeout(2000);
  await page.context().storageState({ path: "e2e/.auth/state.json" });
});
