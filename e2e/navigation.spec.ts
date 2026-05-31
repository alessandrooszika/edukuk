import { test, expect } from "@playwright/test";

test("pagina home se carga correctamente", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Navegación principal" })).toBeVisible();
  await expect(page).toHaveTitle(/edukuk/);
});

test("navegacion a complementos via hash", async ({ page }) => {
  await page.goto("/#complementos");
  await expect(page.locator("h2").first()).toBeVisible();
});

test("hash invalido muestra pagina 404", async ({ page }) => {
  await page.goto("/#invalido");
  await expect(page.getByText("404")).toBeVisible();
  await expect(page.getByText("Página no encontrada")).toBeVisible();
});
