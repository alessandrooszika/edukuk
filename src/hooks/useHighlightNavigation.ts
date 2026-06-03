import { useState, useEffect, useCallback, type RefObject } from "react";

interface UseHighlightNavigationOptions {
  itemCount: number;
  isOpen: boolean;
  listRef: RefObject<HTMLElement | null>;
  onEnter?: () => void;
  onEscape?: () => void;
  wrapAround?: boolean;
  initialIndex?: number;
}

export function useHighlightNavigation({
  itemCount,
  isOpen,
  listRef,
  onEnter,
  onEscape,
  wrapAround = true,
  initialIndex = -1,
}: UseHighlightNavigationOptions) {
  const [highlightIndex, setHighlightIndex] = useState(initialIndex);

  useEffect(() => {
    if (!isOpen) setHighlightIndex(initialIndex);
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (isOpen && listRef.current && highlightIndex >= 0) {
      const item = listRef.current.children[highlightIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex, isOpen, listRef]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIndex((prev) => {
          if (wrapAround) return prev < itemCount - 1 ? prev + 1 : 0;
          return Math.min(prev + 1, itemCount - 1);
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIndex((prev) => {
          if (wrapAround) return prev > 0 ? prev - 1 : itemCount - 1;
          return Math.max(prev - 1, 0);
        });
        break;
      case "Enter":
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < itemCount) {
          onEnter?.();
        }
        break;
      case "Escape":
        e.preventDefault();
        onEscape?.();
        break;
    }
  }, [itemCount, highlightIndex, onEnter, onEscape, wrapAround]);

  const onPointerEnter = useCallback((i: number) => setHighlightIndex(i), []);

  return {
    highlightIndex,
    setHighlightIndex,
    handleKeyDown,
    onPointerEnter,
  };
}
