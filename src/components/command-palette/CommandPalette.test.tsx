import { render, screen, fireEvent } from "@testing-library/react";
import { CommandPalette } from "./CommandPalette";
import type { Command } from "./CommandPalette";

const groups = [
  {
    heading: "Navegación",
    items: [
      { id: "home", label: "Ir al inicio", shortcut: "⌘1" } as Command,
      { id: "components", label: "Ver complementos", shortcut: "⌘2" } as Command,
    ],
  },
  {
    heading: "Acciones",
    items: [
      { id: "theme", label: "Cambiar tema", description: "Alternar modo claro/oscuro" } as Command,
    ],
  },
];

describe("CommandPalette", () => {
  it("no renderiza cuando isOpen=false", () => {
    render(<CommandPalette isOpen={false} onClose={vi.fn()} groups={groups} />);
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("renderiza cuando isOpen=true", () => {
    render(<CommandPalette isOpen={true} onClose={vi.fn()} groups={groups} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("filtra comandos por label", () => {
    render(<CommandPalette isOpen={true} onClose={vi.fn()} groups={groups} />);
    expect(screen.getByText("Ir al inicio")).toBeInTheDocument();
    expect(screen.getByText("Cambiar tema")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "inicio" } });
    expect(screen.getByText("Ir al inicio")).toBeInTheDocument();
    expect(screen.queryByText("Cambiar tema")).not.toBeInTheDocument();
  });

  it("muestra empty state si no hay resultados", () => {
    render(<CommandPalette isOpen={true} onClose={vi.fn()} groups={groups} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "xyz" } });
    expect(screen.getByText("commandPalette.noResults")).toBeInTheDocument();
  });

  it("ejecuta comando al clickear", () => {
    const onExecute = vi.fn();
    render(<CommandPalette isOpen={true} onClose={vi.fn()} groups={groups} onExecute={onExecute} />);
    fireEvent.click(screen.getByText("Ir al inicio"));
    expect(onExecute).toHaveBeenCalledWith("home");
  });

  it("cierra al presionar Escape", () => {
    const onClose = vi.fn();
    render(<CommandPalette isOpen={true} onClose={onClose} groups={groups} />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("navega con ArrowDown y selecciona con Enter", () => {
    const onExecute = vi.fn();
    const onClose = vi.fn();
    render(<CommandPalette isOpen={true} onClose={onClose} groups={groups} onExecute={onExecute} />);
    fireEvent.keyDown(window, { key: "ArrowDown" });
    fireEvent.keyDown(window, { key: "Enter" });
    expect(onExecute).toHaveBeenCalledWith("components");
  });

  it("navega con ArrowUp", () => {
    const onExecute = vi.fn();
    render(<CommandPalette isOpen={true} onClose={vi.fn()} groups={groups} onExecute={onExecute} />);
    fireEvent.keyDown(window, { key: "ArrowDown" });
    fireEvent.keyDown(window, { key: "ArrowDown" });
    fireEvent.keyDown(window, { key: "ArrowUp" });
    fireEvent.keyDown(window, { key: "Enter" });
    expect(onExecute).toHaveBeenCalledWith("components");
  });

  it("cierra al clickear overlay", () => {
    const onClose = vi.fn();
    const { container } = render(<CommandPalette isOpen={true} onClose={onClose} groups={groups} />);
    const overlay = container.querySelector("[class*=overlay]");
    if (overlay) fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it("muestra atajos de teclado", () => {
    render(<CommandPalette isOpen={true} onClose={vi.fn()} groups={groups} />);
    expect(screen.getByText("⌘1")).toBeInTheDocument();
    expect(screen.getByText("⌘2")).toBeInTheDocument();
  });
});
