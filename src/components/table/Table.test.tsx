import { render, screen } from "@testing-library/react";
import { Table } from "./Table";

const columns = [
  { key: "name", label: "Nombre" },
  { key: "age", label: "Edad" },
];

const data = [
  { name: "Ana", age: 30 },
  { name: "Luis", age: 25 },
];

describe("Table", () => {
  it("renderiza cabeceras", () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("Edad")).toBeInTheDocument();
  });

  it("renderiza datos en filas", () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText("Ana")).toBeInTheDocument();
    expect(screen.getByText("Luis")).toBeInTheDocument();
  });

  it("renderiza numero correcto de filas", () => {
    const { container } = render(<Table columns={columns} data={data} />);
    expect(container.querySelectorAll("tbody tr")).toHaveLength(2);
  });

  it("renderiza headers con scope col", () => {
    const { container } = render(<Table columns={columns} data={data} />);
    container.querySelectorAll("th").forEach((th) => {
      expect(th).toHaveAttribute("scope", "col");
    });
  });

  it("aplica variant class", () => {
    const { container } = render(<Table columns={columns} data={data} variant="info" />);
    expect(container.firstChild).toHaveClass("info");
  });

  it("aplica size class", () => {
    const { container } = render(<Table columns={columns} data={data} size="sm" />);
    expect(container.querySelector("table")).toHaveClass("sm");
  });

  it("aplica striped class", () => {
    const { container } = render(<Table columns={columns} data={data} striped />);
    expect(container.querySelector("table")).toHaveClass("striped");
  });

  it("aplica stickyHeader class", () => {
    const { container } = render(<Table columns={columns} data={data} stickyHeader />);
    expect(container.querySelector("table")).toHaveClass("stickyHeader");
  });

  it("muestra string vacio para valores faltantes", () => {
    const incomplete = [{ name: "Test" }];
    render(<Table columns={columns} data={incomplete} />);
    const tds = document.querySelectorAll("tbody td");
    expect(tds[1].textContent).toBe("");
  });
});
