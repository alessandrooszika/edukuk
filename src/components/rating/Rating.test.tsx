import { render, screen, fireEvent } from "@testing-library/react";
import { Rating } from "./Rating";

describe("Rating", () => {
  it("renderiza 5 estrellas por defecto", () => {
    const { container } = render(<Rating value={0} />);
    expect(container.querySelectorAll("[class*=star]")).toHaveLength(5);
  });

  it("rellena segun value", () => {
    const { container } = render(<Rating value={3} />);
    const stars = container.querySelectorAll("[class*=star]");
    expect(stars[0].className).toContain("filled");
    expect(stars[2].className).toContain("filled");
    expect(stars[3].className).not.toContain("filled");
  });

  it("tiene role radiogroup por defecto", () => {
    render(<Rating value={0} />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("tiene role img cuando readOnly", () => {
    render(<Rating value={3} readOnly />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("tiene aria-label descriptivo en readOnly", () => {
    render(<Rating value={3} readOnly />);
    expect(screen.getByRole("img")).toHaveAttribute("aria-label", "3 de 5 estrellas");
  });

  it("llama onChange al clickear estrella", () => {
    const onChange = vi.fn();
    render(<Rating value={0} onChange={onChange} />);
    const stars = screen.getAllByRole("radio");
    fireEvent.click(stars[2]);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("no llama onChange en readOnly", () => {
    const onChange = vi.fn();
    const { container } = render(<Rating value={3} readOnly onChange={onChange} />);
    const stars = container.querySelectorAll("[class*=star]");
    fireEvent.click(stars[0]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("navega con teclado derecha", () => {
    const onChange = vi.fn();
    render(<Rating value={2} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("radiogroup"), { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("navega con teclado izquierda", () => {
    const onChange = vi.fn();
    render(<Rating value={3} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("radiogroup"), { key: "ArrowLeft" });
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("no navega con teclado si readOnly", () => {
    const onChange = vi.fn();
    render(<Rating value={3} readOnly onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("img"), { key: "ArrowRight" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("no navega mas alla del count", () => {
    const onChange = vi.fn();
    render(<Rating value={5} onChange={onChange} count={5} />);
    fireEvent.keyDown(screen.getByRole("radiogroup"), { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it("destaca estrellas al hacer hover", () => {
    const { container } = render(<Rating value={1} onChange={() => {}} />);
    const stars = container.querySelectorAll("[class*=star]");
    fireEvent.pointerEnter(stars[3]);
    expect(stars[0].className).toContain("filled");
    expect(stars[3].className).toContain("filled");
    expect(stars[4].className).not.toContain("filled");
  });

  it("restaura filled al salir del hover", () => {
    const { container } = render(<Rating value={1} onChange={() => {}} />);
    const stars = container.querySelectorAll("[class*=star]");
    fireEvent.pointerEnter(stars[3]);
    fireEvent.pointerLeave(container.firstChild!);
    expect(stars[0].className).toContain("filled");
    expect(stars[1].className).not.toContain("filled");
  });

  it("no tiene hover en readOnly", () => {
    const { container } = render(<Rating value={3} readOnly />);
    const stars = container.querySelectorAll("[class*=star]");
    expect(stars[0]).not.toHaveAttribute("onPointerEnter");
  });
});
