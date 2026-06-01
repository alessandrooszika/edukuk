import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("no renderiza cuando isOpen=false", () => {
    render(<Modal isOpen={false} onClose={() => {}}><p>contenido</p></Modal>);
    expect(screen.queryByText("contenido")).not.toBeInTheDocument();
  });

  it("renderiza cuando isOpen=true", () => {
    render(<Modal isOpen={true} onClose={() => {}}><p>contenido</p></Modal>);
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("renderiza titulo", () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Confirmar"><p>ok</p></Modal>);
    expect(screen.getByText("Confirmar")).toBeInTheDocument();
  });

  it("renderiza footer", () => {
    render(<Modal isOpen={true} onClose={() => {}} footer={<button>Aceptar</button>}><p>ok</p></Modal>);
    expect(screen.getByText("Aceptar")).toBeInTheDocument();
  });

  it("llama onClose al presionar Escape", async () => {
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose}><p>contenido</p></Modal>);
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("llama onClose al clickear overlay", async () => {
    const onClose = vi.fn();
    const { container } = render(<Modal isOpen={true} onClose={onClose} title="Test"><p>contenido</p></Modal>);
    const overlay = container.firstChild as HTMLElement;
    await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("no llama onClose al clickear dentro del modal", async () => {
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose}><p>contenido</p></Modal>);
    await userEvent.click(screen.getByText("contenido"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("no cierra al clickear overlay cuando closeOnOverlay=false", async () => {
    const onClose = vi.fn();
    const { container } = render(<Modal isOpen={true} onClose={onClose} closeOnOverlay={false}><p>contenido</p></Modal>);
    const overlay = container.firstChild as HTMLElement;
    await userEvent.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("cierra con boton de cerrar", async () => {
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose} title="Test"><p>contenido</p></Modal>);
    await userEvent.click(screen.getByRole("button", { name: "complementos.modal_close_aria" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("oculta boton de cerrar cuando showCloseButton=false", () => {
    render(<Modal isOpen={true} onClose={() => {}} showCloseButton={false} title="Test"><p>contenido</p></Modal>);
    expect(screen.queryByRole("button", { name: "complementos.modal_close_aria" })).not.toBeInTheDocument();
  });

  it("tiene role='dialog' y aria-modal='true'", () => {
    render(<Modal isOpen={true} onClose={() => {}}><p>contenido</p></Modal>);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });
});
