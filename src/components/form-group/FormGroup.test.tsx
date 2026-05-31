import { render, screen } from "@testing-library/react";
import { FormGroup } from "./FormGroup";
import { FormField } from "../form-field";

describe("FormGroup", () => {
  it("renderiza children", () => {
    render(
      <FormGroup>
        <span>contenido</span>
      </FormGroup>
    );
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("renderiza legend", () => {
    render(<FormGroup legend="Datos personales" />);
    expect(screen.getByText("Datos personales")).toBeInTheDocument();
  });

  it("renderiza como fieldset", () => {
    const { container } = render(<FormGroup legend="Test" />);
    expect(container.querySelector("fieldset")).toBeInTheDocument();
  });

  it("agrupa FormFields", () => {
    render(
      <FormGroup legend="Contacto">
        <FormField label="Email" />
        <FormField label="Teléfono" />
      </FormGroup>
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Teléfono")).toBeInTheDocument();
  });
});
