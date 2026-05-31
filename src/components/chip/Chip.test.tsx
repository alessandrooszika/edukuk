import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("renderiza label", () => {
    render(<Chip label="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("no muestra boton de eliminar si no hay onRemove", () => {
    render(<Chip label="React" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("muestra boton de eliminar cuando onRemove esta presente", () => {
    render(<Chip label="React" onRemove={() => {}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("llama onRemove al hacer clic en eliminar", async () => {
    const onRemove = vi.fn();
    render(<Chip label="React" onRemove={onRemove} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("tiene aria-label en boton de eliminar", () => {
    render(<Chip label="React" onRemove={() => {}} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Eliminar React");
  });

  it("deshabilita el boton cuando disabled=true", () => {
    render(<Chip label="React" onRemove={() => {}} disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("no llama onRemove si esta deshabilitado", async () => {
    const onRemove = vi.fn();
    render(<Chip label="React" onRemove={onRemove} disabled />);
    await userEvent.click(screen.getByRole("button"));
    expect(onRemove).not.toHaveBeenCalled();
  });

  it("aplica clase disabled cuando disabled=true", () => {
    render(<Chip label="React" disabled />);
    expect(screen.getByText("React").parentElement!.className).toContain("disabled");
  });

  it("aplica clases de variant y size", () => {
    render(<Chip label="Test" variant="info" size="sm" />);
    const chip = screen.getByText("Test").parentElement!;
    expect(chip.className).toContain("info");
    expect(chip.className).toContain("sm");
  });
});
