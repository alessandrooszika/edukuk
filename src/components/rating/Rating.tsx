import { useRef, useState, type ReactNode } from "react";
import type { Size } from "../../types";
import styles from "./Rating.module.css";

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  count?: number;
  size?: Size;
  readOnly?: boolean;
  icon?: ReactNode;
  emptyIcon?: ReactNode;
  className?: string;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const Rating = ({
  value,
  onChange,
  count = 5,
  size = "md",
  readOnly = false,
  icon,
  emptyIcon,
  className = "",
}: RatingProps) => {
  const rootRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly || !onChange) return;
    const isNext = e.key === "ArrowRight" || e.key === "ArrowUp";
    const isPrev = e.key === "ArrowLeft" || e.key === "ArrowDown";
    if (!isNext && !isPrev) return;
    e.preventDefault();
    onChange(isNext ? Math.min(count, value + 1) : Math.max(1, value - 1));
  };

  return (
    <span
      ref={rootRef}
      className={`${styles.root} ${styles[size]} ${className}`}
      role={readOnly ? "img" : "radiogroup"}
      aria-label={readOnly ? `${value} de ${count} estrellas` : "Valoración"}
      tabIndex={readOnly ? -1 : 0}
      onKeyDown={handleKeyDown}
      onPointerLeave={readOnly ? undefined : () => setHovered(null)}
    >
      {Array.from({ length: count }, (_, i) => {
        const filled = hovered != null ? i < hovered : i < value;
        return (
          <span
            key={i}
            className={`${styles.star} ${filled ? styles.filled : ""} ${readOnly ? styles.readOnly : ""}`}
            onClick={() => !readOnly && onChange?.(i + 1)}
            onPointerEnter={readOnly ? undefined : () => setHovered(i + 1)}
            role={readOnly ? undefined : "radio"}
            aria-checked={readOnly ? undefined : i + 1 === value}
            aria-label={readOnly ? undefined : `${i + 1} estrella${i > 0 ? "s" : ""}`}
            tabIndex={-1}
          >
            {filled
              ? (icon ?? <StarIcon filled />)
              : (emptyIcon ?? <StarIcon filled={false} />)
            }
          </span>
        );
      })}
    </span>
  );
};
