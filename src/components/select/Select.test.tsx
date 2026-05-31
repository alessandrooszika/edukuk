import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";

const options = ["React", "Vue", "Svelte"];

describe("Select", () => {
  it("renderiza trigger con placeholder", () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    expect(screen.getByRole("button")).toHaveTextContent("Seleccionar...");
  });

  it("no muestra dropdown inicialmente", () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("abre dropdown al hacer clic", async () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("muestra opciones en el dropdown", async () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    await userEvent.click(screen.getByRole("button"));
    const listbox = screen.getByRole("listbox");
    const opts = within(listbox).getAllByRole("option");
    expect(opts).toHaveLength(3);
    expect(opts[0]).toHaveTextContent("React");
    expect(opts[1]).toHaveTextContent("Vue");
    expect(opts[2]).toHaveTextContent("Svelte");
  });

  it("selecciona opcion al hacer clic", async () => {
    const onChange = vi.fn();
    render(<Select options={options} value="" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("Vue"));
    expect(onChange).toHaveBeenCalledWith("Vue");
  });

  it("cierra dropdown tras seleccionar", async () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("Vue"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("muestra el valor seleccionado en el trigger", () => {
    render(<Select options={options} value="Vue" onChange={() => {}} />);
    expect(screen.getByRole("button")).toHaveTextContent("Vue");
  });

  it("abre con Enter en el trigger", async () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    screen.getByRole("button").focus();
    await userEvent.keyboard("{Enter}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("cierra con Escape", async () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("selecciona opcion por defecto con Enter", async () => {
    const onChange = vi.fn();
    render(<Select options={options} value="" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button"));
    const listbox = screen.getByRole("listbox");
    fireEvent.keyDown(listbox, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("React");
  });

  it("navega con flecha abajo", async () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    await userEvent.click(screen.getByRole("button"));
    const listbox = screen.getByRole("listbox");
    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    const opts = within(listbox).getAllByRole("option");
    expect(opts[1].className).toContain("optionHighlighted");
    expect(opts[0].className).not.toContain("optionHighlighted");
  });

  it("cierra al hacer clic fuera", async () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.click(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("tiene aria-haspopup y aria-expanded", async () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-haspopup", "listbox");
    expect(btn).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  it("muestra label cuando se provee", () => {
    render(<Select options={options} value="" onChange={() => {}} label="Framework" />);
    expect(screen.getByText("Framework")).toBeInTheDocument();
  });

  it("muestra error", () => {
    render(<Select options={options} value="" onChange={() => {}} error="Campo requerido" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Campo requerido");
  });

  it("no abre si esta disabled", async () => {
    render(<Select options={options} value="" onChange={() => {}} disabled />);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("normaliza opciones string", () => {
    render(<Select options={["A", "B"]} value="" onChange={() => {}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("cierra dropdown al hacer clic en el trigger otra vez", async () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    const btn = screen.getByRole("button");
    await userEvent.click(btn);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.click(btn);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
