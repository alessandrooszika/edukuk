import { render, screen } from "@testing-library/react";
import { Box } from "./Box";

describe("Box", () => {
  it("renderiza children", () => {
    render(<Box><span>hola</span></Box>);
    expect(screen.getByText("hola")).toBeInTheDocument();
  });

  it("renderiza como div", () => {
    const { container } = render(<Box />);
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("aplica display flex con prop display", () => {
    render(<Box display="flex" data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveStyle("display: flex");
  });

  it("convierte gap numerico a px", () => {
    render(<Box gap={16} data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveStyle("gap: 16px");
  });

  it("convierte padding numerico a px", () => {
    render(<Box p={12} data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveStyle("padding: 12px");
  });

  it("acepta gap como string", () => {
    render(<Box gap="1rem" data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveStyle("gap: 1rem");
  });

  it("aplica multiple props de layout simultaneamente", () => {
    render(
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        gap={8}
        p={16}
        data-testid="box"
      />
    );
    const el = screen.getByTestId("box");
    expect(el).toHaveStyle("display: flex");
    expect(el).toHaveStyle("flex-direction: column");
    expect(el).toHaveStyle("align-items: center");
    expect(el).toHaveStyle("justify-content: space-between");
    expect(el).toHaveStyle("gap: 8px");
    expect(el).toHaveStyle("padding: 16px");
  });

  it("aplica className", () => {
    render(<Box className="extra" data-testid="box" />);
    expect(screen.getByTestId("box").className).toContain("extra");
  });

  it("mezcla style prop con props de layout (style gana)", () => {
    render(<Box display="flex" style={{ display: "none" }} data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveStyle("display: none");
  });

  it("pasa ref via forwardRef", () => {
    const ref = { current: null };
    render(<Box ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("pasa atributos nativos via ...rest", () => {
    render(<Box data-custom="val" title="tooltip" />);
    expect(screen.getByTitle("tooltip")).toHaveAttribute("data-custom", "val");
  });

  it("aplica width numerico a px", () => {
    render(<Box width={300} data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveStyle("width: 300px");
  });

  it("aplica gridTemplateColumns", () => {
    render(<Box gridTemplateColumns="1fr 2fr" data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveStyle("grid-template-columns: 1fr 2fr");
  });

  it("aplica textAlign", () => {
    render(<Box textAlign="center" data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveStyle("text-align: center");
  });
});
