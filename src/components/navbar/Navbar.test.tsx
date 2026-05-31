import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "./Navbar";

vi.mock("../../hooks/useScrollProgress", () => ({
  useScrollProgress: () => 50,
}));

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: { getItem: vi.fn(), setItem: vi.fn() },
    writable: true,
  });
});

describe("Navbar", () => {
  it("renderiza nav con aria-label", () => {
    render(<Navbar currentPage="home" onNavigate={() => {}} />);
    expect(screen.getByRole("navigation", { name: "Navegación principal" })).toBeInTheDocument();
  });

  it("renderiza enlace Complementos", () => {
    render(<Navbar currentPage="home" onNavigate={() => {}} />);
    expect(screen.getByText("Complementos")).toBeInTheDocument();
  });

  it("llama onNavigate con 'home' al clickear logo", async () => {
    const onNavigate = vi.fn();
    render(<Navbar currentPage="home" onNavigate={onNavigate} />);
    await userEvent.click(screen.getByRole("button", { name: "edukuk" }));
    expect(onNavigate).toHaveBeenCalledWith("home");
  });

  it("llama onNavigate con 'complementos' al clickear enlace", async () => {
    const onNavigate = vi.fn();
    render(<Navbar currentPage="home" onNavigate={onNavigate} />);
    await userEvent.click(screen.getByText("Complementos"));
    expect(onNavigate).toHaveBeenCalledWith("complementos");
  });

  it("aplica clase active cuando currentPage es complementos", () => {
    render(<Navbar currentPage="complementos" onNavigate={() => {}} />);
    const btn = screen.getByText("Complementos");
    expect(btn.className).toContain("active");
  });

  it("aplica aria-current='page' cuando currentPage es complementos", () => {
    render(<Navbar currentPage="complementos" onNavigate={() => {}} />);
    expect(screen.getByText("Complementos")).toHaveAttribute("aria-current", "page");
  });

  it("no aplica aria-current cuando currentPage no es complementos", () => {
    render(<Navbar currentPage="home" onNavigate={() => {}} />);
    expect(screen.getByText("Complementos")).not.toHaveAttribute("aria-current");
  });
});
