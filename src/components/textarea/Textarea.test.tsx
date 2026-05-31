import { render, screen } from "@testing-library/react";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renderiza textarea", () => {
    render(<Textarea />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("muestra label cuando se provee", () => {
    render(<Textarea label="Comentario" />);
    expect(screen.getByLabelText("Comentario")).toBeInTheDocument();
  });

  it("asocia label con textarea via htmlFor/id", () => {
    render(<Textarea label="Comentario" id="my-text" />);
    expect(screen.getByLabelText("Comentario")).toHaveAttribute("id", "my-text");
  });

  it("muestra error y role alert", () => {
    render(<Textarea error="Campo requerido" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Campo requerido");
  });

  it("marca aria-invalid cuando hay error", () => {
    render(<Textarea error="Error" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("usa rows por defecto 3", () => {
    render(<Textarea />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "3");
  });

  it("usa rows personalizado", () => {
    render(<Textarea rows={5} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "5");
  });

  it("aplica size class", () => {
    render(<Textarea size="lg" />);
    expect(screen.getByRole("textbox")).toHaveClass("lg");
  });

  it("aplica variant class", () => {
    render(<Textarea variant="success" />);
    expect(screen.getByRole("textbox")).toHaveClass("success");
  });
});
