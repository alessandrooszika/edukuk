import { useId } from "react";
import type { Variant, Size } from "../../types";
import styles from "./Switch.module.css";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  className?: string;
}

export const Switch = ({
  checked,
  onChange,
  label,
  variant = "default",
  size = "md",
  disabled = false,
  className = "",
}: SwitchProps) => {
  const id = useId();

  return (
    <label
      className={`${styles.wrapper} ${disabled ? styles.disabled : ""} ${className}`}
      htmlFor={id}
    >
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={`${styles.track} ${styles[size]} ${styles[variant]} ${checked ? styles.on : styles.off}`}
        onClick={() => !disabled && onChange(!checked)}
      >
        <span className={styles.thumb} />
      </button>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
