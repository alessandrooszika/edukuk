import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import { Box } from "../box";
import { ChevronLeftIcon } from "../icons";
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
  const toggleAria = isOpen
    ? t("sidebar.close")
    : t("sidebar.open");

  return (
    <Box
      width={width}
      className={`${styles.sidebar} ${isLeft ? styles.left : styles.right} ${isOpen ? styles.open : styles.closed} ${className}`}
    >
      <button
        type="button"
        className={`${styles.toggle} ${isLeft ? styles.toggleRight : styles.toggleLeft}`}
        onClick={onToggle}
        aria-label={toggleAria}
      >
        <ChevronLeftIcon
          size={14}
          className={`${styles.chevron} ${isLeft ? "" : styles.chevronFlip}`}
        />
      </button>
      <Box className={styles.content}>{children}</Box>
    </Box>
  );
};
