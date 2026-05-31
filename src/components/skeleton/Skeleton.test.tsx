import { render } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("tiene aria-hidden=true", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("renderiza un elemento por defecto", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelectorAll('[class*="skeleton"]')).toHaveLength(1);
  });

  it("renderiza count elementos", () => {
    const { container } = render(<Skeleton count={5} />);
    expect(container.querySelectorAll('[class*="skeleton"]')).toHaveLength(5);
  });

  it("aplica clase text por defecto", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector('[class*="skeleton"]')!.className).toContain("text");
  });

  it("aplica clase circle", () => {
    const { container } = render(<Skeleton variant="circle" />);
    expect(container.querySelector('[class*="skeleton"]')!.className).toContain("circle");
  });

  it("aplica clase rect", () => {
    const { container } = render(<Skeleton variant="rect" />);
    expect(container.querySelector('[class*="skeleton"]')!.className).toContain("rect");
  });

  it("aplica width inline", () => {
    const { container } = render(<Skeleton width="50px" />);
    expect(container.querySelector('[class*="skeleton"]')).toHaveStyle("width: 50px");
  });

  it("aplica height inline", () => {
    const { container } = render(<Skeleton height="100px" />);
    expect(container.querySelector('[class*="skeleton"]')).toHaveStyle("height: 100px");
  });

  it("usa valor por defecto para circle sin width", () => {
    const { container } = render(<Skeleton variant="circle" height="3em" />);
    expect(container.querySelector('[class*="skeleton"]')).toHaveStyle("width: 3em");
  });

  it("aplica className adicional al grupo", () => {
    const { container } = render(<Skeleton className="extra" />);
    expect(container.firstElementChild!.className).toContain("extra");
  });
});
