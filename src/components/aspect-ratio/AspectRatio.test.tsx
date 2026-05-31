import { render } from "@testing-library/react";
import { AspectRatio } from "./AspectRatio";

describe("AspectRatio", () => {
  it("renderiza children", () => {
    const { container } = render(<AspectRatio><span>hola</span></AspectRatio>);
    expect(container.textContent).toBe("hola");
  });

  it("aplica aspect-ratio por defecto 16/9", () => {
    const { container } = render(<AspectRatio><span>test</span></AspectRatio>);
    expect(container.firstChild).toHaveStyle("aspect-ratio: 1.7777777777777777");
  });

  it("aplica aspect-ratio personalizado", () => {
    const { container } = render(<AspectRatio ratio={4 / 3}><span>test</span></AspectRatio>);
    expect(container.firstChild).toHaveStyle("aspect-ratio: 1.3333333333333333");
  });

  it("aplica maxWidth en px cuando es number", () => {
    const { container } = render(<AspectRatio maxWidth={400}><span>test</span></AspectRatio>);
    expect(container.firstChild).toHaveStyle("max-width: 400px");
  });

  it("aplica maxWidth como string", () => {
    const { container } = render(<AspectRatio maxWidth="50%" ><span>test</span></AspectRatio>);
    expect(container.firstChild).toHaveStyle("max-width: 50%");
  });

  it("aplica className adicional", () => {
    const { container } = render(<AspectRatio className="custom"><span>test</span></AspectRatio>);
    expect(container.firstChild).toHaveClass("custom");
  });

  it("tiene inner div para children", () => {
    const { container } = render(<AspectRatio><span>test</span></AspectRatio>);
    expect(container.firstChild?.firstChild).toHaveClass("inner");
  });
});
