import type { ReactNode } from "react";
import styles from "./AspectRatio.module.css";

interface AspectRatioProps {
  ratio?: number;
  children: ReactNode;
  maxWidth?: string | number;
  className?: string;
}

export const AspectRatio = ({
  ratio = 16 / 9,
  children,
  maxWidth,
  className = "",
}: AspectRatioProps) => {
  return (
    <div
      className={`${styles.root} ${className}`}
      style={{
        aspectRatio: `${ratio}`,
        ...(maxWidth !== undefined
          ? { maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth }
          : {}),
      }}
    >
      <div className={styles.inner}>{children}</div>
    </div>
  );
};
