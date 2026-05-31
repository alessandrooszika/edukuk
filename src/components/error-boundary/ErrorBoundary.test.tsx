import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

const Throws = () => { throw new Error("boom"); };

describe("ErrorBoundary", () => {
  it("renderiza children sin error", () => {
    render(<ErrorBoundary><span>ok</span></ErrorBoundary>);
    expect(screen.getByText("ok")).toBeInTheDocument();
  });

  it("muestra fallback al capturar error", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(<ErrorBoundary><Throws /></ErrorBoundary>);
    expect(screen.getByText("Algo salió mal")).toBeInTheDocument();
    expect(screen.getByText("boom")).toBeInTheDocument();
  });

  it("muestra boton Reintentar", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(<ErrorBoundary><Throws /></ErrorBoundary>);
    expect(screen.getByText("Reintentar")).toBeInTheDocument();
  });

  it("muestra error generico si no hay message", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const ThrowsNoMsg = () => { throw {}; };
    render(<ErrorBoundary><ThrowsNoMsg /></ErrorBoundary>);
    expect(screen.getByText("Error inesperado")).toBeInTheDocument();
  });

  it("renderiza children de nuevo tras reset", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(<ErrorBoundary><Throws /></ErrorBoundary>);
    expect(screen.getByText("Algo salió mal")).toBeInTheDocument();
  });
});
