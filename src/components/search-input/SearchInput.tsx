import { type InputHTMLAttributes, useId } from "react";
import type { Variant, Size } from "../../types";
import { SearchIcon, ClearIcon } from "../icons";
import styles from "./SearchInput.module.css";
import { Box } from "../box/Box";
import { Button } from "../button/Button";

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  variant?: Variant;
  size?: Size;
  label?: string;
  error?: string;
  onClear?: () => void;
}

export const SearchInput = ({
  variant = "default",
  size = "md",
  label,
  error,
  className = "",
  id: externalId,
  value,
  onChange,
  onClear,
  ...rest
}: SearchInputProps) => {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const errorId = `${id}-error`;
  const hasValue = typeof value === "string" && value.length > 0;

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      const native = new Event("input", { bubbles: true });
      const input = document.getElementById(id) as HTMLInputElement | null;
      if (input) {
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
        setter?.call(input, "");
        input.dispatchEvent(native);
      }
    }
  };

  return (
    <Box className={`${styles.wrapper} ${className}`} role="search">
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <Box className={styles.inputWrap}>
        <SearchIcon className={`${styles.icon} ${styles[size]}`} />
        <input
          id={id}
          type="search"
          className={`${styles.input} ${styles[size]} ${styles[variant]} ${error ? styles.hasError : ""}`}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
        {hasValue && (
          <Button iconOnly className={`${styles.clear} ${styles[size]}`}
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
            tabIndex={-1}
          >
            <ClearIcon />
          </Button>
        )}
      </Box>
      {error && <span id={errorId} className={styles.error} role="alert">{error}</span>}
    </Box>
  );
};