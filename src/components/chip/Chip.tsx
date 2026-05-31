import { CloseIcon } from "../icons";
import type { Variant, Size } from "../../types";
import styles from "./Chip.module.css";

interface ChipProps {
  label: string;
  onRemove?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  className?: string;
}

export const Chip = ({
  label,
  onRemove,
  variant = "default",
  size = "md",
  disabled = false,
  className = "",
}: ChipProps) => {
  return (
    <span
      className={`${styles.chip} ${styles[size]} ${styles[variant]} ${disabled ? styles.disabled : ""} ${className}`}
    >
      <span className={styles.label}>{label}</span>
      {onRemove && (
        <button
          type="button"
          className={styles.remove}
          onClick={onRemove}
          disabled={disabled}
          aria-label={`Eliminar ${label}`}
        >
          <CloseIcon />
        </button>
      )}
    </span>
  );
};
