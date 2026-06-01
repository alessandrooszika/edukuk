import { useEffect, useLayoutEffect, type RefObject } from "react";

export function useDropdownPosition(
  triggerRef: RefObject<HTMLElement | null>,
  dropdownRef: RefObject<HTMLElement | null>,
  isOpen: boolean
) {
  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current || !dropdownRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    dropdownRef.current.style.position = "fixed";
    dropdownRef.current.style.top = `${rect.bottom + 4}px`;
    dropdownRef.current.style.left = `${rect.left}px`;
    dropdownRef.current.style.minWidth = `${rect.width}px`;
  }, [isOpen, triggerRef, dropdownRef]);

  useEffect(() => {
    if (!isOpen) return;
    const updatePosition = () => {
      if (!dropdownRef.current || !triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      dropdownRef.current.style.top = `${rect.bottom + 4}px`;
      dropdownRef.current.style.left = `${rect.left}px`;
      dropdownRef.current.style.minWidth = `${rect.width}px`;
    };
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, triggerRef, dropdownRef]);
}
