import { render, screen } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader", () => {
  it("renderiza spinner", () => {
    render(<Loader />);
    expect(screen.getByRole("status", { name: "Cargando" })).toBeInTheDocument();
  });

  it("usa aria-label Cargando por defecto", () => {
    render(<Loader />);
    expect(screen.getByRole("status", { name: "Cargando" })).toHaveAttribute("aria-label", "Cargando");
  });

  it("usa label como aria-label", () => {
    render(<Loader label="Procesando..." />);
    expect(screen.getByRole("status", { name: "Procesando..." })).toHaveAttribute("aria-label", "Procesando...");
  });

  it("muestra texto label cuando se provee", () => {
    render(<Loader label="Cargando datos" />);
    expect(screen.getByText("Cargando datos")).toBeInTheDocument();
  });

  it("aplica clases de variant y size", () => {
    render(<Loader variant="danger" size="lg" />);
    const spinner = screen.getByRole("status", { name: "Cargando" });
    expect(spinner.className).toContain("danger");
    expect(spinner.className).toContain("lg");
  });

  it("aplica className adicional", () => {
    const { container } = render(<Loader className="extra" />);
    expect(container.firstElementChild!.className).toContain("extra");
  });
});
