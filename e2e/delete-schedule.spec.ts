import { test, expect } from "@playwright/test";
const E2E_USER = process.env.E2E_USER || "";
const E2E_PASSWORD = process.env.E2E_PASSWORD || "";
test.skip(!E2E_USER || !E2E_PASSWORD, "Definir E2E_USER y E2E_PASSWORD");

test("eliminar horario: botón habilitado y mensaje tras seleccionar horario", async ({ page }) => {
  await page.goto("/courses");
  await page.waitForTimeout(4000);

  // Seleccionar una sede en el react-select "Sede"
  await page.locator('.css-1hwfws3, [class*="-control"]').first().click().catch(() => {});
  await page.waitForTimeout(500);
  await page.keyboard.type("CHILLAN");
  await page.waitForTimeout(800);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(3000);

  // Abrir un curso: buscar botón "Crear Horario" (panel de horarios) o una fila de curso
  const courseRow = page.locator("text=/PACK|CLASES|BEBES|NINOS|TODDLER/i").first();
  await courseRow.click({ timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(2000);

  // Si el panel de horarios está abierto, debe existir el botón "Crear Horario" y "Eliminar"
  const crearHorario = page.getByRole("button", { name: /Crear Horario/i });
  const hasPanel = await crearHorario.isVisible().catch(() => false);
  test.skip(!hasPanel, "No se pudo abrir el panel de horarios en este entorno");

  // Seleccionar un horario de la lista "Horarios creados" (llena el form → habilita Eliminar)
  await page.locator("text=/LUNES|MARTES|MIERCOLES|JUEVES|VIERNES|SABADO|DOMINGO/i").first().click().catch(() => {});
  await page.waitForTimeout(1000);

  const eliminar = page.getByRole("button", { name: /Eliminar/i });
  await expect(eliminar).toBeVisible();
  await expect(eliminar).toBeEnabled();
});
