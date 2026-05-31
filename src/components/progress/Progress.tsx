import type { Variant, Size } from "../../types";
import styles from "./Progress.module.css";
import { Box } from "../box/Box";

interface ProgressProps {
  value: number;
  variant?: Variant;
  size?: Size;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export const Progress = ({
  value,
  variant = "default",
  size = "md",
  label,
  showValue = false,
  className = "",
}: ProgressProps) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <Box className={`${styles.wrapper} ${className}`}>
      {(label || showValue) && (
        <Box className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && <span className={styles.value}>{Math.round(clamped)}%</span>}
        </Box>
      )}
      <Box className={`${styles.track} ${styles[size]}`}>
        <Box
          className={`${styles.fill} ${styles[variant]}`}
          style={{ width: `${clamped}%` }}
        />
      </Box>
    </Box>
  );
};