import { useRef, useEffect, type InputHTMLAttributes, useId, useCallback } from "react";
import type { Variant, Size } from "../../types";
import { ChevronUpIcon, ChevronDownIcon } from "../icons";
import styles from "./NumberInput.module.css";
import { Box } from "../box/Box";
import { Button } from "../button/Button";

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  variant?: Variant;
  size?: Size;
  label?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const NumberInput = ({
  variant = "default",
  size = "md",
  label,
  error,
  className = "",
  id: externalId,
  min,
  max,
  step = 1,
  value,
  onChange,
  ...rest
}: NumberInputProps) => {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const errorId = `${id}-error`;
  const numValue = typeof value === "number" ? value : typeof value === "string" ? parseFloat(value) || 0 : 0;

  const numValueRef = useRef(numValue);
  useEffect(() => {
    numValueRef.current = numValue;
  }, [numValue]);

  const clamp = useCallback((v: number) => {
    if (min !== undefined) v = Math.max(min, v);
    if (max !== undefined) v = Math.min(max, v);
    return v;
  }, [min, max]);

  const setNativeInput = useCallback((v: number) => {
    if (!onChange) return;
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (!input) return;
    const nativeEvent = new Event("input", { bubbles: true });
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
    setter?.call(input, String(v));
    input.dispatchEvent(nativeEvent);
  }, [id, onChange]);

  const handleStep = (dir: 1 | -1) => {
    setNativeInput(clamp(numValueRef.current + dir * step));
  };

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopRepeat = useCallback(() => {
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  useEffect(() => () => stopRepeat(), [stopRepeat]);

  const startRepeat = (dir: 1 | -1) => {
    handleStep(dir);
    stopRepeat();
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => setNativeInput(clamp(numValueRef.current + dir * step)), 80);
    }, 300);
  };

  const handleBlur = () => {
    const parsed = parseFloat(String(value ?? ""));
    if (!isNaN(parsed)) {
      const clamped = clamp(parsed);
      if (clamped !== parsed) {
        setNativeInput(clamped);
      }
    }
  };

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
          type="number"
          className={`${styles.input} ${styles[size]} ${styles[variant]} ${error ? styles.hasError : ""}`}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          step={step}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
        <Box className={`${styles.steppers} ${styles[size]}`}>
          <Button iconOnly className={styles.stepUp}
            onMouseDown={() => startRepeat(1)}
            onMouseUp={stopRepeat}
            onMouseLeave={stopRepeat}
            onTouchStart={(e) => { e.preventDefault(); startRepeat(1); }}
            onTouchEnd={stopRepeat}
            onTouchCancel={stopRepeat}
            aria-label="Incrementar"
            tabIndex={-1}
          >
            <ChevronUpIcon />
          </Button>
          <Button iconOnly className={styles.stepDown}
            onMouseDown={() => startRepeat(-1)}
            onMouseUp={stopRepeat}
            onMouseLeave={stopRepeat}
            onTouchStart={(e) => { e.preventDefault(); startRepeat(-1); }}
            onTouchEnd={stopRepeat}
            onTouchCancel={stopRepeat}
            aria-label="Decrementar"
            tabIndex={-1}
          >
            <ChevronDownIcon />
          </Button>
        </Box>
      </Box>
      {error && <span id={errorId} className={styles.error} role="alert">{error}</span>}
    </Box>
  );
};