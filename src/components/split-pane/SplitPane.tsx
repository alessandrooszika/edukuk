import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import styles from "./SplitPane.module.css";

interface SplitPaneProps {
  primary: ReactNode;
  secondary: ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const SplitPane = ({
  primary,
  secondary,
  defaultSize = 300,
  minSize = 100,
  maxSize = Infinity,
  orientation = "horizontal",
  className = "",
}: SplitPaneProps) => {
  const [size, setSize] = useState(defaultSize);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHorizontal = orientation === "horizontal";

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const next = isHorizontal ? e.clientX - rect.left : e.clientY - rect.top;
    setSize(Math.max(minSize, Math.min(maxSize, next)));
  }, [isHorizontal, minSize, maxSize]);

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isHorizontal ? styles.horizontal : styles.vertical} ${className}`}
    >
      <div className={styles.primary} style={isHorizontal ? { width: size } : { height: size }}>
        {primary}
      </div>
      <div className={styles.divider} onPointerDown={handlePointerDown} />
      <div className={styles.secondary}>{secondary}</div>
    </div>
  );
};
