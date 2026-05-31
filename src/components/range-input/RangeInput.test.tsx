import { render, screen } from "@testing-library/react";
import { RangeInput } from "./RangeInput";

describe("RangeInput", () => {
  it("renderiza input de tipo range", () => {
    render(<RangeInput />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("muestra label cuando se provee", () => {
    render(<RangeInput label="Volumen" />);
    expect(screen.getByLabelText("Volumen")).toBeInTheDocument();
  });

  it("muestra valor cuando showValue es true", () => {
    render(<RangeInput value={42} showValue />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("no muestra valor cuando showValue es false", () => {
    render(<RangeInput value={42} />);
    expect(screen.queryByText("42")).toBeNull();
  });

  it("usa min y max por defecto", () => {
    render(<RangeInput />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "100");
  });

  it("usa min y max personalizados", () => {
    render(<RangeInput min={10} max={50} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("min", "10");
    expect(slider).toHaveAttribute("max", "50");
  });
});
