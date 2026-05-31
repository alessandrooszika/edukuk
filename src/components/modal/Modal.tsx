import { useEffect, useRef, useId, type ReactNode } from "react";
import { CloseIcon } from "../icons";
import type { ModalSize } from "../../types";
import { Button } from "../button/Button";
import { Typography } from "../typography";
import styles from "./Modal.module.css";
import { Box } from "../box/Box";

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

  useEffect(() => {
    if (!isOpen) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;

    requestAnimationFrame(() => {
      modalRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.paddingRight = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

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
              <Button iconOnly onClick={onClose} aria-label="Cerrar">
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