import { render, screen } from "@testing-library/react";
import { DateInput } from "./DateInput";

describe("DateInput", () => {
  it("renderiza input de tipo date", () => {
    const { container } = render(<DateInput />);
    expect(container.querySelector('input[type="date"]')).toBeInTheDocument();
  });

  it("muestra label cuando se provee", () => {
    render(<DateInput label="Fecha" />);
    expect(screen.getByLabelText("Fecha")).toBeInTheDocument();
  });

  it("asocia label con input via htmlFor/id", () => {
    render(<DateInput label="Fecha" id="my-date" />);
    expect(screen.getByLabelText("Fecha")).toHaveAttribute("id", "my-date");
  });

  it("muestra error y role alert", () => {
    render(<DateInput error="Fecha requerida" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Fecha requerida");
  });

  it("marca aria-invalid cuando hay error", () => {
    const { container } = render(<DateInput error="Error" />);
    expect(container.querySelector('input')).toHaveAttribute("aria-invalid", "true");
  });

  it("aplica size class", () => {
    const { container } = render(<DateInput size="lg" />);
    expect(container.querySelector('input')).toHaveClass("lg");
  });

  it("aplica variant class", () => {
    const { container } = render(<DateInput variant="success" />);
    expect(container.querySelector('input')).toHaveClass("success");
  });
});
