import type { Variant } from "../../types";
import styles from "./LoaderBar.module.css";

interface LoaderBarProps {
  variant?: Variant;
  className?: string;
}

export const LoaderBar = ({
  variant = "default",
  className = "",
}: LoaderBarProps) => {
  return (
    <span className={`${styles.track} ${className}`} role="progressbar">
      <span className={`${styles.indicator} ${styles[variant]}`} />
    </span>
  );
};
