# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pay-cart.spec.ts >> botón $ en Carros de Compras abre el slideover de forma de pago
- Location: e2e/pay-cart.spec.ts:8:1

# Error details

```
TimeoutError: locator.waitFor: Timeout 60000ms exceeded.
Call log:
  - waiting for getByRole('tablist').getByRole('button', { name: /Pagos y Transacciones/i }) to be visible

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
  2  | const E2E_USER = process.env.E2E_USER || "";
  3  | const E2E_PASSWORD = process.env.E2E_PASSWORD || "";
  4  | test.skip(!E2E_USER || !E2E_PASSWORD, "Definir E2E_USER y E2E_PASSWORD");
  5  | 
  6  | const STUDENT_ID = "0f42a6c9-17d9-4417-a89c-ffa62635cd73"; // Alma Ortega
  7  | 
  8  | test("botón $ en Carros de Compras abre el slideover de forma de pago", async ({ page }) => {
  9  |   await page.goto(`/admin-student?studentId=${STUDENT_ID}`);
  10 |   // Carros de Compras vive en el tab "Pagos y Transacciones"
  11 |   const txTab = page.getByRole("tablist").getByRole("button", { name: /Pagos y Transacciones/i });
> 12 |   await txTab.waitFor({ timeout: 60000 });
     |               ^ TimeoutError: locator.waitFor: Timeout 60000ms exceeded.
  13 |   await txTab.click();
  14 |   await page.waitForTimeout(4000);
  15 | 
  16 |   // Botón circular con ícono DollarSign dentro de un detalle de carro
  17 |   const dollarBtn = page.locator('button:has(svg.lucide-dollar-sign)').first();
  18 |   await dollarBtn.waitFor({ timeout: 30000 });
  19 |   await dollarBtn.scrollIntoViewIfNeeded();
  20 |   await dollarBtn.click();
  21 | 
  22 |   // Slideover con las 4 formas de pago
  23 |   await expect(page.getByText("Registrar pago")).toBeVisible();
  24 |   for (const m of ["EFECTIVO", "TRANSFERENCIA", "DEBITO", "CREDITO"]) {
  25 |     await expect(page.locator(`button[data-method="${m}"]`)).toBeVisible();
  26 |   }
  27 |   // Confirmar deshabilitado hasta elegir
  28 |   const confirmar = page.locator('[role="dialog"]').getByRole("button", { name: "Pagar", exact: true });
  29 |   await expect(confirmar).toBeDisabled();
  30 |   await page.locator('button[data-method="TRANSFERENCIA"]').click();
  31 |   await expect(confirmar).toBeEnabled();
  32 | 
  33 |   await page.getByRole("button", { name: "Cancelar" }).click();
  34 |   await expect(page.getByText("Registrar pago")).not.toBeVisible();
  35 | });
  36 | 
```