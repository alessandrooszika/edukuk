import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("no renderiza nada cuando isOpen=false", () => {
    render(<Alert isOpen={false} onClose={() => {}} message="Error" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renderiza cuando isOpen=true", () => {
    render(<Alert isOpen={true} onClose={() => {}} message="Error" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("muestra message", () => {
    render(<Alert isOpen={true} onClose={() => {}} message="Algo salio mal" />);
    expect(screen.getByText("Algo salio mal")).toBeInTheDocument();
  });

  it("muestra description cuando se provee", () => {
    render(<Alert isOpen={true} onClose={() => {}} message="Error" description="Detalle" />);
    expect(screen.getByText("Detalle")).toBeInTheDocument();
  });

  it("llama onClose al hacer clic en cerrar", async () => {
    const onClose = vi.fn();
    render(<Alert isOpen={true} onClose={onClose} message="Error" />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("tiene aria-label Cerrar en boton de cerrar", () => {
    render(<Alert isOpen={true} onClose={() => {}} message="Error" />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Cerrar");
  });

  it("no muestra boton cerrar si closable=false", () => {
    render(<Alert isOpen={true} onClose={() => {}} message="Error" closable={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("llama onClose automaticamente tras duration", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Alert isOpen={true} onClose={onClose} message="Error" duration={3000} />);
    expect(onClose).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(3000); });
    expect(onClose).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it("no llama timer si duration <= 0", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Alert isOpen={true} onClose={onClose} message="Error" duration={0} />);
    act(() => { vi.advanceTimersByTime(5000); });
    expect(onClose).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("aplica clase de variant", () => {
    render(<Alert isOpen={true} onClose={() => {}} message="Info" variant="success" />);
    expect(screen.getByRole("alert").className).toContain("success");
  });

  it("aplica clase de position", () => {
    render(<Alert isOpen={true} onClose={() => {}} message="Test" position="bottom-left" />);
    expect(screen.getByRole("alert").className).toContain("bottomleft");
  });
});
