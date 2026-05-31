import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renderiza children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("llama onClick al hacer clic", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("usa type button por defecto", () => {
    render(<Button>Enviar</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("acepta type submit", () => {
    render(<Button type="submit">Enviar</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("aplica className adicional", () => {
    render(<Button className="extra">Test</Button>);
    expect(screen.getByRole("button").className).toContain("extra");
  });

  it("aplica clase de variant", () => {
    render(<Button variant="danger">Peligro</Button>);
    expect(screen.getByRole("button").className).toContain("danger");
  });
});
