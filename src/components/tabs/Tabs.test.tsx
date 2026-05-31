import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "./Tabs";

const tabs = [
  { label: "Uno", content: <p>Contenido uno</p> },
  { label: "Dos", content: <p>Contenido dos</p> },
  { label: "Tres", content: <p>Contenido tres</p> },
];

describe("Tabs", () => {
  it("renderiza todos los tabs", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole("tab", { name: "Uno" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Dos" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tres" })).toBeInTheDocument();
  });

  it("muestra el contenido del primer tab por defecto", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText("Contenido uno")).toBeInTheDocument();
    expect(screen.queryByText("Contenido dos")).not.toBeInTheDocument();
  });

  it("cambia contenido al hacer clic en otro tab", async () => {
    render(<Tabs tabs={tabs} />);
    await userEvent.click(screen.getByRole("tab", { name: "Dos" }));
    expect(screen.getByText("Contenido dos")).toBeInTheDocument();
    expect(screen.queryByText("Contenido uno")).not.toBeInTheDocument();
  });

  it("marca el tab activo con aria-selected=true", () => {
    render(<Tabs tabs={tabs} defaultIndex={1} />);
    expect(screen.getByRole("tab", { name: "Dos" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Uno" })).toHaveAttribute("aria-selected", "false");
  });

  it("navega con flecha derecha", () => {
    render(<Tabs tabs={tabs} />);
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
    expect(screen.getByText("Contenido dos")).toBeInTheDocument();
  });

  it("navega con flecha izquierda", () => {
    render(<Tabs tabs={tabs} defaultIndex={1} />);
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowLeft" });
    expect(screen.getByText("Contenido uno")).toBeInTheDocument();
  });

  it("navega al inicio con Home", () => {
    render(<Tabs tabs={tabs} defaultIndex={2} />);
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "Home" });
    expect(screen.getByText("Contenido uno")).toBeInTheDocument();
  });

  it("navega al final con End", () => {
    render(<Tabs tabs={tabs} />);
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "End" });
    expect(screen.getByText("Contenido tres")).toBeInTheDocument();
  });

  it("wraps al final con flecha izquierda en el primero", () => {
    render(<Tabs tabs={tabs} />);
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowLeft" });
    expect(screen.getByText("Contenido tres")).toBeInTheDocument();
  });

  it("wraps al inicio con flecha derecha en el ultimo", () => {
    render(<Tabs tabs={tabs} defaultIndex={2} />);
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
    expect(screen.getByText("Contenido uno")).toBeInTheDocument();
  });

  it("llama onChange con el indice correcto", async () => {
    const onChange = vi.fn();
    render(<Tabs tabs={tabs} onChange={onChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Dos" }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("respeta defaultIndex", () => {
    render(<Tabs tabs={tabs} defaultIndex={2} />);
    expect(screen.getByText("Contenido tres")).toBeInTheDocument();
  });

  it("aplica variant class", () => {
    render(<Tabs tabs={tabs} variant="info" />);
    expect(screen.getByRole("tablist").className).toContain("info");
  });
});
