import { render, screen } from "@testing-library/react";
import { SplitPane } from "./SplitPane";

describe("SplitPane", () => {
  it("renderiza ambos paneles", () => {
    render(<SplitPane primary={<div>Panel A</div>} secondary={<div>Panel B</div>} />);
    expect(screen.getByText("Panel A")).toBeInTheDocument();
    expect(screen.getByText("Panel B")).toBeInTheDocument();
  });

  it("renderiza en orientacion horizontal por defecto", () => {
    const { container } = render(<SplitPane primary={<div>A</div>} secondary={<div>B</div>} />);
    expect(container.firstChild).toHaveStyle("flex-direction: row");
  });

  it("renderiza en orientacion vertical", () => {
    const { container } = render(<SplitPane primary={<div>A</div>} secondary={<div>B</div>} orientation="vertical" />);
    expect(container.firstChild).toHaveStyle("flex-direction: column");
  });

  it("tiene divisor", () => {
    render(<SplitPane primary={<div>A</div>} secondary={<div>B</div>} />);
    const container = screen.getByText("A").closest("[class]")?.parentElement;
    const dividers = container?.querySelectorAll("[class*=divider]");
    expect(dividers?.length).toBeGreaterThan(0);
  });

  it("aplica className", () => {
    const { container } = render(<SplitPane primary={<div>A</div>} secondary={<div>B</div>} className="custom" />);
    expect(container.firstChild).toHaveClass("custom");
  });
});
