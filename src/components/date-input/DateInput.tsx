import { type InputHTMLAttributes, useId } from "react";
import type { Variant, Size } from "../../types";
import { CalendarIcon } from "../icons";
import styles from "./DateInput.module.css";
import { Box } from "../box/Box";

interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  variant?: Variant;
  size?: Size;
  label?: string;
  error?: string;
}

export const DateInput = ({
  variant = "default",
  size = "md",
  label,
  error,
  className = "",
  id: externalId,
  ...rest
}: DateInputProps) => {
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
      <Box className={styles.inputWrap}>
        <input
          id={id}
          type="date"
          className={`${styles.input} ${styles[size]} ${styles[variant]} ${error ? styles.hasError : ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
        <CalendarIcon className={`${styles.calendar} ${styles[size]}`} />
      </Box>
      {error && <span id={errorId} className={styles.error} role="alert">{error}</span>}
    </Box>
  );
};