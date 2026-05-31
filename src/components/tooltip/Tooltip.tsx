import { useState, useRef, useEffect, type ReactNode } from "react";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export const Tooltip = ({ content, children, position = "top" }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const hide = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  const schedule = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(true), 500);
  };

  return (
    <span
      className={`${styles.wrapper} ${styles[position]} ${visible ? styles.visible : ""}`}
      data-tooltip={content}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setVisible(true);
      }}
      onPointerLeave={hide}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") schedule();
      }}
      onPointerUp={hide}
      onPointerCancel={hide}
    >
      {children}
    </span>
  );
};
