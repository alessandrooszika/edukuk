import { useEffect, useLayoutEffect, type RefObject } from "react";

type FloatingPlacement = "bottom" | "top" | "left" | "right";

interface UseFloatingUIOptions {
  placement?: FloatingPlacement;
  gap?: number;
  matchWidth?: boolean;
}

export function useFloatingUI(
  triggerRef: RefObject<HTMLElement | null>,
  floatingRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  options: UseFloatingUIOptions = {}
) {
  const { placement = "bottom", gap = 4, matchWidth = true } = options;

  const applyPosition = () => {
    if (!triggerRef.current || !floatingRef.current) return;
    const t = triggerRef.current.getBoundingClientRect();
    const el = floatingRef.current;
    const f = el.getBoundingClientRect();

    el.style.position = "fixed";

    switch (placement) {
      case "bottom":
        el.style.top = `${t.bottom + gap}px`;
        el.style.left = `${t.left}px`;
        break;
      case "top":
        el.style.top = `${t.top - f.height - gap}px`;
        el.style.left = `${t.left}px`;
        break;
      case "left":
        el.style.top = `${t.top + t.height / 2 - f.height / 2}px`;
        el.style.left = `${t.left - f.width - gap}px`;
        break;
      case "right":
        el.style.top = `${t.top + t.height / 2 - f.height / 2}px`;
        el.style.left = `${t.right + gap}px`;
        break;
    }

    if (matchWidth && (placement === "bottom" || placement === "top")) {
      el.style.minWidth = `${t.width}px`;
    }
  };

  useLayoutEffect(() => {
    if (isOpen) applyPosition();
  }, [isOpen, triggerRef, floatingRef, placement, gap, matchWidth]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("scroll", applyPosition, true);
    window.addEventListener("resize", applyPosition);
    return () => {
      window.removeEventListener("scroll", applyPosition, true);
      window.removeEventListener("resize", applyPosition);
    };
  }, [isOpen, triggerRef, floatingRef, placement, gap, matchWidth]);
}
