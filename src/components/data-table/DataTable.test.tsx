import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable, type Column } from "./DataTable";

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
    expect(screen.getAllByText("Nombre").length).toBeGreaterThanOrEqual(1);
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

  it("ordena asc al clickear columna sortable", () => {
    render(<DataTable columns={cols} data={data} />);
    const nameHeader = screen.getAllByText("Nombre").find((el) => el.closest("th"))!;
    fireEvent.click(nameHeader);
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Ana");
  });

  it("ordena desc al doble click", () => {
    render(<DataTable columns={cols} data={data} />);
    const nameHeader = screen.getAllByText("Nombre").find((el) => el.closest("th"))!;
    fireEvent.click(nameHeader);
    fireEvent.click(nameHeader);
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Carlos");
  });

  it("aplica aria-sort en columna ordenada", () => {
    render(<DataTable columns={cols} data={data} />);
    const nameHeader = screen.getAllByText("Nombre").find((el) => el.closest("th"))!;
    expect(nameHeader.closest("th")).not.toHaveAttribute("aria-sort");
    fireEvent.click(nameHeader);
    expect(nameHeader.closest("th")).toHaveAttribute("aria-sort", "ascending");
    fireEvent.click(nameHeader);
    expect(nameHeader.closest("th")).toHaveAttribute("aria-sort", "descending");
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

  it("llama onSelectionChange al seleccionar filas", () => {
    const onSelectionChange = vi.fn();
    render(<DataTable columns={cols} data={data} selectable onSelectionChange={onSelectionChange} />);
    const checkboxes = screen.getAllByRole("checkbox", { name: "Seleccionar fila" });
    fireEvent.click(checkboxes[0]);
    expect(onSelectionChange).toHaveBeenCalledWith([data[0]]);
    fireEvent.click(checkboxes[0]);
    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });

  it("alterna visibilidad de columnas", () => {
    render(<DataTable columns={cols} data={data} />);
    const toggleBtn = screen.getByRole("button", { name: /Columnas/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveAttribute("aria-haspopup", "true");
    const nameCheckbox = screen.getByRole("menuitemcheckbox", { name: /Nombre/i });
    expect(nameCheckbox).toBeChecked();
    fireEvent.click(nameCheckbox);
    expect(nameCheckbox).not.toBeChecked();
    expect(screen.queryByText("Ana")).not.toBeInTheDocument();
  });

  it("aplica striped cuando se pasa la prop", () => {
    const { container } = render(<DataTable columns={cols} data={data} striped />);
    const table = container.querySelector("table");
    expect(table).toHaveClass("striped");
  });

  it("aplica variant y size", () => {
    const { container } = render(<DataTable columns={cols} data={data} variant="info" size="sm" />);
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveClass("info");
    const table = container.querySelector("table");
    expect(table).toHaveClass("sm");
  });

  it("filtra sin incluir columnas con filterable false", () => {
    const colsWithFilter: Column<User>[] = [
      { key: "name", label: "Nombre", sortable: true, filterable: false },
      { key: "age", label: "Edad" },
      { key: "role", label: "Rol", sortable: true },
    ];
    const dataWithFilter = [
      { name: "Admin", age: 30, role: "Admin" },
      { name: "Bob", age: 25, role: "User" },
    ];
    render(<DataTable columns={colsWithFilter} data={dataWithFilter} />);
    const search = screen.getByLabelText("Filtrar tabla");
    fireEvent.change(search, { target: { value: "Admin" } });
    expect(screen.getAllByText("Admin")).toHaveLength(2);
    expect(screen.queryByText("User")).not.toBeInTheDocument();
  });

  it("renderiza columna con custom render", () => {
    const colsCustom: Column<User>[] = [
      { key: "name", label: "Nombre" },
      { key: "age", label: "Edad", render: (v) => <strong>{String(v)} años</strong> },
    ];
    render(<DataTable columns={colsCustom} data={data} />);
    expect(screen.getByText("30 años")).toBeInTheDocument();
    expect(screen.getByText("25 años")).toBeInTheDocument();
    expect(screen.getByText("35 años")).toBeInTheDocument();
  });

  it("encabezados no sortables no tienen clase sortable", () => {
    render(<DataTable columns={cols} data={data} />);
    const ageHeader = screen.getAllByText("Edad").find((el) => el.closest("th"))!;
    expect(ageHeader.closest("th")).not.toHaveClass("sortable");
  });
});
