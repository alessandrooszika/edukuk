import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ToastProvider, useToast } from "./Toast";

function TestHarness() {
  const { addToast, removeToast } = useToast();
  return (
    <div>
      <button onClick={() => addToast({ message: "Mensaje de prueba" })}>
        Agregar toast
      </button>
      <button onClick={() => addToast({ message: "Success!", variant: "success" })}>
        Success
      </button>
      <button onClick={() => {
        const id = addToast({ message: "Auto remove" });
        removeToast(id);
      }}>
        Add y remove
      </button>
    </div>
  );
}

describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("provee contexto y agrega toasts", () => {
    render(
      <ToastProvider>
        <TestHarness />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Agregar toast"));
    expect(screen.getByText("Mensaje de prueba")).toBeInTheDocument();
  });

  it("acepta variantes", () => {
    render(
      <ToastProvider>
        <TestHarness />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Success"));
    expect(screen.getByText("Success!")).toBeInTheDocument();
  });

  it("cierra toast al hacer clic en botón X", () => {
    render(
      <ToastProvider>
        <TestHarness />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Agregar toast"));
    expect(screen.getByText("Mensaje de prueba")).toBeInTheDocument();
    const closeBtn = screen.getByLabelText("Cerrar notificación");
    act(() => { fireEvent.click(closeBtn); });
    act(() => { vi.advanceTimersByTime(300); });
    expect(screen.queryByText("Mensaje de prueba")).not.toBeInTheDocument();
  });

  it("auto-descarta después de defaultDuration", () => {
    render(
      <ToastProvider defaultDuration={1000}>
        <TestHarness />
      </ToastProvider>
    );
    act(() => { fireEvent.click(screen.getByText("Agregar toast")); });
    expect(screen.getByText("Mensaje de prueba")).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1500); });
    expect(screen.queryByText("Mensaje de prueba")).not.toBeInTheDocument();
  });

  it("lanza error si useToast se usa fuera del provider", () => {
    const consoleError = console.error;
    console.error = vi.fn();
    expect(() => render(<TestHarness />)).toThrow(
      "useToast debe usarse dentro de un ToastProvider"
    );
    console.error = consoleError;
  });
});
