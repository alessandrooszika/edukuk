import { type TextareaHTMLAttributes, useId } from "react";
import type { Variant, Size } from "../../types";
import styles from "./Textarea.module.css";
import { Box } from "../box";

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  variant?: Variant;
  size?: Size;
  label?: string;
  error?: string;
}

export const Textarea = ({
  variant = "default",
  size = "md",
  label,
  error,
  className = "",
  id: externalId,
  rows = 3,
  ...rest
}: TextareaProps) => {
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
      <textarea
        id={id}
        rows={rows}
        className={`${styles.textarea} ${styles[size]} ${styles[variant]} ${error ? styles.hasError : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error && <span id={errorId} className={styles.error} role="alert">{error}</span>}
    </Box>
  );
};