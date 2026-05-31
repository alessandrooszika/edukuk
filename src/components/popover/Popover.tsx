import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Box } from "../box/Box";
import styles from "./Popover.module.css";

type PopoverPosition = "top" | "bottom" | "left" | "right";

interface PopoverProps {
  content: ReactNode;
  children: ReactNode;
  position?: PopoverPosition;
}

const gap = 8;

const getCoords = (
  trigger: HTMLElement,
  popover: HTMLElement,
  position: PopoverPosition
) => {
  const t = trigger.getBoundingClientRect();
  const p = popover.getBoundingClientRect();

  switch (position) {
    case "bottom":
      return { top: t.bottom + gap, left: t.left + t.width / 2 - p.width / 2 };
    case "top":
      return { top: t.top - p.height - gap, left: t.left + t.width / 2 - p.width / 2 };
    case "left":
      return { top: t.top + t.height / 2 - p.height / 2, left: t.left - p.width - gap };
    case "right":
      return { top: t.top + t.height / 2 - p.height / 2, left: t.right + gap };
  }
};

export const Popover = ({
  content,
  children,
  position = "bottom",
}: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;
    const coords = getCoords(triggerRef.current, popoverRef.current, position);
    popoverRef.current.style.top = `${coords.top}px`;
    popoverRef.current.style.left = `${coords.left}px`;
  }, [position]);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

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
