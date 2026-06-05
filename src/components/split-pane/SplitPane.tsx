import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { Box } from "../box";
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
    const containerSize = isHorizontal ? rect.width : rect.height;
    const next = isHorizontal ? e.clientX - rect.left : e.clientY - rect.top;
    setSize(Math.max(minSize, Math.min(maxSize, Math.min(next, containerSize - 4 - 80))));
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
    <Box
      ref={containerRef}
      display="grid"
      className={`${styles.container} ${isHorizontal ? styles.horizontal : styles.vertical} ${className}`}
      style={{
        overflow: "hidden",
        maxWidth: "100%",
        minWidth: 0,
        ...(isHorizontal
          ? { height: 300, gridTemplateColumns: `${size}px 4px 1fr` }
          : { gridTemplateRows: `${size}px 4px 1fr` }
        ),
      }}
    >
      <Box className={styles.primary} style={{ overflow: "hidden", minWidth: 0, minHeight: 0 }}>
        {primary}
      </Box>
      <Box className={styles.divider} onPointerDown={handlePointerDown} />
      <Box className={styles.secondary} style={{ overflow: "hidden", minWidth: 0, minHeight: 0 }}>
        {secondary}
      </Box>
    </Box>
  );
};
