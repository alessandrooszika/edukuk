import { useTranslation } from "react-i18next";
import type { AlertVariant, AlertPosition } from "../../types";
import { Modal } from "../modal/Modal";
import { Alert } from "../alert/Alert";
import { Loader, LoaderOverlay } from "../loader";
import { Drawer } from "../drawer";
import { Box } from "../box/Box";
import { Button } from "../button/Button";
import { Typography } from "../typography";

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
  const { t } = useTranslation();
  const { modalSmall, setModalSmall, modalMedium, setModalMedium, modalLarge, setModalLarge, modalXl, setModalXl, overlayOpen, setOverlayOpen, drawerOpen, setDrawerOpen, drawerPosition, alert, onCloseAlert } = props;

  const durationText = alert.duration > 0 ? `${alert.duration}ms` : t("complementos.alert_duration_none");

  return (
    <>
      <Modal isOpen={modalSmall} onClose={() => setModalSmall(false)} title={t("complementos.modal_title_sm")} size="sm" footer={<Button onClick={() => setModalSmall(false)}>{t("complementos.modal_btn_close")}</Button>}>
        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: t("complementos.modal_body_sm") }} />
      </Modal>

      <Modal isOpen={modalMedium} onClose={() => setModalMedium(false)} title={t("complementos.modal_title_md")} size="md" footer={
        <Box display="flex" gap="0.5rem">
          <Button variant="danger" onClick={() => setModalMedium(false)}>{t("complementos.modal_btn_cancel")}</Button>
          <Button variant="success" onClick={() => setModalMedium(false)}>{t("complementos.modal_btn_accept")}</Button>
        </Box>
      }>
        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: t("complementos.modal_body_md") }} />
      </Modal>

      <Modal isOpen={modalLarge} onClose={() => setModalLarge(false)} title={t("complementos.modal_title_lg")} size="lg" closeOnOverlay={false}>
        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: t("complementos.modal_body_lg") }} />
      </Modal>

      <Modal isOpen={modalXl} onClose={() => setModalXl(false)} title={t("complementos.modal_title_xl")} size="xl">
        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: t("complementos.modal_body_xl") }} />
      </Modal>

      <LoaderOverlay isOpen={overlayOpen} label={t("complementos.loader_overlay_label")}>
        <Box display="flex" flexDirection="column" alignItems="center" gap="1rem">
          <Loader size="lg" variant="success" />
          <Typography variant="body1">{t("complementos.loader_overlay_text")}</Typography>
          <Button variant="danger" onClick={() => setOverlayOpen(false)}>{t("complementos.modal_btn_close")}</Button>
        </Box>
      </LoaderOverlay>

      <Alert
        isOpen={alert.open}
        onClose={onCloseAlert}
        message={t("complementos.alert_message", { variant: alert.variant })}
        description={t("complementos.alert_description", { position: alert.position, duration: durationText })}
        variant={alert.variant}
        position={alert.position}
        duration={alert.duration}
        closable
      />

      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} position={drawerPosition} size="md" title={t("complementos.drawer_title")}>
        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: t("complementos.drawer_content_line1", { side: t(drawerPosition === "right" ? "complementos.drawer_side_right" : "complementos.drawer_side_left") }) }} />
        <Typography variant="body1" style={{ marginTop: "1rem" }}>
          {t("complementos.drawer_content_line2")}
        </Typography>
        <Box mt="1rem">
          <Button variant="danger" onClick={() => setDrawerOpen(false)}>{t("complementos.drawer_btn_close")}</Button>
        </Box>
      </Drawer>
    </>
  );
}
