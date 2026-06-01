import { render, screen, fireEvent } from "@testing-library/react";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  it("renderiza children", () => {
    render(<Sidebar isOpen={true} onToggle={vi.fn()}><div>Contenido</div></Sidebar>);
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

  it("tiene boton toggle", () => {
    render(<Sidebar isOpen={true} onToggle={vi.fn()}><div>C</div></Sidebar>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("llama onToggle al clickear boton", () => {
    const onToggle = vi.fn();
    render(<Sidebar isOpen={true} onToggle={onToggle}><div>C</div></Sidebar>);
    fireEvent.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalled();
  });

  it("tiene clase left por defecto", () => {
    const { container } = render(<Sidebar isOpen={true} onToggle={vi.fn()}><div>C</div></Sidebar>);
    expect(container.firstChild).toHaveClass("left");
  });

  it("tiene clase right cuando side=right", () => {
    const { container } = render(<Sidebar isOpen={true} onToggle={vi.fn()} side="right"><div>C</div></Sidebar>);
    expect(container.firstChild).toHaveClass("right");
  });

  it("tiene clase open cuando isOpen=true", () => {
    const { container } = render(<Sidebar isOpen={true} onToggle={vi.fn()}><div>C</div></Sidebar>);
    expect(container.firstChild).toHaveClass("open");
  });

  it("tiene clase closed cuando isOpen=false", () => {
    const { container } = render(<Sidebar isOpen={false} onToggle={vi.fn()}><div>C</div></Sidebar>);
    expect(container.firstChild).toHaveClass("closed");
  });

  it("aplica className", () => {
    const { container } = render(<Sidebar isOpen={true} onToggle={vi.fn()} className="custom"><div>C</div></Sidebar>);
    expect(container.firstChild).toHaveClass("custom");
  });
});
