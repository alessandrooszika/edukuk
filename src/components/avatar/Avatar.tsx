import type { ReactNode } from "react";
import type { Variant, Size } from "../../types";
import styles from "./Avatar.module.css";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: Size;
  variant?: "circle" | "rounded" | "square";
  color?: Variant;
  children?: ReactNode;
  className?: string;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export const Avatar = ({
  src,
  alt = "",
  size = "md",
  variant: shape = "circle",
  color = "default",
  children,
  className = "",
}: AvatarProps) => {
  return (
    <span
      className={`${styles.root} ${styles[size]} ${styles[shape]} ${styles[color]} ${className}`}
      role={src ? "img" : undefined}
      aria-label={src ? alt : undefined}
    >
      {src ? (
        <img src={src} alt={alt} className={styles.img} />
      ) : (
        children ?? (alt ? initials(alt) : null)
      )}
    </span>
  );
};
