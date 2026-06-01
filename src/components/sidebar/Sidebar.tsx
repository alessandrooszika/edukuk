import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  side?: "left" | "right";
  width?: string | number;
  className?: string;
}

export const Sidebar = ({
  isOpen,
  onToggle,
  children,
  side = "left",
  width = "260px",
  className = "",
}: SidebarProps) => {
  const { t } = useTranslation();
  const isLeft = side === "left";
  const sideWidth = typeof width === "number" ? `${width}px` : width;
  const toggleAria = isOpen
    ? t("sidebar.close")
    : t("sidebar.open");

  return (
    <div
      className={`${styles.sidebar} ${isLeft ? styles.left : styles.right} ${isOpen ? styles.open : styles.closed} ${className}`}
      style={{ width: sideWidth }}
    >
      <button
        type="button"
        className={`${styles.toggle} ${isLeft ? styles.toggleRight : styles.toggleLeft}`}
        onClick={onToggle}
        aria-label={toggleAria}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`${styles.chevron} ${isLeft ? "" : styles.chevronFlip}`}
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
