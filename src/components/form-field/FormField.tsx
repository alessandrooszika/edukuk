import { useId, type ReactNode } from "react";
import FormFieldContext from "./FormFieldContext";
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
  const errorId = useId();

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label htmlFor={htmlFor} className={`${styles.label} ${required ? styles.required : ""}`}>
          {label}
        </label>
      )}
      <FormFieldContext.Provider value={{ hasError: !!error, errorId }}>
        {children}
      </FormFieldContext.Provider>
      {error && (
        <span id={errorId} className={styles.error} role="alert">{error}</span>
      )}
      {!error && helperText && (
        <span className={styles.helper}>{helperText}</span>
      )}
    </div>
  );
};
