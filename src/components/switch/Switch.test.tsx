import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renderiza con aria-checked=true cuando checked=true", () => {
    render(<Switch checked={true} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("renderiza con aria-checked=false cuando checked=false", () => {
    render(<Switch checked={false} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("llama onChange con !checked al hacer clic", async () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("llama onChange con false cuando estaba true", async () => {
    const onChange = vi.fn();
    render(<Switch checked={true} onChange={onChange} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("no llama onChange si disabled", async () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} disabled />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("aplica clase disabled cuando disabled", () => {
    render(<Switch checked={false} onChange={() => {}} disabled />);
    const label = screen.getByRole("switch").closest("label")!;
    expect(label.className).toContain("disabled");
  });

  it("renderiza label", () => {
    render(<Switch checked={false} onChange={() => {}} label="WiFi" />);
    expect(screen.getByText("WiFi")).toBeInTheDocument();
  });

  it("no renderiza label si no se provee", () => {
    render(<Switch checked={false} onChange={() => {}} />);
    expect(screen.queryByText("WiFi")).not.toBeInTheDocument();
  });

  it("aplica clases de variant y size", () => {
    render(<Switch checked={false} onChange={() => {}} variant="success" size="lg" />);
    const btn = screen.getByRole("switch");
    expect(btn.className).toContain("success");
    expect(btn.className).toContain("lg");
  });
});
