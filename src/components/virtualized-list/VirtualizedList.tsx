import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import type { CSSProperties, ReactNode } from "react";
import styles from "./VirtualizedList.module.css";

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
  overscan?: number;
  className?: string;
  style?: CSSProperties;
  height?: number;
}

export const VirtualizedList = <T,>({
  items,
  itemHeight,
  renderItem,
  overscan = 3,
  className = "",
  style,
  height = 400,
}: VirtualizedListProps<T>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;

  const handleScroll = useCallback(() => {
    if (wrapperRef.current) {
      setScrollTop(wrapperRef.current.scrollTop);
    }
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll, { passive: true });
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const { startIdx, endIdx } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(items.length, Math.ceil((scrollTop + height) / itemHeight) + overscan);
    return { startIdx: start, endIdx: end };
  }, [scrollTop, itemHeight, height, items.length, overscan]);

  const visibleItems = useMemo(() => {
    const result: ReactNode[] = [];
    for (let i = startIdx; i < endIdx; i++) {
      result.push(
        <div
          key={i}
          className={styles.item}
          style={{
            top: i * itemHeight,
            height: itemHeight,
          }}
        >
          {renderItem(items[i], i)}
        </div>
      );
    }
    return result;
  }, [startIdx, endIdx, items, itemHeight, renderItem]);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${className}`}
      style={{ height, ...style }}
    >
      <div className={styles.inner} style={{ height: totalHeight }}>
        {visibleItems}
      </div>
    </div>
  );
};
