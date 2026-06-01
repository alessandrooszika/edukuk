import { useRef, useId, type ReactNode } from "react";
import { CloseIcon } from "../icons";
import { Button } from "../button/Button";
import { Typography } from "../typography";
import { Box } from "../box/Box";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import styles from "./Drawer.module.css";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right";
  size?: "sm" | "md" | "lg";
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Drawer = ({
  isOpen,
  onClose,
  position = "right",
  size = "md",
  title,
  children,
  className = "",
}: DrawerProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useBodyScrollLock(isOpen);
  useFocusTrap(panelRef, isOpen, onClose);

  if (!isOpen) return null;

  return (
    <Box className={styles.overlay} onClick={onClose}>
      <Box
        ref={panelRef}
        className={`${styles.drawer} ${styles[position]} ${styles[size]} ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : "Panel"}
        tabIndex={-1}
      >
        {title && (
          <Box className={styles.header}>
            <Typography variant="h4" id={titleId} className={styles.title}>{title}</Typography>
            <Button iconOnly onClick={onClose} aria-label="Cerrar">
              <CloseIcon size={16} />
            </Button>
          </Box>
        )}
        <Box className={styles.body}>{children}</Box>
      </Box>
    </Box>
  );
};
