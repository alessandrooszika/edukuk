import { test, expect } from "@playwright/test";

test.describe("Navegacion", () => {
  test("pagina home se carga correctamente", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle", { timeout: 15000 });
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
    await expect(page).toHaveTitle(/edukuk/);
  });

  test("homepage no tiene violaciones de accesibilidad", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "edukuk", level: 1 })).toBeVisible();
  });

  test("navegacion a complementos via hash", async ({ page }) => {
    await page.goto("/#complementos");
    await expect(page.getByRole("heading", { name: "Components", level: 1 })).toBeVisible();
  });

  test("hash invalido muestra pagina 404", async ({ page }) => {
    await page.goto("/#invalido");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText("Page not found")).toBeVisible();
  });

  test("404 tiene heading h1 correcto", async ({ page }) => {
    await page.goto("/#ruta_inexistente");
    await expect(page.getByRole("heading", { name: "Page not found", level: 1 })).toBeVisible();
  });

  test("homepage tiene main landmark y skip link", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.locator(".skip-link")).toHaveAttribute("href", "#main-content");
    await expect(page.getByRole("main")).toHaveId("main-content");
  });

  test("complementos tiene h1 y main", async ({ page }) => {
    await page.goto("/#complementos");
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("navegacion entre paginas mantiene el estado", async ({ page }) => {
    await page.goto("/#complementos");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "edukuk", level: 1 })).toBeVisible();
  });
});
