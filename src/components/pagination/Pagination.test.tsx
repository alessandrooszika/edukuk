import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renderiza nav con aria-label", () => {
    render(<Pagination current={1} total={5} onChange={() => {}} />);
    expect(screen.getByRole("navigation", { name: "pagination" })).toBeInTheDocument();
  });

  it("muestra botones de pagina", () => {
    render(<Pagination current={1} total={3} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Página 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Página 2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Página 3" })).toBeInTheDocument();
  });

  it("marca pagina actual con aria-current='page'", () => {
    render(<Pagination current={2} total={3} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Página 2" })).toHaveAttribute("aria-current", "page");
  });

  it("deshabilita boton anterior en primera pagina", () => {
    render(<Pagination current={1} total={5} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Página anterior" })).toBeDisabled();
  });

  it("deshabilita boton siguiente en ultima pagina", () => {
    render(<Pagination current={5} total={5} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Página siguiente" })).toBeDisabled();
  });

  it("llama onChange al hacer click en pagina", async () => {
    const onChange = vi.fn();
    render(<Pagination current={1} total={3} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Página 2" }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("llama onChange al hacer click en anterior", async () => {
    const onChange = vi.fn();
    render(<Pagination current={2} total={3} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Página anterior" }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("llama onChange al hacer click en siguiente", async () => {
    const onChange = vi.fn();
    render(<Pagination current={2} total={3} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Página siguiente" }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("no renderiza cuando total es menor a 2", () => {
    const { container } = render(<Pagination current={1} total={1} onChange={() => {}} />);
    expect(container.innerHTML).toBe("");
  });

  it("muestra elipsis con aria-hidden para paginacion larga", () => {
    render(<Pagination current={5} total={10} onChange={() => {}} />);
    const ellipsis = screen.getAllByText("…");
    expect(ellipsis.length).toBeGreaterThan(0);
    ellipsis.forEach((el) => {
      expect(el).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("aplica className al nav", () => {
    const { container } = render(<Pagination current={1} total={3} onChange={() => {}} className="custom" />);
    expect(container.querySelector("nav")).toHaveClass("custom");
  });
});
