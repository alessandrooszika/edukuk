import { render, screen } from "@testing-library/react";
import { Typography } from "./Typography";

describe("Typography", () => {
  it("renderiza body1 por defecto", () => {
    render(<Typography>texto</Typography>);
    expect(screen.getByText("texto")).toBeInTheDocument();
  });

  it("renderiza parrafo por defecto", () => {
    const { container } = render(<Typography>texto</Typography>);
    expect(container.querySelector("p")).toBeInTheDocument();
  });

  it("renderiza h1 con variant h1", () => {
    const { container } = render(<Typography variant="h1">titulo</Typography>);
    expect(container.querySelector("h1")).toHaveTextContent("titulo");
  });

  it("renderiza h2 con variant h2", () => {
    const { container } = render(<Typography variant="h2">h2</Typography>);
    expect(container.querySelector("h2")).toBeInTheDocument();
  });

  it("renderiza h3 con variant h3", () => {
    const { container } = render(<Typography variant="h3">h3</Typography>);
    expect(container.querySelector("h3")).toBeInTheDocument();
  });

  it("renderiza code con variant code", () => {
    const { container } = render(<Typography variant="code">code</Typography>);
    expect(container.querySelector("code")).toBeInTheDocument();
  });

  it("renderiza caption como span", () => {
    const { container } = render(<Typography variant="caption">cap</Typography>);
    expect(container.querySelector("span")).toHaveTextContent("cap");
  });

  it("usa component override en vez de mapping", () => {
    const { container } = render(<Typography variant="body1" component="article">art</Typography>);
    expect(container.querySelector("article")).toBeInTheDocument();
  });

  it("aplica gutterBottom class", () => {
    const { container } = render(<Typography gutterBottom>gb</Typography>);
    expect(container.firstChild).toHaveClass("gutterBottom");
  });

  it("aplica noWrap class", () => {
    const { container } = render(<Typography noWrap>nw</Typography>);
    expect(container.firstChild).toHaveClass("noWrap");
  });

  it("aplica textAlign style", () => {
    const { container } = render(<Typography align="center">centrado</Typography>);
    expect(container.firstChild).toHaveStyle("text-align: center");
  });

  it("pasa atributos extra", () => {
    render(<Typography data-testid="typo">test</Typography>);
    expect(screen.getByTestId("typo")).toBeInTheDocument();
  });
});
