import { type InputHTMLAttributes, useId } from "react";
import type { Variant, Size } from "../../types";
import styles from "./RangeInput.module.css";
import { Box } from "../box";

interface RangeInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  variant?: Variant;
  size?: Size;
  label?: string;
  showValue?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export const RangeInput = ({
  variant = "default",
  size = "md",
  label,
  showValue = false,
  className = "",
  id: externalId,
  value,
  min = 0,
  max = 100,
  ...rest
}: RangeInputProps) => {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const numValue = typeof value === "number" ? value : typeof value === "string" ? parseFloat(value) || 0 : 0;
  const percent = ((numValue - min) / (max - min)) * 100;
  const halfThumb = size === "sm" ? 9 : size === "lg" ? 13 : 11;
  const fillWidth = percent >= 100 ? "100%" : `calc(${percent}% + ${halfThumb}px)`;

  return (
    <Box className={`${styles.wrapper} ${className}`}>
      {(label || showValue) && (
        <Box className={styles.header}>
          {label && <label htmlFor={id} className={styles.label}>{label}</label>}
          {showValue && <span className={styles.value}>{Math.round(numValue)}</span>}
        </Box>
      )}
      <Box className={`${styles.trackWrap} ${styles[size]}`}>
        <Box className={styles.track}>
          <Box
            className={`${styles.fill} ${styles[variant]}`}
            style={{ width: fillWidth }}
          />
        </Box>
        <input
          id={id}
          type="range"
          className={styles.native}
          {...(rest.onChange ? { value } : { defaultValue: value })}
          min={min}
          max={max}
          {...rest}
        />
        <span className={`${styles.thumb} ${styles[size]} ${styles[variant]}`} style={{ left: `clamp(${halfThumb}px, ${percent}%, calc(100% - ${halfThumb}px))` }} />
      </Box>
    </Box>
  );
};