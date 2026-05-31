import { useMemo } from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const Pagination = ({
  current,
  total,
  onChange,
  siblingCount = 1,
  className = "",
}: PaginationProps) => {
  const pages = useMemo(() => {
    if (total <= 5) return range(1, total);

    const leftSibling = Math.max(current - siblingCount, 1);
    const rightSibling = Math.min(current + siblingCount, total);
    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < total - 1;

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftCount = 3 + 2 * siblingCount;
      return [...range(1, leftCount), "...", total];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      const rightCount = 3 + 2 * siblingCount;
      return [1, "...", ...range(total - rightCount + 1, total)];
    }

    return [1, "...", ...range(leftSibling, rightSibling), "...", total];
  }, [current, total, siblingCount]);

  if (total < 2) return null;

  return (
    <nav className={`${styles.nav} ${className}`} aria-label="pagination">
      <button
        className={styles.btn}
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        aria-label="Página anterior"
      >
        ‹
      </button>
      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className={styles.ellipsis} aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={page}
            className={`${styles.btn} ${page === current ? styles.active : ""}`}
            onClick={() => onChange(page as number)}
            aria-current={page === current ? "page" : undefined}
            aria-label={`Página ${page}`}
          >
            {page}
          </button>
        )
      )}
      <button
        className={styles.btn}
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        aria-label="Página siguiente"
      >
        ›
      </button>
    </nav>
  );
};
