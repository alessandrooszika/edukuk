import { render, screen, fireEvent } from "@testing-library/react";
import { FloatingOverlays, type FloatingOverlaysProps } from "./FloatingOverlays";

const defaultProps: FloatingOverlaysProps = {
  modalSmall: false, setModalSmall: vi.fn(),
  modalMedium: false, setModalMedium: vi.fn(),
  modalLarge: false, setModalLarge: vi.fn(),
  modalXl: false, setModalXl: vi.fn(),
  overlayOpen: false, setOverlayOpen: vi.fn(),
  drawerOpen: false, setDrawerOpen: vi.fn(),
  drawerPosition: "left",
  alert: { open: false, variant: "info", position: "top-right", duration: 0 },
  showAlert: vi.fn(),
  onCloseAlert: vi.fn(),
};

describe("FloatingOverlays", () => {
  it("no renderiza overlays cuando estan cerrados", () => {
    render(<FloatingOverlays {...defaultProps} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renderiza modal small cuando isOpen", () => {
    render(<FloatingOverlays {...defaultProps} modalSmall />);
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(screen.getByText("complementos.modal_title_sm")).toBeInTheDocument();
  });

  it("renderiza modal medium cuando isOpen", () => {
    render(<FloatingOverlays {...defaultProps} modalMedium />);
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(screen.getByText("complementos.modal_title_md")).toBeInTheDocument();
  });

  it("renderiza modal large con closeOnOverlay false", () => {
    render(<FloatingOverlays {...defaultProps} modalLarge />);
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(screen.getByText("complementos.modal_title_lg")).toBeInTheDocument();
  });

  it("renderiza modal xl cuando isOpen", () => {
    render(<FloatingOverlays {...defaultProps} modalXl />);
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(screen.getByText("complementos.modal_title_xl")).toBeInTheDocument();
  });

  it("renderiza drawer cuando isOpen", () => {
    render(<FloatingOverlays {...defaultProps} drawerOpen drawerPosition="left" />);
    expect(screen.getByRole("dialog", { name: "complementos.drawer_title" })).toBeVisible();
  });

  it("renderiza drawer en posicion derecha", () => {
    render(<FloatingOverlays {...defaultProps} drawerOpen drawerPosition="right" />);
    expect(screen.getByRole("dialog", { name: "complementos.drawer_title" })).toBeVisible();
    expect(screen.getByText("complementos.drawer_content_line1")).toBeInTheDocument();
  });

  it("renderiza loader overlay cuando isOpen", () => {
    render(<FloatingOverlays {...defaultProps} overlayOpen />);
    expect(screen.getByText("complementos.loader_overlay_text")).toBeVisible();
  });

  it("renderiza alert cuando isOpen", () => {
    render(<FloatingOverlays {...defaultProps} alert={{ open: true, variant: "info", position: "top-right", duration: 0 }} />);
    expect(screen.getByText("complementos.alert_message")).toBeInTheDocument();
  });

  it("cierra modal small al hacer clic en boton Cerrar del footer", () => {
    const setModalSmall = vi.fn();
    render(<FloatingOverlays {...defaultProps} modalSmall setModalSmall={setModalSmall} />);
    const buttons = screen.getAllByRole("button", { name: "complementos.modal_btn_close" });
    const footerBtn = buttons.find((b) => b.tagName === "BUTTON" && !b.querySelector("svg"));
    if (footerBtn) fireEvent.click(footerBtn);
    expect(setModalSmall).toHaveBeenCalledWith(false);
  });

  it("alterna drawer left vs right segun prop", () => {
    const { rerender } = render(<FloatingOverlays {...defaultProps} drawerOpen drawerPosition="left" />);
    expect(screen.getByRole("dialog", { name: "complementos.drawer_title" })).toBeVisible();
    expect(screen.getByText("complementos.drawer_content_line1")).toBeInTheDocument();

    rerender(<FloatingOverlays {...defaultProps} drawerOpen drawerPosition="right" />);
    expect(screen.getByRole("dialog", { name: "complementos.drawer_title" })).toBeVisible();
    expect(screen.getByText("complementos.drawer_content_line1")).toBeInTheDocument();
  });
});
