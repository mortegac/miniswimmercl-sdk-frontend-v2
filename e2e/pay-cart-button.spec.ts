import { test, expect } from "@playwright/test";
const E2E_USER = process.env.E2E_USER || "";
const E2E_PASSWORD = process.env.E2E_PASSWORD || "";
test.skip(!E2E_USER || !E2E_PASSWORD, "Definir E2E_USER y E2E_PASSWORD");

const STUDENT_ID = "0f42a6c9-17d9-4417-a89c-ffa62635cd73"; // Alma Ortega (apoderado mortegac, tiene cart PENDING)

test('botón "Pagar" del carro abre el slideover de forma de pago', async ({ page }) => {
  await page.goto(`/admin-student?studentId=${STUDENT_ID}`);
  await page.getByText("Alma Ortega").first().waitFor({ timeout: 60000 });
  const txTab = page.getByRole("tablist").getByRole("button", { name: /Pagos y Transacciones/i });
  await txTab.click();
  await page.waitForTimeout(4000);

  // Botón "Pagar" pill (a nivel de carro, visible en carros no AUTHORIZED)
  const pagarBtn = page.getByRole("button", { name: "Pagar", exact: true }).first();
  await pagarBtn.waitFor({ timeout: 30000 });
  await pagarBtn.scrollIntoViewIfNeeded();
  await pagarBtn.click();

  // Slideover con las 4 formas de pago
  await expect(page.getByText("Registrar pago")).toBeVisible();
  for (const m of ["EFECTIVO", "TRANSFERENCIA", "DEBITO", "CREDITO"]) {
    await expect(page.locator(`button[data-method="${m}"]`)).toBeVisible();
  }
  const confirmar = page.locator('[role="dialog"]').getByRole("button", { name: "Pagar", exact: true });
  await expect(confirmar).toBeDisabled();
  await page.locator('button[data-method="CREDITO"]').click();
  await expect(confirmar).toBeEnabled();

  await page.getByRole("button", { name: "Cancelar" }).click();
  await expect(page.getByText("Registrar pago")).not.toBeVisible();
});
