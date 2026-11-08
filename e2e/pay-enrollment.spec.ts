import { test, expect } from "@playwright/test";

// Credenciales vía entorno: export E2E_USER=... E2E_PASSWORD=... (no commitear valores)
const E2E_USER = process.env.E2E_USER || "";
const E2E_PASSWORD = process.env.E2E_PASSWORD || "";
test.skip(!E2E_USER || !E2E_PASSWORD, "Definir E2E_USER y E2E_PASSWORD");

// Alma Ortega: tiene enrollments sin pagar (expo-bebes / aqualia)
const STUDENT_ID = "0f42a6c9-17d9-4417-a89c-ffa62635cd73";

test("botón Pagar abre slideover con selección única de forma de pago", async ({ page }) => {
  // Ir al perfil del estudiante
  await page.goto(`/admin-student?studentId=${STUDENT_ID}`);
  await page.waitForTimeout(4000);

  // Botón Pagar visible en enrollment no pagado
  const pagarBtn = page.getByRole("button", { name: "Pagar", exact: true }).first();
  await expect(pagarBtn).toBeVisible({ timeout: 20000 });
  await pagarBtn.click();

  // Slideover
  await expect(page.getByText("Registrar pago")).toBeVisible();
  const efectivo = page.locator('button[data-method="EFECTIVO"]');
  const transferencia = page.locator('button[data-method="TRANSFERENCIA"]');
  await expect(efectivo).toBeVisible();
  await expect(transferencia).toBeVisible();
  await expect(page.locator('button[data-method="DEBITO"]')).toBeVisible();
  await expect(page.locator('button[data-method="CREDITO"]')).toBeVisible();

  // Botón de confirmación deshabilitado sin selección
  const confirmar = page.locator('[role="dialog"]').getByRole("button", { name: "Pagar", exact: true });
  await expect(confirmar).toBeDisabled();

  // Selección única: elegir Efectivo lo destaca
  await efectivo.click();
  await expect(efectivo).toHaveClass(/bg-primary/);
  await expect(transferencia).not.toHaveClass(/bg-primary /);
  await expect(confirmar).toBeEnabled();

  // Cambiar a Transferencia mueve la selección (única)
  await transferencia.click();
  await expect(transferencia).toHaveClass(/bg-primary/);
  await expect(efectivo).not.toHaveClass(/bg-primary /);

  // Cancelar sin pagar
  await page.getByRole("button", { name: "Cancelar" }).click();
  await expect(page.getByText("Registrar pago")).not.toBeVisible();
});
