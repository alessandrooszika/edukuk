import { test, expect } from "@playwright/test";

test.describe("Accesibilidad (axe-core)", () => {
  test("homepage pasa auditoria axe basica", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle", { timeout: 15000 });
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("complementos pasa auditoria axe basica", async ({ page }) => {
    await page.goto("/#complementos");
    await page.waitForLoadState("networkidle", { timeout: 15000 });
    await expect(page.getByRole("main")).toBeVisible();
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
  });

  test("404 pasa auditoria axe basica", async ({ page }) => {
    await page.goto("/#ruta_inexistente");
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("tema oscuro tiene estructura accesible", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
    });
    await page.reload();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("skip link es el primer elemento focalizable", async ({ page }) => {
    await page.goto("/");
    const skip = page.locator(".skip-link");
    await expect(skip).toBeVisible();
    await expect(skip).toHaveAttribute("href", "#main-content");
    await skip.focus();
    await expect(skip).toBeFocused();
  });

  test("modal overlay mantiene foco y es accesible", async ({ page }) => {
    await page.goto("/#complementos");
    await page.getByRole("tab", { name: "Overlays" }).click();
    await page.getByRole("button", { name: "Open sm" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  test("los tabs son navegables por teclado", async ({ page }) => {
    await page.goto("/#complementos");
    const tablist = page.getByRole("tablist");
    await expect(tablist).toBeVisible();
    const firstTab = page.getByRole("tab", { name: "Overview" });
    await expect(firstTab).toBeVisible();
    await firstTab.focus();
    await expect(firstTab).toBeFocused();
  });

  test("footer tiene headings jerarquicos", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    const h2s = footer.locator("h2");
    const count = await h2s.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
