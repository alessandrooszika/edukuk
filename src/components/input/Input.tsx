import {
  forwardRef,
  type InputHTMLAttributes,
  useId,
} from "react";
import type { Variant, Size, InputDesign } from "../../types";
import { useFormFieldContext } from "../form-field/FormFieldContext";
import styles from "./Input.module.css";
import { Box } from "../box";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: Variant;
  size?: Size;
  design?: InputDesign;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = "default",
  size = "md",
  design = "outlined",
  error: errorProp,
  className = "",
  id: externalId,
  ...rest
}, ref) => {
  const ffContext = useFormFieldContext();
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const errorId = `${id}-error`;

  const hasError = errorProp !== undefined || ffContext?.hasError;
  const showError = errorProp !== undefined && !ffContext?.hasError;

  return (
    <Box className={`${styles.wrapper} ${className}`}>
      <Box className={`${styles.field} ${styles[size]} ${styles[design]} ${styles[variant]} ${hasError ? styles.hasError : ""}`}>
        <input
          ref={ref}
          id={id}
          className={styles.input}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          {...rest}
        />
      </Box>
      {showError && <span id={errorId} className={styles.error} role="alert">{errorProp}</span>}
    </Box>
  );
});
