# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: evaluacion-email.spec.ts >> checkbox de email en Nueva y Editar Evaluación
- Location: e2e/evaluacion-email.spec.ts:10:1

# Error details

```
TimeoutError: locator.waitFor: Timeout 60000ms exceeded.
Call log:
  - waiting for getByRole('tablist').getByRole('button', { name: /Evaluaciones/i }) to be visible

```

# Page snapshot

```yaml
- generic [ref=e13]:
  - generic [ref=e14]:
    - generic [ref=e15]: Email
    - textbox "Email" [ref=e16]:
      - /placeholder: example@gmail.com
  - generic [ref=e17]:
    - generic [ref=e18]: Password
    - generic [ref=e19]:
      - textbox "Password" [ref=e20]:
        - /placeholder: "* * * * * * *"
      - button "Mostrar contraseña" [ref=e21] [cursor=pointer]
    - link "¿Olvidaste tu contraseña?" [ref=e26] [cursor=pointer]:
      - /url: /auth/forgot-password
  - button "Ingresar" [ref=e28] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | // Credenciales vía entorno: export E2E_USER=... E2E_PASSWORD=... (no commitear valores)
  4  | const E2E_USER = process.env.E2E_USER || "";
  5  | const E2E_PASSWORD = process.env.E2E_PASSWORD || "";
  6  | test.skip(!E2E_USER || !E2E_PASSWORD, "Definir E2E_USER y E2E_PASSWORD");
  7  | 
  8  | const STUDENT_ID = "0f42a6c9-17d9-4417-a89c-ffa62635cd73"; // Alma Ortega
  9  | 
  10 | test("checkbox de email en Nueva y Editar Evaluación", async ({ page }) => {
  11 |   // Bloquear envíos reales de EmailJS durante el test
  12 |   await page.route("**/api.emailjs.com/**", (r) => r.fulfill({ status: 200, body: "OK" }));
  13 | 
  14 |   // Perfil del estudiante → tab Evaluaciones
  15 |   await page.goto(`/admin-student?studentId=${STUDENT_ID}`);
  16 |   const evalTab = page.getByRole("tablist").getByRole("button", { name: /Evaluaciones/i });
> 17 |   await evalTab.waitFor({ timeout: 60000 });
     |                 ^ TimeoutError: locator.waitFor: Timeout 60000ms exceeded.
  18 |   await evalTab.click();
  19 |   await page.waitForTimeout(2000);
  20 | 
  21 |   // Nueva Evaluación → seleccionar un nivel para ver las secciones
  22 |   await page.getByRole("button", { name: /Nueva Evaluación/i }).click();
  23 |   await expect(page.getByText("Nueva Evaluación").first()).toBeVisible({ timeout: 10000 });
  24 |   await page.getByRole("button", { name: /LEVEL 1/i }).first().click();
  25 |   await page.waitForTimeout(1000);
  26 |   const emailCheck = page.getByText("Enviar email al apoderado").first();
  27 |   await expect(emailCheck).toBeVisible();
  28 |   await expect(page.getByText("mortegac@gmail.com").first()).toBeVisible(); // apoderado correcto
  29 | 
  30 |   // Toggle visual del check
  31 |   const checkContainer = page.locator("div.cursor-pointer", { hasText: "Enviar email al apoderado" }).first();
  32 |   await checkContainer.click();
  33 |   await expect(checkContainer).toHaveClass(/border-blue-400/);
  34 |   await checkContainer.click();
  35 |   await expect(checkContainer).not.toHaveClass(/border-blue-400/);
  36 | 
  37 |   // Cerrar sin guardar
  38 |   await page.getByRole("button", { name: "Cancelar" }).first().click();
  39 | });
  40 | 
```