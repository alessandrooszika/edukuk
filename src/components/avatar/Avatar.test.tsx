import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renderiza imagen cuando hay src", () => {
    const { container } = render(<Avatar src="/foto.jpg" alt="Usuario" />);
    expect(container.querySelector("img")).toHaveAttribute("src", "/foto.jpg");
  });

  it("tiene aria-label cuando hay src y alt", () => {
    const { container } = render(<Avatar src="/foto.jpg" alt="Usuario" />);
    expect(container.querySelector("[aria-label='Usuario']")).toBeInTheDocument();
  });

  it("no tiene role img sin src", () => {
    const { container } = render(<Avatar alt="JD" />);
    expect(container.firstChild).not.toHaveAttribute("role");
  });

  it("muestra iniciales desde alt", () => {
    render(<Avatar alt="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("muestra una inicial si alt tiene una palabra", () => {
    render(<Avatar alt="Admin" />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("muestra children en vez de iniciales", () => {
    render(<Avatar alt="JD"><span>custom</span></Avatar>);
    expect(screen.getByText("custom")).toBeInTheDocument();
  });

  it("aplica size class", () => {
    const { container } = render(<Avatar size="lg" alt="U" />);
    expect(container.firstChild).toHaveClass("lg");
  });

  it("aplica variant class", () => {
    const { container } = render(<Avatar variant="square" alt="U" />);
    expect(container.firstChild).toHaveClass("square");
  });

  it("aplica color class", () => {
    const { container } = render(<Avatar color="success" alt="U" />);
    expect(container.firstChild).toHaveClass("success");
  });

  it("no renderiza nada si no hay src, alt ni children", () => {
    const { container } = render(<Avatar />);
    expect(container.textContent).toBe("");
  });
});
