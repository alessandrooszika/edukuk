import { useState } from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Autocomplete } from "./Autocomplete";

const options = ["JavaScript", "TypeScript", "Python", "Java", "Rust"];

function TestAutocomplete(props: Partial<React.ComponentProps<typeof Autocomplete>>) {
  const [value, setValue] = useState(props.value ?? "");
  return (
    <Autocomplete
      options={props.options ?? options}
      value={value}
      onChange={(v) => { setValue(v); props.onChange?.(v); }}
      {...props}
    />
  );
}

describe("Autocomplete", () => {
  it("renderiza un input con role combobox", () => {
    render(<TestAutocomplete />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("no muestra dropdown inicialmente", () => {
    render(<TestAutocomplete />);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("abre dropdown al escribir", async () => {
    render(<TestAutocomplete />);
    await userEvent.type(screen.getByRole("combobox"), "J");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("filtra opciones mientras se escribe", async () => {
    render(<TestAutocomplete />);
    await userEvent.type(screen.getByRole("combobox"), "Ja");
    const listbox = screen.getByRole("listbox");
    expect(within(listbox).getByText("JavaScript")).toBeInTheDocument();
    expect(within(listbox).queryByText("Rust")).not.toBeInTheDocument();
  });

  it("selecciona opcion al hacer clic", async () => {
    const onChange = vi.fn();
    render(<TestAutocomplete onChange={onChange} />);
    await userEvent.type(screen.getByRole("combobox"), "J");
    await userEvent.click(screen.getByText("JavaScript"));
    expect(onChange).toHaveBeenCalledWith("JavaScript");
  });

  it("seleccion resalta opcion en dropdown", async () => {
    render(<TestAutocomplete />);
    await userEvent.type(screen.getByRole("combobox"), "J");
    await userEvent.click(screen.getByText("JavaScript"));
    const listbox = screen.getByRole("listbox");
    expect(within(listbox).getByText("JavaScript")).toHaveAttribute("aria-selected", "true");
  });

  it("selecciona opcion con Enter", async () => {
    const onChange = vi.fn();
    render(<TestAutocomplete onChange={onChange} />);
    const input = screen.getByRole("combobox");
    await userEvent.type(input, "J");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("JavaScript");
  });

  it("navega con ArrowDown y ArrowUp", async () => {
    render(<TestAutocomplete />);
    const input = screen.getByRole("combobox");
    await userEvent.type(input, "J");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    const listbox = screen.getByRole("listbox");
    const opts = within(listbox).getAllByRole("option");
    expect(opts[1].className).toContain("optionHighlighted");
  });

  it("cierra con Escape", async () => {
    render(<TestAutocomplete />);
    const input = screen.getByRole("combobox");
    await userEvent.type(input, "J");
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("muestra Sin resultados cuando no hay coincidencias", async () => {
    render(<TestAutocomplete />);
    const input = screen.getByRole("combobox");
    await userEvent.type(input, "zzz");
    expect(screen.getByText("Sin resultados")).toBeInTheDocument();
  });

  it("tiene aria-expanded y aria-controls", async () => {
    render(<TestAutocomplete />);
    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-expanded", "false");
    await userEvent.type(input, "J");
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(input).toHaveAttribute("aria-controls");
  });

  it("tiene aria-activedescendant cuando hay highlight", async () => {
    render(<TestAutocomplete />);
    const input = screen.getByRole("combobox");
    await userEvent.type(input, "J");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveAttribute("aria-activedescendant");
  });

  it("no abre si esta disabled", async () => {
    render(<TestAutocomplete disabled />);
    const input = screen.getByRole("combobox");
    expect(input).toBeDisabled();
    await userEvent.type(input, "J");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("cierra al hacer clic fuera", async () => {
    render(<TestAutocomplete />);
    await userEvent.type(screen.getByRole("combobox"), "J");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.click(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("abre con ArrowDown desde el input", async () => {
    render(<TestAutocomplete value="J" onChange={() => {}} />);
    const input = screen.getByRole("combobox");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("filtra case-insensitive", async () => {
    render(<TestAutocomplete />);
    await userEvent.type(screen.getByRole("combobox"), "typescript");
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
