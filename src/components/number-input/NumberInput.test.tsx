import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NumberInput } from "./NumberInput";

describe("NumberInput", () => {
  it("renderiza input de tipo text con inputMode numeric", () => {
    render(<NumberInput />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("inputMode", "numeric");
    expect(input).toHaveAttribute("pattern", "[0-9]*");
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
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("renderiza botones stepper", () => {
    render(<NumberInput />);
    expect(screen.getByLabelText("Incrementar")).toBeInTheDocument();
    expect(screen.getByLabelText("Decrementar")).toBeInTheDocument();
  });

  it("llama onChange al escribir digitos", async () => {
    const onChange = vi.fn();
    render(<NumberInput onChange={onChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "5");
    expect(onChange).toHaveBeenCalled();
  });

  it("filtra la letra e en onChange", async () => {
    let lastValue = "";
    const onChange = vi.fn((e: React.ChangeEvent<HTMLInputElement>) => {
      lastValue = e.target.value;
    });
    render(<NumberInput onChange={onChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "1e");
    expect(lastValue).toBe("1");
  });

  it("quita leading zeros", async () => {
    const collected: string[] = [];
    const onChange = vi.fn((e: React.ChangeEvent<HTMLInputElement>) => {
      collected.push(e.target.value);
    });
    render(<NumberInput onChange={onChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "0350");
    expect(collected[collected.length - 1]).toBe("350");
  });
});
