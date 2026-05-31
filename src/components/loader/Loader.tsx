import type { Variant, Size } from "../../types";
import styles from "./Loader.module.css";

interface LoaderProps {
  size?: Size;
  variant?: Variant;
  label?: string;
  className?: string;
}

export const Loader = ({
  size = "md",
  variant = "default",
  label,
  className = "",
}: LoaderProps) => {
  const content = (
    <span
      className={`${styles.spinner} ${styles[size]} ${styles[variant]}`}
      role="status"
      aria-label={label ?? "Cargando"}
    />
  );

  if (label) {
    return (
      <span className={`${styles.wrapper} ${className}`} role="status">
        {content}
        <span className={styles.label}>{label}</span>
      </span>
    );
  }

  return <span className={`${styles.wrapper} ${className}`} role="status">{content}</span>;
};
