import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable } from "./DataTable";
import type { Column } from "./DataTable";

interface User {
  name: string;
  age: number;
  role: string;
}

const cols: Column<User>[] = [
  { key: "name", label: "Nombre", sortable: true },
  { key: "age", label: "Edad" },
  { key: "role", label: "Rol", sortable: true },
];

const data: User[] = [
  { name: "Ana", age: 30, role: "Admin" },
  { name: "Bob", age: 25, role: "User" },
  { name: "Carlos", age: 35, role: "Editor" },
];

describe("DataTable", () => {
  it("renderiza datos", () => {
    render(<DataTable columns={cols} data={data} />);
    expect(screen.getByText("Ana")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Carlos")).toBeInTheDocument();
  });

  it("renderiza encabezados", () => {
    render(<DataTable columns={cols} data={data} />);
    const headers = screen.getAllByText("Nombre");
    expect(headers.length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Edad").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Rol").length).toBeGreaterThanOrEqual(1);
  });

  it("filtra por texto", () => {
    render(<DataTable columns={cols} data={data} />);
    const search = screen.getByLabelText("Filtrar tabla");
    fireEvent.change(search, { target: { value: "Ana" } });
    expect(screen.getByText("Ana")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
  });

  it("ordena al clickear columna sortable", () => {
    render(<DataTable columns={cols} data={data} />);
    const headers = screen.getAllByText("Nombre");
    const th = headers.find((el) => el.closest("th"));
    if (th) fireEvent.click(th);
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Ana");
  });

  it("muestra empty state sin datos", () => {
    render(<DataTable columns={cols} data={[]} />);
    expect(screen.getByText("Sin resultados")).toBeInTheDocument();
  });

  it("pagina datos con pageSize", () => {
    const manyData = Array.from({ length: 25 }, (_, i) => ({
      name: `User ${i}`, age: 20 + i, role: "User",
    }));
    render(<DataTable columns={cols} data={manyData} pageSize={10} />);
    expect(screen.getByText("User 0")).toBeInTheDocument();
    expect(screen.queryByText("User 15")).not.toBeInTheDocument();
  });

  it("selecciona filas con checkbox", () => {
    render(<DataTable columns={cols} data={data} selectable />);
    const checkboxes = screen.getAllByRole("checkbox", { name: "Seleccionar fila" });
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();
  });

  it("selecciona todas las filas", () => {
    render(<DataTable columns={cols} data={data} selectable />);
    const allCheckbox = screen.getByLabelText("Seleccionar todas las filas");
    fireEvent.click(allCheckbox);
    const rowCheckboxes = screen.getAllByRole("checkbox", { name: "Seleccionar fila" });
    rowCheckboxes.forEach((cb) => expect(cb).toBeChecked());
  });
});
