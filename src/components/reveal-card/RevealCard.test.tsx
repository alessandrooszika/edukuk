import { render, screen } from "@testing-library/react";
import { RevealCard } from "./RevealCard";

vi.mock("../../hooks/useReveal", () => ({
  useReveal: () => ({ ref: { current: null }, revealed: true }),
}));

describe("RevealCard", () => {
  it("renderiza children", () => {
    render(<RevealCard><p>Contenido</p></RevealCard>);
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

  it("aplica opacidad 1 cuando está revelado", () => {
    const { container } = render(<RevealCard><p>Test</p></RevealCard>);
    const div = container.firstChild as HTMLElement;
    expect(div.style.opacity).toBe("1");
  });

  it("aplica translateY(0) cuando está revelado", () => {
    const { container } = render(<RevealCard><p>Test</p></RevealCard>);
    const div = container.firstChild as HTMLElement;
    expect(div.style.transform).toBe("translateY(0)");
  });
});
