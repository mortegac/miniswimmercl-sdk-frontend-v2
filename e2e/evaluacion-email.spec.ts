import { test, expect } from "@playwright/test";

const STUDENT_ID = "0f42a6c9-17d9-4417-a89c-ffa62635cd73"; // Alma Ortega

test("checkbox de email en Nueva y Editar Evaluación", async ({ page }) => {
  // Bloquear envíos reales de EmailJS durante el test
  await page.route("**/api.emailjs.com/**", (r) => r.fulfill({ status: 200, body: "OK" }));

  // Login
  await page.goto("/");
  await page.locator('input[name="email"]').fill("hola@miniswimmer.cl");
  await page.locator('input[name="password"]').fill("Mini.,2001");
  await page.locator('button[type="submit"], button:has-text("Ingresar")').first().click();
  await page.waitForTimeout(3000);

  // Perfil del estudiante → tab Evaluaciones
  await page.goto(`/admin-student?studentId=${STUDENT_ID}`);
  await page.waitForTimeout(3000);
  await page.getByRole("tablist").getByRole("button", { name: /Evaluaciones/i }).click();
  await page.waitForTimeout(2000);

  // Nueva Evaluación → seleccionar un nivel para ver las secciones
  await page.getByRole("button", { name: /Nueva Evaluación/i }).click();
  await expect(page.getByText("Nueva Evaluación").first()).toBeVisible({ timeout: 10000 });
  await page.getByRole("button", { name: /LEVEL 1/i }).first().click();
  await page.waitForTimeout(1000);
  const emailCheck = page.getByText("Enviar email al apoderado").first();
  await expect(emailCheck).toBeVisible();
  await expect(page.getByText("mortegac@gmail.com").first()).toBeVisible(); // apoderado correcto

  // Toggle visual del check
  const checkContainer = page.locator("div.cursor-pointer", { hasText: "Enviar email al apoderado" }).first();
  await checkContainer.click();
  await expect(checkContainer).toHaveClass(/border-blue-400/);
  await checkContainer.click();
  await expect(checkContainer).not.toHaveClass(/border-blue-400/);

  // Cerrar sin guardar
  await page.getByRole("button", { name: "Cancelar" }).first().click();
});
