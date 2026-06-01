import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import type { TreeNode } from "../tree-view";
import { TreeSelect } from "./TreeSelect";

const options: TreeNode[] = [
  {
    id: "docs",
    label: "Documentos",
    children: [
      { id: "report", label: "Reporte Q1" },
      { id: "notes", label: "Notas" },
    ],
  },
  { id: "images", label: "Imágenes" },
];

function TestTreeSelect(props: Partial<React.ComponentProps<typeof TreeSelect>>) {
  const [value, setValue] = useState(props.value ?? "");
  return (
    <TreeSelect
      options={props.options ?? options}
      value={value}
      onChange={(v) => { setValue(v); props.onChange?.(v); }}
      {...props}
    />
  );
}

describe("TreeSelect", () => {
  it("renderiza trigger con placeholder", () => {
    render(<TestTreeSelect />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("muestra la etiqueta del nodo seleccionado", () => {
    render(<TestTreeSelect value="images" />);
    expect(screen.getByText("Imágenes")).toBeInTheDocument();
  });

  it("abre dropdown al clickear trigger", () => {
    render(<TestTreeSelect />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("tree")).toBeInTheDocument();
    expect(screen.getByText("Documentos")).toBeInTheDocument();
  });

  it("cierra dropdown al clickear fuera", () => {
    render(<TestTreeSelect />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("tree")).toBeInTheDocument();
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("tree")).not.toBeInTheDocument();
  });

  it("expande/colapsa nodos hijos al clickear", () => {
    render(<TestTreeSelect />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByText("Reporte Q1")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Documentos"));
    expect(screen.getByText("Reporte Q1")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Documentos"));
    expect(screen.queryByText("Reporte Q1")).not.toBeInTheDocument();
  });

  it("selecciona nodo hoja al clickear", () => {
    const onChange = vi.fn();
    render(<TestTreeSelect onChange={onChange} />);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Imágenes"));
    expect(onChange).toHaveBeenCalledWith("images");
    expect(screen.queryByRole("tree")).not.toBeInTheDocument();
  });

  it("selecciona nodo hoja al presionar Enter", () => {
    const onChange = vi.fn();
    render(<TestTreeSelect onChange={onChange} />);
    const btn = screen.getByRole("button");
    fireEvent.keyDown(btn, { key: "ArrowDown" });
    fireEvent.keyDown(screen.getByRole("tree"), { key: "ArrowDown" });
    fireEvent.keyDown(screen.getByRole("tree"), { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("images");
  });

  it("cierra con Escape", () => {
    render(<TestTreeSelect />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("tree")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("tree"), { key: "Escape" });
    expect(screen.queryByRole("tree")).not.toBeInTheDocument();
  });

  it("expande con ArrowRight y colapsa con ArrowLeft", () => {
    render(<TestTreeSelect />);
    fireEvent.click(screen.getByRole("button"));
    const tree = screen.getByRole("tree");
    fireEvent.keyDown(tree, { key: "ArrowRight" });
    expect(screen.getByText("Reporte Q1")).toBeInTheDocument();
    fireEvent.keyDown(tree, { key: "ArrowLeft" });
    expect(screen.queryByText("Reporte Q1")).not.toBeInTheDocument();
  });

  it("navega con ArrowDown y ArrowUp", () => {
    render(<TestTreeSelect />);
    fireEvent.click(screen.getByRole("button"));
    const tree = screen.getByRole("tree");
    fireEvent.keyDown(tree, { key: "ArrowDown" });
    fireEvent.keyDown(tree, { key: "ArrowDown" });
    fireEvent.keyDown(tree, { key: "Enter" });
    expect(screen.getByText("Imágenes")).toBeInTheDocument();
  });

  it("renderiza label y error", () => {
    render(<TestTreeSelect label="Archivos" error="Campo requerido" />);
    expect(screen.getByText("Archivos")).toBeInTheDocument();
    expect(screen.getByText("Campo requerido")).toBeInTheDocument();
  });

  it("no abre si disabled", () => {
    render(<TestTreeSelect disabled />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByRole("tree")).not.toBeInTheDocument();
  });

  it("tiene aria-haspopup='tree'", () => {
    render(<TestTreeSelect />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-haspopup", "tree");
  });
});
