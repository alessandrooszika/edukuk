import { render, screen, fireEvent, act } from "@testing-library/react";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renderiza children", () => {
    render(<Tooltip content="ayuda"><button>Hover</button></Tooltip>);
    expect(screen.getByText("Hover")).toBeInTheDocument();
  });

  it("no muestra tooltip inicialmente", () => {
    const { container } = render(<Tooltip content="ayuda"><span>target</span></Tooltip>);
    expect(container.firstChild).not.toHaveClass("visible");
  });

  it("muestra tooltip en pointerEnter cuando pointerType es mouse", () => {
    const { container } = render(<Tooltip content="ayuda"><span>target</span></Tooltip>);
    const wrapper = container.firstChild!;
    fireEvent.pointerEnter(wrapper, { pointerType: "mouse" });
    expect(wrapper).toHaveClass("visible");
  });

  it("oculta tooltip en pointerLeave", () => {
    const { container } = render(<Tooltip content="ayuda"><span>target</span></Tooltip>);
    const wrapper = container.firstChild!;
    fireEvent.pointerEnter(wrapper, { pointerType: "mouse" });
    fireEvent.pointerLeave(wrapper);
    expect(wrapper).not.toHaveClass("visible");
  });

  it("muestra tooltip tras 500ms en pointerDown con touch", () => {
    vi.useFakeTimers();
    const { container } = render(<Tooltip content="ayuda"><span>target</span></Tooltip>);
    const wrapper = container.firstChild!;
    fireEvent.pointerDown(wrapper, { pointerType: "touch" });
    expect(wrapper).not.toHaveClass("visible");
    act(() => { vi.advanceTimersByTime(500); });
    expect(wrapper).toHaveClass("visible");
    vi.useRealTimers();
  });

  it("oculta tooltip en pointerUp", () => {
    vi.useFakeTimers();
    const { container } = render(<Tooltip content="ayuda"><span>target</span></Tooltip>);
    const wrapper = container.firstChild!;
    fireEvent.pointerDown(wrapper, { pointerType: "touch" });
    act(() => { vi.advanceTimersByTime(500); });
    fireEvent.pointerUp(wrapper);
    expect(wrapper).not.toHaveClass("visible");
    vi.useRealTimers();
  });

  it("oculta tooltip en pointerCancel", () => {
    vi.useFakeTimers();
    const { container } = render(<Tooltip content="ayuda"><span>target</span></Tooltip>);
    const wrapper = container.firstChild!;
    fireEvent.pointerDown(wrapper, { pointerType: "touch" });
    act(() => { vi.advanceTimersByTime(500); });
    fireEvent.pointerCancel(wrapper);
    expect(wrapper).not.toHaveClass("visible");
    vi.useRealTimers();
  });

  it("aplica clase de posicion", () => {
    const { container } = render(<Tooltip content="ayuda" position="bottom"><span>target</span></Tooltip>);
    expect(container.firstChild).toHaveClass("bottom");
  });

  it("asigna data-tooltip con el contenido", () => {
    const { container } = render(<Tooltip content="texto oculto"><span>target</span></Tooltip>);
    expect(container.firstChild).toHaveAttribute("data-tooltip", "texto oculto");
  });
});
