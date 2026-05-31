import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PasswordInput } from "./PasswordInput";

describe("PasswordInput", () => {
  it("renderiza input de tipo password", () => {
    const { container } = render(<PasswordInput />);
    const input = container.querySelector('input')!;
    expect(input).toHaveAttribute("type", "password");
  });

  it("muestra label cuando se provee", () => {
    render(<PasswordInput label="Contraseña" />);
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
  });

  it("muestra error y role alert", () => {
    render(<PasswordInput error="Muy corta" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Muy corta");
  });

  it("marca aria-invalid cuando hay error", () => {
    const { container } = render(<PasswordInput error="Error" />);
    expect(container.querySelector('input')).toHaveAttribute("aria-invalid", "true");
  });

  it("alterna visibilidad al clickear toggle", async () => {
    render(<PasswordInput />);
    const toggle = screen.getByLabelText("Mostrar contraseña");
    await userEvent.click(toggle);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Ocultar contraseña")).toBeInTheDocument();
  });
});
