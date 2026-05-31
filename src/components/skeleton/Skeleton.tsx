import styles from "./Skeleton.module.css";

interface SkeletonProps {
  variant?: "text" | "circle" | "rect";
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
}

export const Skeleton = ({
  variant = "text",
  width,
  height,
  count = 1,
  className = "",
}: SkeletonProps) => {
  const items = Array.from({ length: count });

  return (
    <span className={`${styles.group} ${className}`} aria-hidden="true">
      {items.map((_, i) => (
        <span
          key={i}
          className={`${styles.skeleton} ${styles[variant]}`}
          style={{
            width: width ?? (variant === "circle" ? height ?? "2.5em" : "100%"),
            height: height ?? (variant === "text" ? "1em" : variant === "circle" ? "2.5em" : "1em"),
          }}
        />
      ))}
    </span>
  );
};
