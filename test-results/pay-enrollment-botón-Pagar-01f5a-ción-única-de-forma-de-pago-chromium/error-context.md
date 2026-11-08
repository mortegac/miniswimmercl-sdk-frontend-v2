# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pay-enrollment.spec.ts >> botón Pagar abre slideover con selección única de forma de pago
- Location: e2e/pay-enrollment.spec.ts:11:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Pagar', exact: true }).first()
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('button', { name: 'Pagar', exact: true }).first() with timeout 20000ms
  - waiting for getByRole('button', { name: 'Pagar', exact: true }).first()

```

```yaml
- img
- text: Email
- textbox "Email":
  - /placeholder: example@gmail.com
- text: Password
- textbox "Password":
  - /placeholder: "* * * * * * *"
- button "Mostrar contraseña":
  - img
- link "¿Olvidaste tu contraseña?":
  - /url: /auth/forgot-password
- button "Ingresar"
- img
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
  8  | // Alma Ortega: tiene enrollments sin pagar (expo-bebes / aqualia)
  9  | const STUDENT_ID = "0f42a6c9-17d9-4417-a89c-ffa62635cd73";
  10 | 
  11 | test("botón Pagar abre slideover con selección única de forma de pago", async ({ page }) => {
  12 |   // Ir al perfil del estudiante
  13 |   await page.goto(`/admin-student?studentId=${STUDENT_ID}`);
  14 |   await page.waitForTimeout(4000);
  15 | 
  16 |   // Botón Pagar visible en enrollment no pagado
  17 |   const pagarBtn = page.getByRole("button", { name: "Pagar", exact: true }).first();
> 18 |   await expect(pagarBtn).toBeVisible({ timeout: 20000 });
     |                          ^ Error: expect(locator).toBeVisible() failed
  19 |   await pagarBtn.click();
  20 | 
  21 |   // Slideover
  22 |   await expect(page.getByText("Registrar pago")).toBeVisible();
  23 |   const efectivo = page.locator('button[data-method="EFECTIVO"]');
  24 |   const transferencia = page.locator('button[data-method="TRANSFERENCIA"]');
  25 |   await expect(efectivo).toBeVisible();
  26 |   await expect(transferencia).toBeVisible();
  27 |   await expect(page.locator('button[data-method="DEBITO"]')).toBeVisible();
  28 |   await expect(page.locator('button[data-method="CREDITO"]')).toBeVisible();
  29 | 
  30 |   // Botón de confirmación deshabilitado sin selección
  31 |   const confirmar = page.locator('[role="dialog"]').getByRole("button", { name: "Pagar", exact: true });
  32 |   await expect(confirmar).toBeDisabled();
  33 | 
  34 |   // Selección única: elegir Efectivo lo destaca
  35 |   await efectivo.click();
  36 |   await expect(efectivo).toHaveClass(/bg-primary/);
  37 |   await expect(transferencia).not.toHaveClass(/bg-primary /);
  38 |   await expect(confirmar).toBeEnabled();
  39 | 
  40 |   // Cambiar a Transferencia mueve la selección (única)
  41 |   await transferencia.click();
  42 |   await expect(transferencia).toHaveClass(/bg-primary/);
  43 |   await expect(efectivo).not.toHaveClass(/bg-primary /);
  44 | 
  45 |   // Cancelar sin pagar
  46 |   await page.getByRole("button", { name: "Cancelar" }).click();
  47 |   await expect(page.getByText("Registrar pago")).not.toBeVisible();
  48 | });
  49 | 
```