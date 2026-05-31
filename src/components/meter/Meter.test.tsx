import { render } from "@testing-library/react";
import { Meter } from "./Meter";

describe("Meter", () => {
  it("renderiza meter con value", () => {
    const { container } = render(<Meter value={50} />);
    expect(container.querySelector("meter")).toBeInTheDocument();
  });

  it("pasa value al elemento", () => {
    const { container } = render(<Meter value={75} />);
    expect(container.querySelector("meter")).toHaveAttribute("value", "75");
  });

  it("pasa min y max", () => {
    const { container } = render(<Meter value={50} min={0} max={200} />);
    const meter = container.querySelector("meter");
    expect(meter).toHaveAttribute("min", "0");
    expect(meter).toHaveAttribute("max", "200");
  });

  it("no requiere min/max", () => {
    const { container } = render(<Meter value={30} />);
    expect(container.querySelector("meter")).toBeInTheDocument();
  });
});
