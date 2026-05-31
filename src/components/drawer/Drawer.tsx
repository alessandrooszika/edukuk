import { useEffect, useRef, useId, type ReactNode } from "react";
import { CloseIcon } from "../icons";
import { Button } from "../button/Button";
import styles from "./Drawer.module.css";
import { Box } from "../box/Box";

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

  useEffect(() => {
    if (!isOpen) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;

    requestAnimationFrame(() => {
      panelRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
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
            <h2 id={titleId} className={styles.title}>{title}</h2>
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
