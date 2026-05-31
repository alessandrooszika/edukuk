import { render, screen } from "@testing-library/react";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("renderiza barra de progreso", () => {
    render(<Progress value={50} />);
    const fill = document.querySelector('[style*="width"]') as HTMLElement;
    expect(fill).toBeInTheDocument();
  });

  it("aplica width correcto segun value", () => {
    render(<Progress value={75} />);
    const fill = document.querySelector('[style*="width: 75%"]');
    expect(fill).toBeInTheDocument();
  });

  it("clampa value a 0 como minimo", () => {
    render(<Progress value={-10} />);
    const fill = document.querySelector('[style*="width: 0%"]');
    expect(fill).toBeInTheDocument();
  });

  it("clampa value a 100 como maximo", () => {
    render(<Progress value={150} />);
    const fill = document.querySelector('[style*="width: 100%"]');
    expect(fill).toBeInTheDocument();
  });

  it("muestra label cuando se provee", () => {
    render(<Progress value={50} label="Avance" />);
    expect(screen.getByText("Avance")).toBeInTheDocument();
  });

  it("muestra valor porcentual cuando showValue=true", () => {
    render(<Progress value={50} showValue />);
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("no muestra header si no hay label ni showValue", () => {
    render(<Progress value={50} />);
    expect(screen.queryByText("50%")).not.toBeInTheDocument();
  });

  it("aplica clases de variant y size", () => {
    render(<Progress value={50} variant="success" size="lg" />);
    const fill = document.querySelector('[style*="width"]')!;
    expect(fill.className).toContain("success");
    const track = fill.parentElement!;
    expect(track.className).toContain("lg");
  });

  it("redondea valor mostrado", () => {
    render(<Progress value={33.333} showValue />);
    expect(screen.getByText("33%")).toBeInTheDocument();
  });
});
