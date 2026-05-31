import { forwardRef, type InputHTMLAttributes, useId } from "react";
import type { Variant, Size } from "../../types";
import styles from "./Input.module.css";
import { Box } from "../box/Box";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: Variant;
  size?: Size;
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = "default",
  size = "md",
  label,
  error,
  className = "",
  id: externalId,
  ...rest
}, ref) => {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <Box className={`${styles.wrapper} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`${styles.input} ${styles[size]} ${styles[variant]} ${error ? styles.hasError : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error && <span id={errorId} className={styles.error} role="alert">{error}</span>}
    </Box>
  );
});
