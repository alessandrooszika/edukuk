import type { ReactNode } from "react";
import type { Variant, Size } from "../../types";
import styles from "./Badge.module.css";

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  standalone?: boolean;
  className?: string;
}

export const Badge = ({
  children,
  variant = "default",
  size = "md",
  standalone = false,
  className = "",
}: BadgeProps) => {
  return (
    <span
      className={`${standalone ? styles.standalone : styles.badge} ${styles[size]} ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
