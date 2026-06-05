import { type ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";
import styles from "./RevealSection.module.css";

interface RevealSectionProps {
  children: ReactNode;
}

export const RevealSection = ({ children }: RevealSectionProps) => {
  const { ref, revealed } = useReveal<HTMLDivElement>(0.05);
  return (
    <div ref={ref} className={`${styles.revealSection} ${revealed ? styles.visible : ""}`}>
      {children}
    </div>
  );
};
