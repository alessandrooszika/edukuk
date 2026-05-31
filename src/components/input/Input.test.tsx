import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("renderiza un input", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("muestra label cuando se provee", () => {
    render(<Input label="Nombre" />);
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
  });

  it("asocia label con input via htmlFor/id", () => {
    render(<Input label="Email" id="my-email" />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("id", "my-email");
  });

  it("muestra placeholder", () => {
    render(<Input placeholder="Escribe..." />);
    expect(screen.getByPlaceholderText("Escribe...")).toBeInTheDocument();
  });

  it("aplica variant class", () => {
    render(<Input variant="success" />);
    expect(screen.getByRole("textbox").parentElement?.className).toContain("success");
  });

  it("aplica size class", () => {
    render(<Input size="lg" />);
    expect(screen.getByRole("textbox").parentElement?.className).toContain("lg");
  });

  it("muestra error y marca aria-invalid", () => {
    render(<Input error="Campo obligatorio" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Campo obligatorio");
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("llama onChange al escribir", async () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("pasa ref via forwardRef", () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("aplica className al wrapper", () => {
    const { container } = render(<Input className="extra" />);
    expect((container.firstChild as HTMLElement).className).toContain("extra");
  });

  it("deshabilitado no permite interaccion", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("aplica design class al field", () => {
    render(<Input design="filled" />);
    expect(screen.getByRole("textbox").parentElement?.className).toContain("filled");
  });

  it("label flota cuando hay valor", () => {
    render(<Input label="Nombre" value="Juan" onChange={() => {}} />);
    expect(screen.getByText("Nombre").className).toContain("float");
  });

  it("label no flota sin valor ni focus", () => {
    render(<Input label="Nombre" value="" onChange={() => {}} />);
    expect(screen.getByText("Nombre").className).not.toContain("float");
  });
});
