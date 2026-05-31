import { render, screen } from "@testing-library/react";
import { LogoWatermark } from "./LogoWatermark";

describe("LogoWatermark", () => {
  it("renderiza texto edukuk", () => {
    render(<LogoWatermark />);
    expect(screen.getByText("edukuk")).toBeInTheDocument();
  });

  it("renderiza imagen con width y height por defecto", () => {
    const { container } = render(<LogoWatermark />);
    const img = container.querySelector("img")!;
    expect(img).toHaveAttribute("width", "24");
    expect(img).toHaveAttribute("height", "24");
  });

  it("aplica size personalizado", () => {
    const { container } = render(<LogoWatermark size={48} />);
    const img = container.querySelector("img")!;
    expect(img).toHaveAttribute("width", "48");
    expect(img).toHaveAttribute("height", "48");
  });
});
