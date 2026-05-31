import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover } from "./Popover";

describe("Popover", () => {
  it("renderiza children", () => {
    render(<Popover content={<p>contenido</p>}><button>Trigger</button></Popover>);
    expect(screen.getByText("Trigger")).toBeInTheDocument();
  });

  it("no muestra contenido inicialmente", () => {
    render(<Popover content={<p>contenido</p>}><button>Trigger</button></Popover>);
    expect(screen.queryByText("contenido")).not.toBeInTheDocument();
  });

  it("muestra contenido al clickear trigger", async () => {
    render(<Popover content={<p>contenido</p>}><button>Trigger</button></Popover>);
    await userEvent.click(screen.getByText("Trigger"));
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("oculta contenido al clickear trigger nuevamente", async () => {
    render(<Popover content={<p>contenido</p>}><button>Trigger</button></Popover>);
    await userEvent.click(screen.getByText("Trigger"));
    await userEvent.click(screen.getByText("Trigger"));
    expect(screen.queryByText("contenido")).not.toBeInTheDocument();
  });

  it("cierra con Escape", async () => {
    render(<Popover content={<p>contenido</p>}><button>Trigger</button></Popover>);
    await userEvent.click(screen.getByText("Trigger"));
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByText("contenido")).not.toBeInTheDocument();
  });

  it("cierra al clickear fuera", async () => {
    render(<Popover content={<p>contenido</p>}><button>Trigger</button></Popover>);
    await userEvent.click(screen.getByText("Trigger"));
    await userEvent.click(document.body);
    expect(screen.queryByText("contenido")).not.toBeInTheDocument();
  });

  it("renderiza contenido via portal en body", async () => {
    render(<Popover content={<p>contenido</p>}><button>Trigger</button></Popover>);
    await userEvent.click(screen.getByText("Trigger"));
    expect(document.body.contains(screen.getByText("contenido"))).toBe(true);
  });
});
