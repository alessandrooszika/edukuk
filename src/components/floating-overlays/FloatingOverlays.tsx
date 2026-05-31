import type { AlertVariant, AlertPosition } from "../../types";
import { Modal } from "../modal/Modal";
import { Alert } from "../alert/Alert";
import { Loader, LoaderOverlay } from "../loader";
import { Drawer } from "../drawer";
import { Box } from "../box/Box";
import { Button } from "../button/Button";

export interface FloatingOverlaysProps {
  modalSmall: boolean; setModalSmall: (v: boolean) => void;
  modalMedium: boolean; setModalMedium: (v: boolean) => void;
  modalLarge: boolean; setModalLarge: (v: boolean) => void;
  modalXl: boolean; setModalXl: (v: boolean) => void;
  overlayOpen: boolean; setOverlayOpen: (v: boolean) => void;
  drawerOpen: boolean; setDrawerOpen: (v: boolean) => void;
  drawerPosition: "left" | "right";
  alert: { open: boolean; variant: AlertVariant; position: AlertPosition; duration: number };
  showAlert: (variant: AlertVariant, position: AlertPosition, duration?: number) => void;
  onCloseAlert: () => void;
}

export function FloatingOverlays(props: FloatingOverlaysProps) {
  const { modalSmall, setModalSmall, modalMedium, setModalMedium, modalLarge, setModalLarge, modalXl, setModalXl, overlayOpen, setOverlayOpen, drawerOpen, setDrawerOpen, drawerPosition, alert, onCloseAlert } = props;

  return (
    <>
      <Modal isOpen={modalSmall} onClose={() => setModalSmall(false)} title="Modal pequeño" size="sm" footer={<Button onClick={() => setModalSmall(false)}>Cerrar</Button>}>
        <p>Modal de tamaño <strong>sm</strong> (360px). Ideal para confirmaciones o alertas.</p>
      </Modal>

      <Modal isOpen={modalMedium} onClose={() => setModalMedium(false)} title="Modal mediano" size="md" footer={
        <Box display="flex" gap="0.5rem">
          <Button variant="danger" onClick={() => setModalMedium(false)}>Cancelar</Button>
          <Button variant="success" onClick={() => setModalMedium(false)}>Aceptar</Button>
        </Box>
      }>
        <p>Modal de tamaño <strong>md</strong> (500px). Incluye botones en el footer con variantes danger/success.</p>
      </Modal>

      <Modal isOpen={modalLarge} onClose={() => setModalLarge(false)} title="Modal grande" size="lg" closeOnOverlay={false}>
        <p>Modal de tamaño <strong>lg</strong> (680px). <code>closeOnOverlay=false</code> — solo se cierra con el botón X o Escape.</p>
      </Modal>

      <Modal isOpen={modalXl} onClose={() => setModalXl(false)} title="Modal extra grande" size="xl">
        <p>Modal de tamaño <strong>xl</strong> (900px). Ideal para paneles amplios, dashboards o contenido extenso.</p>
      </Modal>

      <LoaderOverlay isOpen={overlayOpen} label="Cargando contenido…">
        <Box display="flex" flexDirection="column" alignItems="center" gap="1rem">
          <Loader size="lg" variant="success" />
          <span style={{ color: "var(--text)", fontSize: "1rem" }}>Cargando contenido…</span>
          <Button variant="danger" onClick={() => setOverlayOpen(false)}>Cerrar</Button>
        </Box>
      </LoaderOverlay>

      <Alert
        isOpen={alert.open}
        onClose={onCloseAlert}
        message={`Alerta de tipo ${alert.variant}`}
        description={`Posición: ${alert.position} · Duración: ${alert.duration > 0 ? alert.duration + "ms" : "sin auto-cierre"}`}
        variant={alert.variant}
        position={alert.position}
        duration={alert.duration}
        closable
      />

      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} position={drawerPosition} size="md" title="Panel lateral">
        <p>Este es un <strong>Drawer</strong> desde la {drawerPosition === "right" ? "derecha" : "izquierda"}.</p>
        <p style={{ marginTop: "1rem" }}>
          Usá el botón para cerrar, clickeá fuera del panel o presioná Escape.
        </p>
        <Box mt="1rem">
          <Button variant="danger" onClick={() => setDrawerOpen(false)}>Cerrar</Button>
        </Box>
      </Drawer>
    </>
  );
}
