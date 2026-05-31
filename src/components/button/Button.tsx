import { type ComponentPropsWithoutRef } from "react";
import type { Variant } from "../../types";
import styles from "./Button.module.css";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant | "ghost";
  iconOnly?: boolean;
}

export const Button = ({
  children,
  className = "",
  type = "button",
  variant = "default",
  iconOnly,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${iconOnly ? styles.iconOnly : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
};
