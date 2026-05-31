import { render, screen } from "@testing-library/react";
import { Timeline } from "./Timeline";

const items = [
  { title: "Evento 1", description: "Desc 1", time: "2024" },
  { title: "Evento 2", description: "Desc 2", time: "2025", color: "success" as const, icon: <span>★</span> },
];

describe("Timeline", () => {
  it("renderiza todos los items", () => {
    render(<Timeline items={items} />);
    expect(screen.getByText("Evento 1")).toBeInTheDocument();
    expect(screen.getByText("Evento 2")).toBeInTheDocument();
  });

  it("renderiza descripcion", () => {
    render(<Timeline items={items} />);
    expect(screen.getByText("Desc 1")).toBeInTheDocument();
  });

  it("renderiza tiempo", () => {
    render(<Timeline items={items} />);
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renderiza icono", () => {
    render(<Timeline items={items} />);
    expect(screen.getByText("★")).toBeInTheDocument();
  });

  it("aplica clase de color", () => {
    const { container } = render(<Timeline items={items} />);
    const itemsElements = container.querySelectorAll("[class*=item]");
    expect(itemsElements[1].className).toContain("success");
  });

  it("no renderiza tiempo si no se provee", () => {
    const sinTiempo = [{ title: "Solo", description: "Test" }];
    const { container } = render(<Timeline items={sinTiempo} />);
    expect(container.querySelector(".time")).toBeNull();
  });

  it("no renderiza descripcion si no se provee", () => {
    const sinDesc = [{ title: "Solo" }];
    const { container } = render(<Timeline items={sinDesc} />);
    expect(container.querySelector(".description")).toBeNull();
  });
});
