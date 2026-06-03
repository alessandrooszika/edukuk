import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ChangeEvent,
  type FocusEvent,
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
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = "default",
  size = "md",
  design = "outlined",
  label,
  error: errorProp,
  className = "",
  id: externalId,
  onFocus,
  onBlur,
  onChange,
  ...rest
}, ref) => {
  const ffContext = useFormFieldContext();
  const [isFocused, setIsFocused] = useState(false);
  const [dirtyValue, setDirtyValue] = useState(
    rest.defaultValue !== undefined && rest.defaultValue !== null
      ? String(rest.defaultValue)
      : ""
  );
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const errorId = `${id}-error`;

  const hasError = errorProp !== undefined || ffContext?.hasError;
  const showError = errorProp !== undefined && !ffContext?.hasError;

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDirtyValue(e.target.value);
    onChange?.(e);
  };

  const value = rest.value !== undefined ? rest.value : dirtyValue;
  const hasValue = value !== "" && value !== 0;
  const float = isFocused || hasValue;

  return (
    <Box className={`${styles.wrapper} ${className}`}>
      <Box className={`${styles.field} ${styles[size]} ${styles[design]} ${styles[variant]} ${hasError ? styles.hasError : ""}`}>
        <input
          ref={ref}
          id={id}
          className={`${styles.input} ${label && !float ? styles.placeholderHidden : ""}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
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
      {showError && <span id={errorId} className={styles.error} role="alert">{errorProp}</span>}
    </Box>
  );
});
