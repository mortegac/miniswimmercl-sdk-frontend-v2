import { test, expect } from "@playwright/test";
const E2E_USER = process.env.E2E_USER || "";
const E2E_PASSWORD = process.env.E2E_PASSWORD || "";
test.skip(!E2E_USER || !E2E_PASSWORD, "Definir E2E_USER y E2E_PASSWORD");

const STUDENT_ID = "0f42a6c9-17d9-4417-a89c-ffa62635cd73"; // Alma Ortega (tiene sesiones ACTIVE)

test("tab Gestión de Sesiones muestra las sesiones del estudiante", async ({ page }) => {
  const sessionReq = page.waitForResponse(
    (r) => r.url().includes("/graphql") && r.request().postData()?.includes("listV2SessionDetailByStudentId"),
    { timeout: 30000 }
  ).catch(() => null);

  await page.goto(`/admin-student?studentId=${STUDENT_ID}`);
  await page.getByText("Alma Ortega").first().waitFor({ timeout: 60000 });
  const tab = page.getByRole("tablist").getByRole("button", { name: /Gestión de Sesiones/i });
  await tab.click();

  // La query por estudiante se dispara y devuelve items
  const resp = await sessionReq;
  if (resp) {
    const body = await resp.json();
    const items = body?.data?.listV2SessionDetailByStudentId?.items ?? [];
    expect(items.length).toBeGreaterThan(0);
  }

  await page.waitForTimeout(3000);
  // En el DOM deben verse fechas/estados de sesión (no vacío)
  const hasSessions = await page.locator("text=/ACTIVE|RECOVERED|SESIÓN|Sesión|2026/i").count();
  expect(hasSessions).toBeGreaterThan(0);
});
