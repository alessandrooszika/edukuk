import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TreeView } from "./TreeView";
import type { TreeNode } from "../../utils/tree";

const sampleData: TreeNode[] = [
  {
    id: "docs",
    label: "Documentos",
    children: [
      { id: "report", label: "Reporte Q1" },
      {
        id: "projects",
        label: "Proyectos",
        children: [
          { id: "edukuk", label: "edukuk" },
          { id: "other", label: "otros" },
        ],
      },
    ],
  },
  {
    id: "images",
    label: "Imágenes",
    children: [
      { id: "screenshot", label: "Captura.png" },
    ],
  },
];

describe("TreeView", () => {
  it("renderiza nodos raíz", () => {
    render(<TreeView data={sampleData} />);
    expect(screen.getByText("Documentos")).toBeInTheDocument();
    expect(screen.getByText("Imágenes")).toBeInTheDocument();
  });

  it("expande/colapsa hijos al hacer clic", () => {
    render(<TreeView data={sampleData} />);
    expect(screen.queryByText("Reporte Q1")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Documentos"));
    expect(screen.getByText("Reporte Q1")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Documentos"));
    expect(screen.queryByText("Reporte Q1")).not.toBeInTheDocument();
  });

  it("expande nodos anidados", () => {
    render(<TreeView data={sampleData} />);
    fireEvent.click(screen.getByText("Documentos"));
    expect(screen.queryByText("edukuk")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Proyectos"));
    expect(screen.getByText("edukuk")).toBeInTheDocument();
  });

  it("llama onSelect al hacer clic", () => {
    const onSelect = vi.fn();
    render(<TreeView data={sampleData} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("Imágenes"));
    expect(onSelect).toHaveBeenCalledWith("images");
  });

  it("marca nodo como seleccionado", () => {
    render(<TreeView data={sampleData} selectedId="images" />);
    const imgNode = screen.getByText("Imágenes").closest("[role='treeitem']");
    expect(imgNode).toHaveAttribute("aria-selected", "true");
  });

  it("expande nodos por defecto", () => {
    render(<TreeView data={sampleData} defaultExpandedIds={["docs"]} />);
    expect(screen.getByText("Reporte Q1")).toBeInTheDocument();
  });

  it("navega con teclado ArrowDown", () => {
    render(<TreeView data={sampleData} />);
    const tree = screen.getByRole("tree");
    fireEvent.keyDown(tree, { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Documentos"));
    expect(screen.getByText("Reporte Q1")).toBeInTheDocument();
  });

  it("tiene role='tree' y role='treeitem' en nodos", () => {
    render(<TreeView data={sampleData} />);
    expect(screen.getByRole("tree")).toBeInTheDocument();
    const items = screen.getAllByRole("treeitem");
    expect(items).toHaveLength(2);
  });

  it("expande con ArrowRight y colapsa con ArrowLeft", () => {
    render(<TreeView data={sampleData} />);
    const tree = screen.getByRole("tree");
    fireEvent.keyDown(tree, { key: "ArrowRight" });
    expect(screen.getByText("Reporte Q1")).toBeInTheDocument();
    fireEvent.keyDown(tree, { key: "ArrowLeft" });
    expect(screen.queryByText("Reporte Q1")).not.toBeInTheDocument();
  });

  it("navega con Home y End", () => {
    const flatData: TreeNode[] = [
      { id: "a", label: "A" },
      { id: "b", label: "B" },
      { id: "c", label: "C" },
    ];
    const onSelect = vi.fn();
    render(<TreeView data={flatData} onSelect={onSelect} />);
    const tree = screen.getByRole("tree");
    fireEvent.keyDown(tree, { key: "End" });
    fireEvent.keyDown(tree, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith("c");
  });
});
