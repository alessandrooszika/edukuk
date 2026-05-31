import { render, screen } from "@testing-library/react";
import { Stack, HStack, VStack } from ".";

describe("Stack", () => {
  it("renderiza children", () => {
    render(<Stack><span>hola</span></Stack>);
    expect(screen.getByText("hola")).toBeInTheDocument();
  });

  it("default direction es column con gap 1rem", () => {
    render(<Stack data-testid="stack" />);
    const el = screen.getByTestId("stack");
    expect(el).toHaveStyle("display: flex");
    expect(el).toHaveStyle("flex-direction: column");
    expect(el).toHaveStyle("gap: 1rem");
  });

  it("acepta direction row", () => {
    render(<Stack direction="row" data-testid="stack" />);
    expect(screen.getByTestId("stack")).toHaveStyle("flex-direction: row");
  });

  it("acepta gap personalizado", () => {
    render(<Stack gap="2rem" data-testid="stack" />);
    expect(screen.getByTestId("stack")).toHaveStyle("gap: 2rem");
  });

  it("gap numerico se convierte a px", () => {
    render(<Stack gap={24} data-testid="stack" />);
    expect(screen.getByTestId("stack")).toHaveStyle("gap: 24px");
  });
});

describe("HStack", () => {
  it("renderiza con flex-direction row", () => {
    render(<HStack data-testid="hstack" />);
    const el = screen.getByTestId("hstack");
    expect(el).toHaveStyle("display: flex");
    expect(el).toHaveStyle("flex-direction: row");
    expect(el).toHaveStyle("gap: 0.5rem");
  });
});

describe("VStack", () => {
  it("renderiza con flex-direction column", () => {
    render(<VStack data-testid="vstack" />);
    const el = screen.getByTestId("vstack");
    expect(el).toHaveStyle("display: flex");
    expect(el).toHaveStyle("flex-direction: column");
    expect(el).toHaveStyle("gap: 1rem");
  });
});
