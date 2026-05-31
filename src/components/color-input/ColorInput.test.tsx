import { render, screen } from "@testing-library/react";
import { ColorInput } from "./ColorInput";

describe("ColorInput", () => {
  it("renderiza input color oculto", () => {
    const { container } = render(<ColorInput />);
    expect(container.querySelector('input[type="color"]')).toBeInTheDocument();
  });

  it("muestra label cuando se provee", () => {
    render(<ColorInput label="Fondo" />);
    expect(screen.getByText("Fondo")).toBeInTheDocument();
  });

  it("asocia label con input via htmlFor/id", () => {
    render(<ColorInput label="Fondo" id="my-color" />);
    expect(screen.getByText("Fondo")).toHaveAttribute("for", "my-color");
  });

  it("muestra el valor hex por defecto", () => {
    render(<ColorInput />);
    expect(screen.getByText("#aa3bff")).toBeInTheDocument();
  });

  it("muestra el valor hex provisto", () => {
    render(<ColorInput value="#ff0000" />);
    expect(screen.getByText("#ff0000")).toBeInTheDocument();
  });

  it("tiene aria-label con el label y valor", () => {
    render(<ColorInput label="Fondo" value="#00ff00" />);
    expect(screen.getByLabelText("Fondo: #00ff00")).toBeInTheDocument();
  });

  it("muestra error y role alert", () => {
    render(<ColorInput error="Color inválido" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Color inválido");
  });

  it("aplica size class", () => {
    const { container } = render(<ColorInput size="lg" />);
    expect(container.querySelector(".inputWrap")).toHaveClass("lg");
  });

  it("aplica variant class", () => {
    const { container } = render(<ColorInput variant="success" />);
    expect(container.querySelector(".inputWrap")).toHaveClass("success");
  });
});
