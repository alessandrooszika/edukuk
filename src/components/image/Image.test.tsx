import { render, screen } from "@testing-library/react";
import { Image } from "./Image";

describe("Image", () => {
  it("renderiza img con src y alt", () => {
    render(<Image src="/foto.jpg" alt="Foto" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/foto.jpg");
    expect(img).toHaveAttribute("alt", "Foto");
  });

  it("renderiza caption cuando se provee", () => {
    render(<Image src="/foto.jpg" alt="Foto" caption="Paisaje" />);
    expect(screen.getByText("Paisaje")).toBeInTheDocument();
  });

  it("usa figure como wrapper", () => {
    const { container } = render(<Image src="/foto.jpg" alt="Foto" />);
    expect(container.querySelector("figure")).toBeInTheDocument();
  });

  it("usa figcaption para el caption", () => {
    render(<Image src="/foto.jpg" alt="Foto" caption="Test" />);
    expect(screen.getByText("Test").tagName).toBe("FIGCAPTION");
  });

  it("no renderiza caption si no se provee", () => {
    const { container } = render(<Image src="/foto.jpg" alt="Foto" />);
    expect(container.querySelector("figcaption")).toBeNull();
  });
});
