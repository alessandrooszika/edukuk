import { useState, useId, useRef, useLayoutEffect, useCallback, type ReactNode } from "react";
import type { Variant } from "../../types";
import styles from "./Tabs.module.css";
import { Box } from "../box";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
  variant?: Variant;
  onChange?: (index: number) => void;
  className?: string;
}

export const Tabs = ({
  tabs,
  defaultIndex = 0,
  variant = "default",
  onChange,
  className = "",
}: TabsProps) => {
  const [active, setActive] = useState(defaultIndex);
  const prevIndex = useRef(defaultIndex);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const tablistRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ w: number; x: number } | null>(null);
  const uid = useId();

  const measureIndicator = useCallback(() => {
    const tablist = tablistRef.current;
    if (!tablist) return;
    const activeTab = tablist.querySelector('[role="tab"][aria-selected="true"]') as HTMLElement | null;
    if (!activeTab) return;

    const listRect = tablist.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    setIndicatorStyle({
      w: tabRect.width,
      x: tabRect.left - listRect.left + tablist.scrollLeft,
    });
  }, []);

  useLayoutEffect(() => {
    measureIndicator();

    const tablist = tablistRef.current;
    if (!tablist) return;

    const ro = new ResizeObserver(measureIndicator);
    ro.observe(tablist);
    window.addEventListener("resize", measureIndicator);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureIndicator);
    };
  }, [measureIndicator, active]);

  const handleClick = (i: number) => {
    if (i === active) return;
    setDirection(i > prevIndex.current ? "right" : "left");
    prevIndex.current = i;
    setActive(i);
    onChange?.(i);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let next: number;
    if (e.key === "ArrowRight") next = (active + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;

    e.preventDefault();
    handleClick(next);
  };

  const slideClass = direction === "right" ? styles.slideFromRight : styles.slideFromLeft;

  return (
    <Box className={`${styles.wrapper} ${className}`}>
      <Box
        ref={tablistRef}
        className={`${styles.tablist} ${styles[variant]}`}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${uid}-panel-${i}`}
            className={`${styles.tab} ${i === active ? styles.active : ""}`}
            onClick={() => handleClick(i)}
          >
            {tab.label}
          </button>
        ))}
        <span
          className={styles.indicator}
          style={indicatorStyle ? {
            width: indicatorStyle.w,
            transform: `translateX(${indicatorStyle.x}px)`,
          } : {
            width: `${100 / tabs.length}%`,
            transform: `translateX(${active * 100}%)`,
          }}
        />
      </Box>
      <Box
        key={active}
        className={`${styles.panel} ${slideClass}`}
        role="tabpanel"
        id={`${uid}-panel-${active}`}
        aria-labelledby={`${uid}-tab-${active}`}
      >
        {tabs[active].content}
      </Box>
    </Box>
  );
};
