import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renderiza children", () => {
    render(<Badge>Nuevo</Badge>);
    expect(screen.getByText("Nuevo")).toBeInTheDocument();
  });

  it("usa clase badge por defecto", () => {
    render(<Badge>Badge</Badge>);
    expect(screen.getByText("Badge").className).toContain("badge");
  });

  it("usa clase standalone cuando standalone=true", () => {
    render(<Badge standalone>Standalone</Badge>);
    const el = screen.getByText("Standalone");
    expect(el.className).toContain("standalone");
    expect(el.className).not.toContain("badge");
  });

  it("aplica clase de variant", () => {
    render(<Badge variant="success">Ok</Badge>);
    expect(screen.getByText("Ok").className).toContain("success");
  });

  it("aplica clase de size", () => {
    render(<Badge size="lg">Grande</Badge>);
    expect(screen.getByText("Grande").className).toContain("lg");
  });

  it("aplica className adicional", () => {
    render(<Badge className="extra">Extra</Badge>);
    expect(screen.getByText("Extra").className).toContain("extra");
  });
});
