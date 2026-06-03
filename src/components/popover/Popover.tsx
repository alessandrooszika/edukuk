import { useState, useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Box } from "../box";
import { useFloatingUI } from "../../hooks/useFloatingUI";
import styles from "./Popover.module.css";

type PopoverPosition = "top" | "bottom" | "left" | "right";

interface PopoverProps {
  content: ReactNode;
  children: ReactNode;
  position?: PopoverPosition;
}

export const Popover = ({
  content,
  children,
  position = "bottom",
}: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useFloatingUI(triggerRef, popoverRef, open, { placement: position, gap: 8, matchWidth: false });

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onClickOutside = (e: PointerEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClickOutside);
    };
  }, [open]);

  return (
    <>
      <Box ref={triggerRef} onClick={() => setOpen((p) => !p)}>
        {children}
      </Box>
      {open && createPortal(
        <Box ref={popoverRef} className={styles.content}>
          {content}
        </Box>,
        document.body
      )}
    </>
  );
};
