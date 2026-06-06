import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImageViewerProvider, useImageViewer } from ".";
import type { ImageViewerImage } from ".";

const mockIsDesktop = vi.fn();

vi.mock("../../styles/breakpoints", () => ({
  useMediaQuery: () => mockIsDesktop(),
  mediaQueries: { lg: "(min-width: 1024px)" },
}));

function OpenButton({ src, alt }: { src: string; alt?: string }) {
  const { openViewer } = useImageViewer();
  return <button onClick={() => openViewer({ src, alt })}>Abrir</button>;
}

function OpenGallery({ images }: { images: ImageViewerImage[] }) {
  const { openViewer } = useImageViewer();
  return <button onClick={() => openViewer({ images })}>Galería</button>;
}

describe("ImageViewer", () => {
  beforeEach(() => {
    mockIsDesktop.mockReturnValue(true);
  });

  it("abre visor con imagen individual", async () => {
    render(
      <ImageViewerProvider><OpenButton src="/test.jpg" alt="Test" /></ImageViewerProvider>
    );
    await userEvent.click(screen.getByText("Abrir"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("muestra la imagen correcta", async () => {
    render(
      <ImageViewerProvider><OpenButton src="/test.jpg" alt="Test" /></ImageViewerProvider>
    );
    await userEvent.click(screen.getByText("Abrir"));
    const img = screen.getByRole("dialog").querySelector("img");
    expect(img).toHaveAttribute("src", "/test.jpg");
    expect(img).toHaveAttribute("alt", "Test");
  });

  it("cierra al hacer clic en cerrar", async () => {
    render(
      <ImageViewerProvider><OpenButton src="/test.jpg" alt="Test" /></ImageViewerProvider>
    );
    await userEvent.click(screen.getByText("Abrir"));
    await userEvent.click(screen.getByLabelText("Cerrar visor"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("cierra con Escape", async () => {
    render(
      <ImageViewerProvider><OpenButton src="/test.jpg" alt="Test" /></ImageViewerProvider>
    );
    await userEvent.click(screen.getByText("Abrir"));
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("muestra contador para galería", async () => {
    const images = [
      { src: "/a.jpg", alt: "A" },
      { src: "/b.jpg", alt: "B" },
      { src: "/c.jpg", alt: "C" },
    ];
    render(
      <ImageViewerProvider><OpenGallery images={images} /></ImageViewerProvider>
    );
    await userEvent.click(screen.getByText("Galería"));
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("navega con flecha derecha", async () => {
    const images = [
      { src: "/a.jpg", alt: "A" },
      { src: "/b.jpg", alt: "B" },
    ];
    render(
      <ImageViewerProvider><OpenGallery images={images} /></ImageViewerProvider>
    );
    await userEvent.click(screen.getByText("Galería"));
    fireEvent.keyDown(window, { key: "ArrowRight" });
    const img = screen.getByRole("dialog").querySelector("img");
    expect(img).toHaveAttribute("src", "/b.jpg");
  });

  it("navega con flecha izquierda", async () => {
    const images = [
      { src: "/a.jpg", alt: "A" },
      { src: "/b.jpg", alt: "B" },
    ];
    render(
      <ImageViewerProvider><OpenGallery images={images} /></ImageViewerProvider>
    );
    await userEvent.click(screen.getByText("Galería"));
    fireEvent.keyDown(window, { key: "ArrowRight" });
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    const img = screen.getByRole("dialog").querySelector("img");
    expect(img).toHaveAttribute("src", "/a.jpg");
  });

  it("navega con swipe táctil", async () => {
    const images = [
      { src: "/a.jpg", alt: "A" },
      { src: "/b.jpg", alt: "B" },
    ];
    render(
      <ImageViewerProvider><OpenGallery images={images} /></ImageViewerProvider>
    );
    await userEvent.click(screen.getByText("Galería"));
    const dialog = screen.getByRole("dialog");
    const overlay = dialog.parentElement!;
    fireEvent.touchStart(overlay, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(overlay, { changedTouches: [{ clientX: 50 }] });
    const img = dialog.querySelector("img");
    expect(img).toHaveAttribute("src", "/b.jpg");
  });
});
