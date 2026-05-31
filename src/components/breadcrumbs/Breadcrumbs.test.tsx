import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "./Breadcrumbs";

const items = [
  { label: "Inicio", href: "#home" },
  { label: "Componentes", href: "#complementos" },
  { label: "Layout" },
];

describe("Breadcrumbs", () => {
  it("renderiza nav con aria-label", () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole("navigation", { name: "breadcrumb" })).toBeInTheDocument();
  });

  it("renderiza items con link cuando href esta presente", () => {
    render(<Breadcrumbs items={items} />);
    const link = screen.getByText("Inicio").closest("a");
    expect(link).toHaveAttribute("href", "#home");
  });

  it("renderiza ultimo item con aria-current='page'", () => {
    render(<Breadcrumbs items={items} />);
    const last = screen.getByText("Layout");
    expect(last).toHaveAttribute("aria-current", "page");
  });

  it("renderiza separador entre items", () => {
    render(<Breadcrumbs items={items} />);
    const separators = screen.getAllByText("/");
    expect(separators).toHaveLength(items.length - 1);
  });

  it("acepta separador personalizado", () => {
    render(<Breadcrumbs items={items} separator=">" />);
    const separators = screen.getAllByText(">");
    expect(separators).toHaveLength(items.length - 1);
  });

  it("renderiza span sin href cuando no se provee href", () => {
    const noHrefItems = [{ label: "Sin link" }, { label: "Ultimo" }];
    render(<Breadcrumbs items={noHrefItems} />);
    const span = screen.getByText("Sin link");
    expect(span.tagName).toBe("SPAN");
  });

  it("aplica className al nav", () => {
    const { container } = render(<Breadcrumbs items={items} className="custom" />);
    expect(container.querySelector("nav")?.className).toContain("custom");
  });
});
