import { render, screen } from "@testing-library/react";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renderiza hr horizontal por defecto", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector("hr")).toBeInTheDocument();
  });

  it("tiene role separator", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("aria-orientation horizontal por defecto", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("renderiza span vertical con aria-orientation", () => {
    const { container } = render(<Divider orientation="vertical" />);
    expect(container.querySelector("span")).toBeInTheDocument();
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("renderiza con label en modo horizontal", () => {
    render(<Divider label="Sección" />);
    expect(screen.getByText("Sección")).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("aplica size class", () => {
    const { container } = render(<Divider size="lg" />);
    expect(container.querySelector("hr")).toHaveClass("lg");
  });

  it("aplica variant class", () => {
    const { container } = render(<Divider variant="danger" />);
    expect(container.querySelector("hr")).toHaveClass("danger");
  });
});
