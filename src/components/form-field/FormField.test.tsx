import { render, screen } from "@testing-library/react";
import { FormField } from "./FormField";
import { Input } from "../input";

describe("FormField", () => {
  it("renderiza children", () => {
    render(<FormField><Input placeholder="test" /></FormField>);
    expect(screen.getByPlaceholderText("test")).toBeInTheDocument();
  });

  it("renderiza label con htmlFor", () => {
    render(<FormField label="Nombre" htmlFor="name" />);
    const label = screen.getByText("Nombre");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "name");
  });

  it("renderiza error con role alert", () => {
    render(<FormField error="Campo requerido" />);
    const error = screen.getByRole("alert");
    expect(error).toHaveTextContent("Campo requerido");
  });

  it("muestra helperText solo cuando no hay error", () => {
    const { rerender } = render(<FormField helperText="Ayuda" />);
    expect(screen.getByText("Ayuda")).toBeInTheDocument();

    rerender(<FormField helperText="Ayuda" error="Error!" />);
    expect(screen.queryByText("Ayuda")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Error!");
  });

  it("agrega asterisco cuando required es true", () => {
    const { container } = render(<FormField label="Email" required />);
    const label = container.querySelector("label");
    expect(label?.className).toContain("required");
  });
});
