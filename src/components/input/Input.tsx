import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type FocusEvent,
  useId,
} from "react";
import type { Variant, Size, InputDesign } from "../../types";
import styles from "./Input.module.css";
import { Box } from "../box/Box";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: Variant;
  size?: Size;
  design?: InputDesign;
  label?: string;
  error?: string;
  hideErrorText?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = "default",
  size = "md",
  design = "outlined",
  label,
  error,
  hideErrorText,
  className = "",
  id: externalId,
  onFocus,
  onBlur,
  ...rest
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const errorId = `${id}-error`;

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const hasValue = rest.value !== undefined && rest.value !== "" && rest.value !== 0;
  const float = isFocused || !!hasValue;

  return (
    <Box className={`${styles.wrapper} ${className}`}>
      <Box className={`${styles.field} ${styles[size]} ${styles[design]} ${styles[variant]} ${error ? styles.hasError : ""}`}>
        <input
          ref={ref}
          id={id}
          className={`${styles.input} ${label && !float ? styles.placeholderHidden : ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {label && (
          <label
            htmlFor={id}
            className={`${styles.label} ${styles[design]} ${float ? styles.float : ""}`}
          >
            {label}
          </label>
        )}
      </Box>
      {error && !hideErrorText && <span id={errorId} className={styles.error} role="alert">{error}</span>}
    </Box>
  );
});
