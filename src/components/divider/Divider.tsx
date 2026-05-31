import type { Variant, Size } from "../../types";
import styles from "./Divider.module.css";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  size?: Size;
  variant?: Variant;
  label?: string;
  className?: string;
}

export const Divider = ({
  orientation = "horizontal",
  size = "sm",
  variant = "default",
  label,
  className = "",
}: DividerProps) => {
  if (label && orientation === "horizontal") {
    return (
      <div className={`${styles.withLabel} ${className}`} role="separator" aria-orientation="horizontal">
        <span className={styles.labelText}>{label}</span>
      </div>
    );
  }

  const Tag = orientation === "horizontal" ? "hr" : "span";

  return (
    <Tag
      className={`${styles.root} ${styles[orientation]} ${styles[size]} ${styles[variant]} ${className}`}
      role="separator"
      aria-orientation={orientation}
    />
  );
};
