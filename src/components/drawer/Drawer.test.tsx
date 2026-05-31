import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("no renderiza cuando isOpen=false", () => {
    render(<Drawer isOpen={false} onClose={() => {}}><p>contenido</p></Drawer>);
    expect(screen.queryByText("contenido")).not.toBeInTheDocument();
  });

  it("renderiza cuando isOpen=true", () => {
    render(<Drawer isOpen={true} onClose={() => {}}><p>contenido</p></Drawer>);
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("renderiza titulo", () => {
    render(<Drawer isOpen={true} onClose={() => {}} title="Menu"><p>contenido</p></Drawer>);
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("llama onClose al presionar Escape", async () => {
    const onClose = vi.fn();
    render(<Drawer isOpen={true} onClose={onClose}><p>contenido</p></Drawer>);
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("llama onClose al clickear overlay", async () => {
    const onClose = vi.fn();
    const { container } = render(<Drawer isOpen={true} onClose={onClose}><p>contenido</p></Drawer>);
    const overlay = container.firstChild as HTMLElement;
    await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("no llama onClose al clickear dentro del panel", async () => {
    const onClose = vi.fn();
    render(<Drawer isOpen={true} onClose={onClose}><p>contenido</p></Drawer>);
    await userEvent.click(screen.getByText("contenido"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("cierra con boton de cerrar", async () => {
    const onClose = vi.fn();
    render(<Drawer isOpen={true} onClose={onClose} title="Test"><p>contenido</p></Drawer>);
    await userEvent.click(screen.getByRole("button", { name: "Cerrar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("aplica clase de posicion", () => {
    const { container } = render(<Drawer isOpen={true} onClose={() => {}} position="left"><p>contenido</p></Drawer>);
    const panel = container.querySelector('[role="dialog"]');
    expect(panel).toHaveClass("left");
  });

  it("aplica clase de tamaño", () => {
    const { container } = render(<Drawer isOpen={true} onClose={() => {}} size="sm"><p>contenido</p></Drawer>);
    const panel = container.querySelector('[role="dialog"]');
    expect(panel).toHaveClass("sm");
  });

  it("tiene role='dialog' y aria-modal='true'", () => {
    render(<Drawer isOpen={true} onClose={() => {}}><p>contenido</p></Drawer>);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("bloquea scroll del body cuando esta abierto", () => {
    const { unmount } = render(<Drawer isOpen={true} onClose={() => {}}><p>contenido</p></Drawer>);
    expect(document.documentElement.style.overflow).toBe("hidden");
    unmount();
  });
});
