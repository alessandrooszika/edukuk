import { useState, useId, type ReactNode } from "react";
import type { Variant } from "../../types";
import styles from "./Tabs.module.css";
import { Box } from "../box/Box";

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
  const uid = useId();

  const handleClick = (i: number) => {
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

  return (
    <Box className={`${styles.wrapper} ${className}`}>
      <Box
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
          style={{
            width: `${100 / tabs.length}%`,
            transform: `translateX(${active * 100}%)`,
          }}
        />
      </Box>
      <Box
        className={styles.panel}
        role="tabpanel"
        id={`${uid}-panel-${active}`}
        aria-labelledby={`${uid}-tab-${active}`}
      >
        {tabs[active].content}
      </Box>
    </Box>
  );
};
