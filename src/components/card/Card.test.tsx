import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import { CardHeader } from "./CardHeader";
import { CardBody } from "./CardBody";
import { CardFooter } from "./CardFooter";

describe("Card", () => {
  it("renderiza children", () => {
    render(<Card><p>contenido</p></Card>);
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("aplica clase card por defecto", () => {
    const { container } = render(<Card><p>test</p></Card>);
    expect(container.firstChild).toHaveClass("card");
  });

  it("aplica clase de variante cuando no es default", () => {
    const { container } = render(<Card variant="info"><p>test</p></Card>);
    expect(container.firstChild).toHaveClass("info");
  });

  it("no aplica clase de variante para default", () => {
    const { container } = render(<Card><p>test</p></Card>);
    expect(container.firstChild).not.toHaveClass("default");
  });

  it("aplica className adicional", () => {
    const { container } = render(<Card className="custom"><p>test</p></Card>);
    expect(container.firstChild).toHaveClass("custom");
  });
});

describe("CardHeader", () => {
  it("renderiza children", () => {
    render(<CardHeader><h2>Titulo</h2></CardHeader>);
    expect(screen.getByText("Titulo")).toBeInTheDocument();
  });
});

describe("CardBody", () => {
  it("renderiza children", () => {
    render(<CardBody><p>cuerpo</p></CardBody>);
    expect(screen.getByText("cuerpo")).toBeInTheDocument();
  });
});

describe("CardFooter", () => {
  it("renderiza children", () => {
    render(<CardFooter><footer>pie</footer></CardFooter>);
    expect(screen.getByText("pie")).toBeInTheDocument();
  });
});
