import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./ThemeToggle";

beforeEach(() => {
  document.documentElement.removeAttribute("data-theme");
  Object.defineProperty(window, "localStorage", {
    value: { getItem: vi.fn().mockReturnValue(null), setItem: vi.fn() },
    writable: true,
  });
});

describe("ThemeToggle", () => {
  it("renderiza toggle con role switch", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("tiene aria-checked false inicialmente", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("tiene aria-label Cambiar a modo oscuro inicialmente", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-label", "Cambiar a modo oscuro");
  });

  it("cambia aria-checked al clickear", async () => {
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("cambia aria-label tras toggle", async () => {
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-label", "Cambiar a modo claro");
  });

  it("guarda en localStorage al cambiar", async () => {
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("switch"));
    expect(window.localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
  });

  it("actualiza data-theme en html", async () => {
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("switch"));
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
