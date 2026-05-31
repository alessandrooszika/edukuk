import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NumberInput } from "./NumberInput";

describe("NumberInput", () => {
  it("renderiza input de tipo number", () => {
    render(<NumberInput />);
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("muestra label cuando se provee", () => {
    render(<NumberInput label="Edad" />);
    expect(screen.getByLabelText("Edad")).toBeInTheDocument();
  });

  it("muestra error y role alert", () => {
    render(<NumberInput error="Valor inválido" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Valor inválido");
  });

  it("marca aria-invalid cuando hay error", () => {
    render(<NumberInput error="Error" />);
    expect(screen.getByRole("spinbutton")).toHaveAttribute("aria-invalid", "true");
  });

  it("renderiza botones stepper", () => {
    render(<NumberInput />);
    expect(screen.getByLabelText("Incrementar")).toBeInTheDocument();
    expect(screen.getByLabelText("Decrementar")).toBeInTheDocument();
  });

  it("llama onChange al escribir", async () => {
    const onChange = vi.fn();
    render(<NumberInput onChange={onChange} />);
    await userEvent.type(screen.getByRole("spinbutton"), "5");
    expect(onChange).toHaveBeenCalled();
  });
});
