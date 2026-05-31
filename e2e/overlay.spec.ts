import { test, expect } from "@playwright/test";

test("Modal se abre y cierra con Escape", async ({ page }) => {
  await page.goto("/#complementos");
  await page.getByRole("tab", { name: "Overlays" }).click();

  await page.getByRole("button", { name: "Abrir sm" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("Drawer se abre y cierra con boton cerrar", async ({ page }) => {
  await page.goto("/#complementos");
  await page.getByRole("tab", { name: "Overlays" }).click();

  await page.getByRole("button", { name: "Abrir derecha" }).click();
  const dialog = page.getByRole("dialog", { name: /Panel/i });
  await expect(dialog).toBeVisible();

  await dialog.locator('[aria-label="Cerrar"]').click();
  await expect(dialog).not.toBeVisible();
});

test("Drawer se abre y cierra con Escape", async ({ page }) => {
  await page.goto("/#complementos");
  await page.getByRole("tab", { name: "Overlays" }).click();

  await page.getByRole("button", { name: "Abrir izquierda" }).click();
  const dialog = page.getByRole("dialog", { name: /Panel/i });
  await expect(dialog).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});
