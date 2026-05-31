import type { ReactNode } from "react";
import styles from "./FormField.module.css";

interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children?: ReactNode;
  className?: string;
}

export const FormField = ({
  label,
  htmlFor,
  error,
  helperText,
  required,
  children,
  className = "",
}: FormFieldProps) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label htmlFor={htmlFor} className={`${styles.label} ${required ? styles.required : ""}`}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className={styles.error} role="alert">{error}</span>
      )}
      {!error && helperText && (
        <span className={styles.helper}>{helperText}</span>
      )}
    </div>
  );
};
