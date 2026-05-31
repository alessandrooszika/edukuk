import { render, screen } from "@testing-library/react";
import { Accordion } from "./Accordion";

describe("Accordion", () => {
  const items = [
    { question: "¿Qué es React?", answer: "Una biblioteca de UI" },
    { question: "¿Qué es TypeScript?", answer: "Un superset de JS" },
  ];

  it("renderiza todos los items", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("¿Qué es React?")).toBeInTheDocument();
    expect(screen.getByText("¿Qué es TypeScript?")).toBeInTheDocument();
  });

  it("usa elementos details/summary", () => {
    const { container } = render(<Accordion items={items} />);
    const details = container.querySelectorAll("details");
    expect(details).toHaveLength(2);
    expect(details[0].querySelector("summary")).toHaveTextContent("¿Qué es React?");
  });

  it("muestra la respuesta dentro del details", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("Una biblioteca de UI")).toBeInTheDocument();
  });
});
