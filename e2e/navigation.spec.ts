import { test, expect } from "@playwright/test";

test("pagina home se carga correctamente", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Navegación principal" })).toBeVisible();
  await expect(page).toHaveTitle(/edukuk/);
});

test("navegacion a complementos via hash", async ({ page }) => {
  await page.goto("/");
  await page.goto("/#complementos");
  await expect(page.locator("h2").first()).toBeVisible();
});

test("hash invalido redirige a home", async ({ page }) => {
  await page.goto("/#invalido");
  await expect(page).toHaveURL(/#home/);
});
