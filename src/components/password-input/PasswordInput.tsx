import { useState, type InputHTMLAttributes, useId } from "react";
import type { Variant, Size } from "../../types";
import { EyeIcon, EyeOffIcon } from "../icons";
import styles from "./PasswordInput.module.css";
import { Box } from "../box";
import { Button } from "../button/Button";

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  variant?: Variant;
  size?: Size;
  label?: string;
  error?: string;
}

export const PasswordInput = ({
  variant = "default",
  size = "md",
  label,
  error,
  className = "",
  id: externalId,
  ...rest
}: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);
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
          type={visible ? "text" : "password"}
          className={`${styles.input} ${styles[size]} ${styles[variant]} ${error ? styles.hasError : ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
        <Button iconOnly className={`${styles.toggle} ${styles[size]}`}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          tabIndex={-1}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      </Box>
      {error && <span id={errorId} className={styles.error} role="alert">{error}</span>}
    </Box>
  );
};