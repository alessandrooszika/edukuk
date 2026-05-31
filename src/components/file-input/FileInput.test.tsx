import { render, screen } from "@testing-library/react";
import { FileInput } from "./FileInput";

describe("FileInput", () => {
  it("renderiza dropzone", () => {
    render(<FileInput />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("muestra label", () => {
    render(<FileInput label="Documentos" />);
    expect(screen.getByText("Documentos")).toBeInTheDocument();
  });

  it("muestra error y role alert", () => {
    render(<FileInput error="Archivo muy grande" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Archivo muy grande");
  });

  it("muestra archivos desde value", () => {
    render(<FileInput value={[{ name: "doc.pdf", size: 1024 }]} />);
    expect(screen.getByText("doc.pdf")).toBeInTheDocument();
    expect(screen.getByText("1.0 KB")).toBeInTheDocument();
  });

  it("muestra archivos multiples desde value", () => {
    render(<FileInput value={[{ name: "a.pdf", size: 500 }, { name: "b.jpg", size: 2048 }]} multiple />);
    expect(screen.getByText("a.pdf")).toBeInTheDocument();
    expect(screen.getByText("b.jpg")).toBeInTheDocument();
  });

  it("renderiza children como contenido del dropzone", () => {
    render(<FileInput><span>Zona personalizada</span></FileInput>);
    expect(screen.getByText("Zona personalizada")).toBeInTheDocument();
  });

  it("formatea tamaños correctamente", () => {
    render(<FileInput value={[{ name: "f.pdf", size: 1024 * 1024 * 2 }]} />);
    expect(screen.getByText("2.0 MB")).toBeInTheDocument();
  });

  it("tiene aria-label", () => {
    render(<FileInput label="Docs" />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Seleccionar archivo: Docs");
  });

  it("renderiza hint por defecto", () => {
    render(<FileInput />);
    expect(screen.getByText(/Presioná|Hacé clic/)).toBeInTheDocument();
  });
});
