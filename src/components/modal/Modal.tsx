import { useRef, useId, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { CloseIcon } from "../icons";
import type { ModalSize } from "../../types";
import { Button } from "../button/Button";
import { Typography } from "../typography";
import { Box } from "../box/Box";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: ModalSize;
  footer?: ReactNode;
  closeOnOverlay?: boolean;
  showCloseButton?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  footer,
  closeOnOverlay = true,
  showCloseButton = true,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const { t } = useTranslation();

  useBodyScrollLock(isOpen);
  useFocusTrap(modalRef, isOpen, onClose);

  if (!isOpen) return null;

  return (
    <Box
      className={styles.overlay}
      onClick={closeOnOverlay ? onClose : undefined}
    >
      <Box
        ref={modalRef}
        className={`${styles.modal} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
      >
        {(title || showCloseButton) && (
          <Box className={styles.header}>
            {title && <Typography variant="h4" id={titleId} className={styles.title}>{title}</Typography>}
            {showCloseButton && (
              <Button iconOnly onClick={onClose} aria-label={t("complementos.modal_close_aria")}>
                <CloseIcon size={16} />
              </Button>
            )}
          </Box>
        )}
        <Box className={styles.body}>{children}</Box>
        {footer && <Box className={styles.footer}>{footer}</Box>}
      </Box>
    </Box>
  );
};
