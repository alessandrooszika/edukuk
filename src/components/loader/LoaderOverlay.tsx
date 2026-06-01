import type { ReactNode } from "react";
import { Loader } from "./Loader";
import { Box } from "../box/Box";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import styles from "./LoaderOverlay.module.css";

interface LoaderOverlayProps {
  isOpen: boolean;
  children?: ReactNode;
  label?: string;
  blockScroll?: boolean;
  className?: string;
}

export const LoaderOverlay = ({
  isOpen,
  children,
  label,
  blockScroll = true,
  className = "",
}: LoaderOverlayProps) => {
  useBodyScrollLock(isOpen && blockScroll);

  if (!isOpen) return null;

  return (
    <Box className={`${styles.overlay} ${className}`}>
      {children ?? <Loader size="lg" label={label} />}
    </Box>
  );
};
