import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Footer } from "./Footer";

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: { getItem: vi.fn(), setItem: vi.fn() },
    writable: true,
  });
});

describe("Footer", () => {
  it("renderiza branding", () => {
    render(<Footer onNavigate={() => {}} />);
    expect(screen.getByText("edukuk")).toBeInTheDocument();
  });

  it("renderiza descripcion", () => {
    render(<Footer onNavigate={() => {}} />);
    expect(screen.getByText(/Espacio de aprendizaje/)).toBeInTheDocument();
  });

  it("renderiza navegacion", () => {
    render(<Footer onNavigate={() => {}} />);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Complementos")).toBeInTheDocument();
  });

  it("renderiza redes sociales", () => {
    render(<Footer onNavigate={() => {}} />);
    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
    expect(screen.getByLabelText("X")).toBeInTheDocument();
    expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
  });

  it("renderiza email de contacto", () => {
    render(<Footer onNavigate={() => {}} />);
    expect(screen.getByText("hola@edukuk.dev")).toBeInTheDocument();
  });

  it("renderiza copyright", () => {
    render(<Footer onNavigate={() => {}} />);
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it("llama onNavigate al clickear Inicio", async () => {
    const onNavigate = vi.fn();
    render(<Footer onNavigate={onNavigate} />);
    await userEvent.click(screen.getByText("Inicio"));
    expect(onNavigate).toHaveBeenCalledWith("home");
  });

  it("llama onNavigate al clickear Complementos", async () => {
    const onNavigate = vi.fn();
    render(<Footer onNavigate={onNavigate} />);
    await userEvent.click(screen.getByText("Complementos"));
    expect(onNavigate).toHaveBeenCalledWith("complementos");
  });
});
