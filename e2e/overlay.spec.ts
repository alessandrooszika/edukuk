import { test, expect } from "@playwright/test";

test("Modal se abre y cierra con Escape", async ({ page }) => {
  await page.goto("/#complementos");
  await page.getByRole("tab", { name: "Overlays" }).click();

  await page.getByRole("button", { name: "Open sm" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("Drawer se abre y cierra con boton cerrar", async ({ page }) => {
  await page.goto("/#complementos");
  await page.getByRole("tab", { name: "Overlays" }).click();

  await page.getByRole("button", { name: "Open right" }).click();
  const dialog = page.getByRole("dialog", { name: /Categories/i });
  await expect(dialog).toBeVisible();

  await dialog.locator('[aria-label="Close panel"]').click();
  await expect(dialog).not.toBeVisible();
});

test("Drawer se abre y cierra con Escape", async ({ page }) => {
  await page.goto("/#complementos");
  await page.getByRole("tab", { name: "Overlays" }).click();

  await page.getByRole("button", { name: "Open left" }).click();
  const dialog = page.getByRole("dialog", { name: /Categories/i });
  await expect(dialog).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});
