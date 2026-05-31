import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("renderiza input de tipo search", () => {
    render(<SearchInput />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("tiene role search en wrapper", () => {
    const { container } = render(<SearchInput />);
    expect(container.firstChild).toHaveAttribute("role", "search");
  });

  it("muestra label cuando se provee", () => {
    render(<SearchInput label="Buscar" />);
    expect(screen.getByLabelText("Buscar")).toBeInTheDocument();
  });

  it("muestra error y role alert", () => {
    render(<SearchInput error="Error de búsqueda" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Error de búsqueda");
  });

  it("muestra boton clear cuando hay valor", () => {
    render(<SearchInput value="texto" onChange={() => {}} />);
    expect(screen.getByLabelText("Limpiar búsqueda")).toBeInTheDocument();
  });

  it("no muestra boton clear sin valor", () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.queryByLabelText("Limpiar búsqueda")).toBeNull();
  });

  it("llama onClear al clickear clear", async () => {
    const onClear = vi.fn();
    render(<SearchInput value="texto" onChange={() => {}} onClear={onClear} />);
    await userEvent.click(screen.getByLabelText("Limpiar búsqueda"));
    expect(onClear).toHaveBeenCalled();
  });
});
