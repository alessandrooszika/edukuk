import { render, screen } from "@testing-library/react";
import { Stepper } from "./Stepper";

describe("Stepper", () => {
  const steps = ["Uno", "Dos", "Tres"];

  it("renderiza todos los pasos", () => {
    render(<Stepper steps={steps} activeStep={0} />);
    expect(screen.getByText("Uno")).toBeInTheDocument();
    expect(screen.getByText("Dos")).toBeInTheDocument();
    expect(screen.getByText("Tres")).toBeInTheDocument();
  });

  it("tiene nav con aria-label", () => {
    render(<Stepper steps={steps} activeStep={0} />);
    expect(screen.getByRole("navigation", { name: "Progreso" })).toBeInTheDocument();
  });

  it("marca paso activo con aria-current", () => {
    render(<Stepper steps={steps} activeStep={1} />);
    const items = screen.getAllByRole("listitem");
    expect(items[1]).toHaveAttribute("aria-current", "step");
  });

  it("no marca aria-current en pasos no activos", () => {
    render(<Stepper steps={steps} activeStep={1} />);
    const items = screen.getAllByRole("listitem");
    expect(items[0]).not.toHaveAttribute("aria-current");
    expect(items[2]).not.toHaveAttribute("aria-current");
  });

  it("muestra checkmark en pasos completados", () => {
    const { container } = render(<Stepper steps={steps} activeStep={2} />);
    expect(container.textContent).toContain("✓");
  });

  it("orientacion vertical aplica clase", () => {
    const { container } = render(<Stepper steps={steps} activeStep={0} orientation="vertical" />);
    expect(container.firstChild).toHaveClass("vertical");
  });

  it("alternativeLabel aplica clase", () => {
    const { container } = render(<Stepper steps={steps} activeStep={0} alternativeLabel />);
    expect(container.firstChild).toHaveClass("alternativeLabel");
  });
});
