import { render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renderiza titulo", () => {
    render(<EmptyState title="Sin datos" />);
    expect(screen.getByText("Sin datos")).toBeInTheDocument();
  });

  it("renderiza descripcion", () => {
    render(<EmptyState title="Vacio" description="No hay elementos" />);
    expect(screen.getByText("No hay elementos")).toBeInTheDocument();
  });

  it("renderiza icono", () => {
    render(<EmptyState title="Test" icon={<span>icono</span>} />);
    expect(screen.getByText("icono")).toBeInTheDocument();
  });

  it("renderiza accion", () => {
    render(<EmptyState title="Test" action={<button>Crear</button>} />);
    expect(screen.getByText("Crear")).toBeInTheDocument();
  });

  it("no renderiza icono si no se provee", () => {
    const { container } = render(<EmptyState title="Test" />);
    expect(container.querySelector(".icon")).toBeNull();
  });

  it("no renderiza descripcion si no se provee", () => {
    const { container } = render(<EmptyState title="Test" />);
    expect(container.querySelector(".description")).toBeNull();
  });
});
