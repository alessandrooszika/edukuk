import { useRef, type InputHTMLAttributes, useId } from "react";
import type { Variant, Size } from "../../types";
import styles from "./ColorInput.module.css";
import { Box } from "../box/Box";

interface ColorInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "value"> {
  variant?: Variant;
  size?: Size;
  label?: string;
  error?: string;
  value?: string;
}

export const ColorInput = ({
  variant = "default",
  size = "md",
  label,
  error,
  className = "",
  id: externalId,
  value = "#aa3bff",
  onChange,
  ...rest
}: ColorInputProps) => {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const errorId = `${id}-error`;
  const colorRef = useRef<HTMLInputElement>(null);

  return (
    <Box className={`${styles.wrapper} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <Box
        className={`${styles.inputWrap} ${styles[size]} ${styles[variant]} ${error ? styles.hasError : ""}`}
        onClick={() => colorRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); colorRef.current?.click(); } }}
        aria-label={label ? `${label}: ${value}` : `Color: ${value}`}
      >
        <span className={`${styles.swatch} ${styles[size]}`} style={{ background: value }}>
          {value.toUpperCase() === "#FFFFFF" && <span className={styles.borderFix} />}
        </span>
        <span className={`${styles.display} ${styles[size]}`}>{value}</span>
        <input
          ref={colorRef}
          id={id}
          type="color"
          value={value}
          onChange={onChange}
          className={styles.hidden}
          aria-hidden="true"
          tabIndex={-1}
          {...rest}
        />
      </Box>
      {error && <span id={errorId} className={styles.error} role="alert">{error}</span>}
    </Box>
  );
};