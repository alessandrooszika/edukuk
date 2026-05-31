import { useEffect, type ReactNode } from "react";
import { Loader } from "./Loader";
import styles from "./LoaderOverlay.module.css";
import { Box } from "../box/Box";

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
  useEffect(() => {
    if (!isOpen || !blockScroll) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.paddingRight = "";
    };
  }, [isOpen, blockScroll]);

  if (!isOpen) return null;

  return (
    <Box className={`${styles.overlay} ${className}`}>
      {children ?? <Loader size="lg" label={label} />}
    </Box>
  );
};